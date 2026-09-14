"use client";

import { useState } from "react";
import { UserRound, UserRoundCheck } from "lucide-react";
import { useKeycloak } from "./KeycloakProvider";

export default function LoginButton() {
  const { isAuthenticated, login, logout } = useKeycloak();
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = () => {
    setIsOpen(false);

    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        title="User menu"
        className="rounded-md p-2 hover:bg-muted transition-colors"
      >
        {isAuthenticated ? (
          <UserRoundCheck className="h-5 w-5" />
        ) : (
          <UserRound className="h-5 w-5" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-32 rounded-md border bg-background p-1 shadow-md">
          <button
            onClick={handleAction}
            className="w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-muted"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </div>
  );
}