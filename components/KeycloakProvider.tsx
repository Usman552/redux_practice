"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import keycloak from "@/lib/keycloak";

type KeycloakContextType = {
  isAuthenticated: boolean;
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
        console.log("Keycloak authenticated:", authenticated);
        console.log("Keycloak object:", keycloak);

        setIsAuthenticated(authenticated);
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

  if (!ready) {
    return null;
  }

  return (
    <KeycloakContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
}
