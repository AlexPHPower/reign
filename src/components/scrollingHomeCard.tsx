"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { ScrollingHomeCardProps } from "~/types";
import { teko } from "~/lib/utils";
import { Orbitron } from "@next/font/google";
import Tilt from "react-parallax-tilt";

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function ScrollingHomeCard({ cards }: ScrollingHomeCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState("100%");
  const [animationState, setAnimationState] = useState("paused");

  useEffect(() => {
    if (ref.current) {
      const container = ref.current;
      const totalWidth = container.scrollWidth;
      const containerWidth = container.offsetWidth;

      const keyframes = `
        @keyframes animateContainer {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(${containerWidth - totalWidth}px);
          }
        }
      `;

      const styleSheet = document.createElement("style");
      styleSheet.innerText = keyframes;
      document.head.appendChild(styleSheet);

      setContainerWidth(totalWidth + "px");
      setAnimationState("running");
    }
  }, [cards]);

  const handleMouseEnter = () => {
    setAnimationState("paused");
  };

  const handleMouseLeave = () => {
    setAnimationState("running");
  };

  return (
    <div className="relative overflow-hidden whitespace-nowrap py-8 lg:overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-primary to-background blur-3xl"></div>
      <div
        className="animation-container flex space-x-4 overflow-hidden"
        ref={ref}
        style={{
          width: containerWidth,
          animation: `animateContainer 50s ease-in-out infinite`,
          animationPlayState: animationState,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {[...cards, ...cards, ...cards].map((card, index) => (
          <Card
            key={index}
            className="flex min-w-[350px] flex-col items-center justify-start bg-[url('/backgroundTexture.png')] bg-contain text-center saturate-150"
          >
            <CardHeader className="flex flex-col items-center space-y-4">
              <CardTitle
                className={`text-primary ${teko.className} text-3xl tracking-wide`}
              >
                {card.name}
              </CardTitle>
              <img
                src={card.image}
                className="h-24 w-24 rounded-full"
                alt="User's image"
              />
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-center space-x-4 overflow-x-auto">
              {Object.entries(card.badges).map(([key, value]) => (
                <div key={key} className="flex flex-col items-center">
                  <Tilt>
                    <img
                      src={value}
                      alt={key}
                      className="h-14 w-14 transform transition-transform hover:scale-110"
                    />
                  </Tilt>
                </div>
              ))}
            </CardContent>
            <CardFooter className="relative w-full">
              <div
                className={`w-full ${orbitron.className} relative z-10 flex flex-col space-y-2 text-left`}
              >
                <h2 className="custom-border text-md w-full font-bold">
                  Played: {card.played}
                </h2>
                <h2 className="custom-border text-md w-full font-bold">
                  Kills: {card.kills}
                </h2>
                <h2 className="custom-border text-md w-full font-bold">
                  Main: {card.main}
                </h2>
                <h2 className="custom-border text-md w-full font-bold">
                  League Wins: {card.leagueWins}
                </h2>
                <h2 className="custom-border text-md w-full font-bold">
                  Rival: {card.rival}
                </h2>
              </div>
              <div className="absolute bottom-0 left-20 h-full w-full">
                <Image
                  src={`/${card.main.toLowerCase()}.png`}
                  alt="Apex Legends Wraith"
                  layout="fill"
                  objectFit="contain"
                  className="absolute"
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
