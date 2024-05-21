import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import React from "react";
import { SignUpForm } from "~/components/signup/signUpForm";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import SignInProviderButton from "~/components/signInProviderButton";
import Link from "next/link";

export default async function About() {
  const session = await getServerAuthSession();
  const providers = await getProviders();

  if (session) redirect("/");

  return (
    <main>
      <div className="flex h-full min-h-screen w-full flex-col p-32">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
            <div className="grid gap-2">
              {providers && (
                <SignInProviderButton
                  providers={providers}
                  adjective="Sign Up"
                />
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/signin" className="underline">
                Sign in
              </Link>
            </div>
            <div className="text-center text-sm">
              <Link href="/" className="underline">
                Cancel
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
