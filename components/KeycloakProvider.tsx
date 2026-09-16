"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import keycloak from "@/lib/keycloak";

type KeycloakContextType = {
  isAuthenticated: boolean;
  /** false until Keycloak has answered (or failed) */
  ready: boolean;
  login: () => void;
  logout: () => void;
};

const KeycloakContext = createContext<KeycloakContextType | undefined>(
  undefined,
);

export function useKeycloak() {
  const context = useContext(KeycloakContext);

  if (!context) {
    throw new Error("useKeycloak must be used inside KeycloakProvider");
  }

  return context;
}

export default function KeycloakProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialized = useRef(false);
  const [ready, setReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;

    keycloak
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",
      })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
      })
      .catch((error) => {
        // Keycloak unreachable or misconfigured. Stay signed out rather than
        // leaving the app stuck — the store still works without auth.
        console.error("Keycloak init failed:", error);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setReady(true);
      });
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout({
      redirectUri: window.location.origin,
    });
  };

  // Render children immediately. Auth state arrives later; consumers that care
  // can read `ready`. Blocking here blanks the entire app — including every
  // page that needs no auth at all — whenever Keycloak is slow or down.
  return (
    <KeycloakContext.Provider
      value={{
        isAuthenticated,
        ready,
        login,
        logout,
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
}
