"use client";

import { Button } from "~/components/ui/button";
import { signIn, type ClientSafeProvider } from "next-auth/react";
import React from "react";

type SignInProviderButtonProps = {
  providers: Record<string, ClientSafeProvider> | null;
  adjective?: string;
};

const SignInProviderButton: React.FC<SignInProviderButtonProps> = ({
  providers,
  adjective = "Log in",
}) => {
  if (!providers) return null;

  return (
    <div>
      {Object.values(providers).map(
        (provider) =>
          provider.name !== "Credentials" && (
            <Button
              variant="outline"
              className={`w-full ${provider.id === "discord" ? "bg-discord" : ""}`}
              onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })}
              key={provider.id}
            >
              {adjective} with {provider.name}
            </Button>
          ),
      )}
    </div>
  );
};

export default SignInProviderButton;
