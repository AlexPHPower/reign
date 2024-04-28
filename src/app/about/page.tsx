"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import Tilt from "react-parallax-tilt";

export default function About() {
  return (
    <main>
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-between p-12">
        <Card className="flex flex-col items-center justify-center border-transparent">
          <CardContent className="items-center p-4 md:max-w-2xl lg:max-w-3xl">
            <CardHeader className="text-center text-4xl font-bold">
              Who is <span className="font-extrabold text-primary">Reign</span>
            </CardHeader>
            <CardHeader className="text-center text-2xl font-bold">
              Why We Started
            </CardHeader>
            <p className="text-center text-neutral-400">
              We, the founders, felt that while Ranked games were engaging, they
              lacked a certain thrill—the excitement of playing for more than
              just points, but for prizes. There wasn&apos;t a platform where we
              could pay a modest monthly fee to compete in a well-organized
              league that matched us with players of similar skill levels.
            </p>
            <CardHeader className="text-center text-2xl font-bold">
              Why We&apos;re Different
            </CardHeader>
            <p className="text-center text-neutral-400">
              Reign isn&apos;t just another competitive league. It&apos;s a
              community where you can consistently measure your skills against
              equally matched opponents. Our league uses a subscription model,
              making it easy to join and start competing. Whether you’re looking
              to dominate the leaderboards or just improve your gameplay, Reign
              offers a structured environment to do so.
            </p>
          </CardContent>
          <div className="mb-32 mt-4 grid w-full px-4 text-center md:px-20 lg:w-full lg:max-w-5xl">
            <Card className="mb-4 flex w-full flex-col items-center p-4 md:flex-row md:items-start">
              <div className="w-full">
                <Tilt perspective={700}>
                  <Image
                    src="/Rick.png"
                    alt="Rick Whalley"
                    className="mx-auto rounded-full"
                    width={200}
                    height={200}
                    priority
                  />
                </Tilt>
                <CardHeader className="text-center text-2xl font-bold text-white">
                  Notice Me Senpai{" "}
                  <span className="font-extrabold text-primary">
                    (Rick Whalley)
                  </span>
                </CardHeader>
                <p className="mb-6 ml-6 text-center text-neutral-400 md:text-left">
                  A Software Consultant whose enthusiasm for gaming matches his
                  expertise in engineering. A die-hard fan of Apex, Path of
                  Exile, and Quake, he brings strategic thinking from his
                  favorite games into every match. When he&apos;s not dominating
                  in the gaming world, you can find him whipping up delicious
                  meals or tuning up his car. He&apos;s a perfect blend of
                  tech-savvy and hands-on skills.
                </p>
              </div>
            </Card>
            <Card>
              <CardContent className="flex w-full flex-col items-center p-4 md:flex-row md:items-start">
                <div className="w-full">
                  <Tilt perspective={700}>
                    <Image
                      src="/Biscuit.png"
                      alt="Alex Power"
                      className="mx-auto rounded-full"
                      width={200}
                      height={200}
                      priority
                    />
                  </Tilt>
                  <CardHeader className="text-center text-2xl font-bold text-white">
                    Biscuit{" "}
                    <span className="font-extrabold text-primary">
                      (Alex Power)
                    </span>
                  </CardHeader>
                  <p className="mb-6 ml-6 text-center text-neutral-400 md:text-left">
                    A software engineer with a knack for strategy and
                    competition. Whether he’s outsmarting opponents in Apex
                    Legends, mastering tactics in Hearthstone, or building
                    empires in Sid Meier&apos;s Civilization, he&apos;s always
                    game for a challenge. Off the virtual battlefield, he enjoys
                    exploring new recipes and expanding his knowledge.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Card>
      </div>
    </main>
  );
}
