import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { ScrollingHomeCardProps } from "~/types";

export default function ScrollingHomeCard({ cards }: ScrollingHomeCardProps) {
  const duplicatedCards = [...cards, ...cards]; // Duplicate cards for seamless scrolling

  return (
    <div className="w-full whitespace-nowrap">
      <div className="animate-scroll flex space-x-4">
        {duplicatedCards.map((card, index) => (
          <Card key={index} className="inline-block min-w-[200px]">
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
