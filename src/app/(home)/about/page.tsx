"use client";

import Image from "next/image";
import React from "react";
import Tilt from "react-parallax-tilt";
import { teko } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "~/components/ui/accordion";
import { AccordionTriggerPlus } from "~/components/ui/accordionTriggerPlus";

export default function About() {
  return (
    <main>
      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-10 p-12">
        <div className="flex flex-col items-center space-y-4">
          <h1 className={`text-6xl ${teko.className}`}>
            About <span className="text-xl text-primary lg:text-6xl">Us</span>
          </h1>
          <p className="w-2/3 text-center">
            We, the founders, felt that while Ranked games were engaging, they
            lacked a certain thrill—the excitement of playing for more than just
            points, but for prizes. There wasn&apos;t a platform where we could
            pay a modest monthly fee to compete in a well-organized league that
            matched us with players of similar skill levels.
          </p>
        </div>
        <div className="mt-8 flex w-full justify-around space-x-8">
          <div className="w-1/2 space-y-4">
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
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-white">
                Notice Me Senpai
              </h3>
              <p className="font-extrabold text-primary">Rick Whalley</p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTriggerPlus className="font-extrabold text-primary" />
                  <AccordionContent className="text-center text-neutral-400">
                    A Software Consultant whose enthusiasm for gaming matches
                    his expertise in engineering. A die-hard fan of Apex, Path
                    of Exile, and Quake, he brings strategic thinking from his
                    favorite games into every match. When he&apos;s not
                    dominating in the gaming world, you can find him whipping up
                    delicious meals or tuning up his car. He&apos;s a perfect
                    blend of tech-savvy and hands-on skills.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="w-1/2 space-y-4">
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
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-white">Biscuit</h3>
              <p className="font-extrabold text-primary">Alex Power</p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTriggerPlus className="font-extrabold text-primary" />
                  <AccordionContent className="text-center text-neutral-400">
                    A software engineer with a knack for strategy and
                    competition. Whether he’s outsmarting opponents in Apex
                    Legends, mastering tactics in Hearthstone, or building
                    empires in Sid Meier&apos;s Civilization, he&apos;s always
                    game for a challenge. Off the virtual battlefield, he enjoys
                    exploring new recipes and expanding his knowledge.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <h1 className={`text-6xl ${teko.className}`}>
            How does it{" "}
            <span className="text-xl text-primary lg:text-6xl">work</span>?
          </h1>
          <p className="w-2/3 text-center">
            Once you&apos;ve signed up and setup a subscription you can queue
            for a league. You will be matched with players of similar skill
            levels and compete in a series of games.
          </p>
          <p className={`w-2/3 text-center`}>
            You will need a discord account to join the league and communicate
            with your team. You will be automatically added to the league
            discord server when you set up your subscription.
          </p>
          <p className={`w-2/3 text-center`}>
            Lastly, you will also need to have an apex legends account that has
            at least 3 seasons of history with ranked placements. This lowers
            the likelihood of smurfing and ensures that you are matched with
            players of similar skill levels.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <h1 className={`text-6xl ${teko.className}`}>
            Player{" "}
            <span className="text-xl text-primary lg:text-6xl">profiles</span>
          </h1>
          <p className="w-2/3 text-center">
            Your player profile and history of games will be available to view
            by other players and E-Sports organisations. For an Org account
            please contact us at example@email.com as the dashboard for E-Sports
            Orgs is slightly different to a regular player account.
          </p>
          <p className="w-2/3 text-center">
            You will be able to search and filter players by their stats and
            various other metrics to find the perfect player for your team.
            Their contact details, should they choose to share them, will be
            available to you.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <h1 className={`text-6xl ${teko.className}`}>
            Frequently asked{" "}
            <span className="text-xl text-primary lg:text-6xl">questions</span>
          </h1>
          <p className="w-2/3 text-center">
            You may find answers to most other questions in our FAQ section.
            <a href="/pricing" className="text-primary">
              {" "}
              Click here
            </a>{" "}
            to view them.
          </p>
        </div>
      </div>
    </main>
  );
}
