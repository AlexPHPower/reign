"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { SquareUserRound, Trophy } from "lucide-react";

export default function CommunitySection() {
  return (
    <div className="mx-auto mb-20 flex w-full flex-col items-center">
      <div className="flex w-11/12 flex-nowrap items-center justify-center">
        <Card
          className={`bg-radial-gradient flex flex-row p-8 shadow shadow-2xl backdrop-brightness-125`} // added padding to the Card
        >
          <CardHeader className={`w-full items-center justify-center`}>
            <CardTitle className="w-full text-3xl lg:w-2/3 lg:text-6xl">
              Play Well.
              <br /> Get Noticed.
              <br /> Go Pro
            </CardTitle>
            <CardDescription className={`mx-auto w-full lg:w-2/3 lg:text-xl`}>
              Your stats are public, dominate the leaderboards and get noticed
              by orgs. We want to help the competitive community grow and help
              generate new and upcoming talent.
            </CardDescription>
          </CardHeader>
          <CardContent
            className={`hidden w-full content-center lg:block lg:w-auto`}
          >
            {/* added w-full for mobile */}
            <div className="w-full flex-col items-center justify-between lg:flex">
              {/* hidden on mobile, flex on larger screens */}
              <Card className="mt-4 w-5/6 -translate-x-10 rounded-xl">
                <CardHeader>
                  <SquareUserRound className={`h-16 w-16`} />
                  <CardTitle className="text-xl">Searchable profiles</CardTitle>
                  <CardDescription>
                    Within the community section your profile is visible and
                    searchable, allowing orgs to find new up-and-coming players.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="mt-4 w-5/6 translate-x-10 rounded-xl">
                <CardHeader>
                  <Trophy className={`h-16 w-16`} />
                  <CardTitle className="text-xl">Featured Events</CardTitle>
                  <CardDescription>
                    Get involved in exclusive events with a chance to win prizes
                    from sponsors.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
