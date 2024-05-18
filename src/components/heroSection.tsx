import React from "react";
import { HeroEmailForm } from "~/components/heroEmailForm";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default async function HeroSection() {
  return (
    <div>
      <Image
        src="/HeroImage.jpg"
        alt="Wraith, Bloodhound and Lifeline standing in front of orange"
        height={1920}
        width={1080}
        className="absolute left-0 top-0 z-0 h-max w-full object-cover"
      />
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <Card className="w-2/3 rounded-3xl bg-background/80 shadow-lg">
          <CardHeader className="text-center text-6xl uppercase text-white">
            A community where Legends are made
          </CardHeader>
          <CardContent>
            <HeroEmailForm />
            <div>
              <p className="text-center text-neutral-400">
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
