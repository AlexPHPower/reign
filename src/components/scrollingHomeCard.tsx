"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { ScrollingHomeCardProps } from "~/types";

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
          90% {
            transform: translateX(${containerWidth - totalWidth}px);
          }
          100% {
            transform: translateX(${containerWidth - totalWidth}px);
          }
        }
      `;

      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = keyframes;
      document.head.appendChild(styleSheet);

      setContainerWidth(totalWidth + "px");
      setAnimationState("running");
    }
  }, [cards]);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="animation-container flex space-x-4"
        ref={ref}
        style={{
          width: containerWidth,
          animation: `animateContainer 20s ease-in-out infinite`,
          animationPlayState: animationState,
        }}
      >
        {[...cards, ...cards, ...cards, ...cards].map((card, index) => (
          <Card key={index} className="inline-block min-w-[200px] ">
            <CardHeader>
              <CardTitle>{card}</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
