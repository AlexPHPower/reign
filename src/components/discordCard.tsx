import { Card, CardContent, CardHeader } from "~/components/ui/card";
import React from "react";

export default function DiscordCard() {
  return (
    <Card className="col-span-2 shadow-lg shadow-secondary">
      <CardHeader className="text-center text-2xl font-bold text-white md:text-left">
        <span className="text-discord font-extrabold">Discord</span> login
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-center text-neutral-400 md:text-left">
            A discord account is required due to the nature of our platform, we
            want to ensure that all players are verified.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
