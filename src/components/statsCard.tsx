import { Card, CardContent, CardHeader } from "~/components/ui/card";
import React from "react";

export default function StatsCard() {
  return (
    <Card className="col-span-2 shadow-lg shadow-secondary">
      <CardHeader className="text-center text-2xl font-bold text-white md:text-left">
        Stats for every{" "}
        <span className="font-extrabold text-primary">game</span>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-center text-neutral-400 md:text-left">
            Track your stats from every game, improve by analyzing your
            performance, and get paid out.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
