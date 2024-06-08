"use client";

import React from "react";
import { HeroEmailForm } from "~/components/heroEmailForm";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { teko } from "@/lib/utils";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute left-0 top-[-100px] h-full w-full">
        <img
          src="/HeroImage.jpeg"
          alt="Wraith, Bloodhound and Lifeline standing in front of orange"
          className="z-0 h-full w-full object-cover"
        />
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <Card className="w-11/12 rounded-3xl bg-background/80 p-4 shadow-lg lg:w-2/3">
          <CardHeader
            className={`text-center uppercase text-white lg:text-6xl ${teko.className}`}
          >
            <div className="flex flex-col flex-nowrap items-center justify-center lg:flex-row">
              <span className="text-3xl lg:text-6xl">
                A community where&nbsp;
              </span>
              <span className="text-3xl text-primary lg:text-6xl">Legends</span>
              <span className="text-3xl lg:text-6xl">&nbsp;are made</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="hidden lg:block">
              <HeroEmailForm />
            </div>
            <div>
              <p className="text-center text-base text-neutral-400 lg:text-lg">
                Greatness awaits those who dare to compete. Join our esports
                league.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
