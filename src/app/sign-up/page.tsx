"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { SignUpForm } from "~/app/_components/signup/signUpForm";

export default function About() {
  return (
    <main>
      <div className="flex h-full min-h-screen w-full flex-col p-12">
        <Card className="flex flex-col items-center justify-center">
          <CardHeader className="text-center text-4xl font-bold text-white">
            Sign up for an account{" "}
            <span className="border-b-2 border-primary text-2xl text-primary">
              Play for keeps
            </span>
          </CardHeader>
          <SignUpForm />
        </Card>
      </div>
    </main>
  );
}
