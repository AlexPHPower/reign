import React from "react";
import { HeroEmailForm } from "~/components/heroEmailForm";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Teko } from "@next/font/google";

const teko = Teko({
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
          <CardHeader
            className={`text-center text-2xl uppercase text-white lg:text-6xl ${teko.className} flex flex-nowrap`}
          >
            <div className="flex flex-nowrap items-center justify-center">
              A community where&nbsp;
              <span className="text-primary">Legends</span>
              &nbsp;are made
            </div>
          </CardHeader>
          <CardContent>
            <div className="hidden lg:block">
              <HeroEmailForm />
            </div>
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
