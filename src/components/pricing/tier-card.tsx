import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";
import type { Feature } from "~/types";
import Tilt from "react-parallax-tilt";
import { teko } from "@/lib/utils";

export default function TierCard({
  title,
  description,
  features,
  price,
}: {
  title: string;
  description: string;
  features: Feature[];
  price: number;
}) {
  const textClass =
    title === "Peasant tier"
      ? "text-neutral-400"
      : title === "Lord tier"
        ? "text-primary"
        : "";

  const descriptionClass =
    title === "Peasant tier"
      ? "text-neutral-600"
      : title === "Lord tier"
        ? "text-neutral-400"
        : "text-neutral-200";

  return (
    <Tilt
      glareEnable={true}
      glareBorderRadius={"10px"}
      transitionEasing={"cubic-bezier(.03,.98,.52,.99)"}
    >
      <Card>
        <CardHeader className={`text-center text-4xl font-bold ${textClass}`}>
          <CardTitle className={`${teko.className} text-5xl`}>
            {title}
          </CardTitle>
          <CardDescription className={`italic ${descriptionClass}`}>
            {description}
          </CardDescription>
        </CardHeader>
        <div className={`flex w-full justify-center`}>
          <Separator className="my-4 w-4/5" />
        </div>
        <CardContent className="flex w-full flex-col items-center justify-center p-4 md:flex-row">
          <ul className={`text-center text-neutral-200`} role={`list`}>
            {features.map(({ name, enabled }) => (
              <li className={`flex items-center`} key={name}>
                {enabled ? (
                  <CircleCheck className={`mr-1 h-5 w-5 text-green-500`} />
                ) : (
                  <CircleX className={`mr-1 h-5 w-5 text-red-500`} />
                )}
                {name}
              </li>
            ))}
          </ul>
        </CardContent>
        <div className={`flex w-full justify-center`}>
          <Separator className="my-4 w-4/5" />
        </div>
        <CardFooter className="flex justify-center">
          <p className={`text-2xl font-bold`}>£{price} per month</p>
        </CardFooter>
      </Card>
    </Tilt>
  );
}
