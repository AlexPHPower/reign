'use client';

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import React from "react";
import {SignUpForm} from "@/components/signup/signUpForm";

export default function About() {
    return (
        <main>
            <div className="min-h-screen p-12 flex flex-col w-full h-full">
                <Card className="flex flex-col items-center justify-center">
                    <CardHeader className="text-4xl font-bold text-white text-center">
                        Sign up for an account <span className="text-primary text-2xl border-b-2 border-primary">Play for keeps</span>
                    </CardHeader>
                    <SignUpForm />
                </Card>
            </div>
        </main>
    );
}
