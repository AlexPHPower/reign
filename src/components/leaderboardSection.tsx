"use client";

import { teko } from "~/lib/utils";
import ScrollingHomeCard from "~/components/scrollingHomeCard";
import { api } from "~/trpc/react";

export default function LeaderboardSection() {
  const { data, error, isLoading } = api.players.playerProfiles.useQuery();

  if (isLoading) {
    return (
      <div className="mx-auto mb-20 w-full max-w-4xl">
        <div className="flex flex-nowrap items-center justify-center">
          <div
            className={`text-3xl font-semibold uppercase text-white lg:text-4xl ${teko.className}`}
          >
            Display your <span className="text-primary">Achievements</span>
          </div>
        </div>
        <div className="flex flex-nowrap items-center justify-center">
          <p className="text-center text-neutral-400">
            Just like your apex banner, show off your achievements to the world.
          </p>
        </div>
        <div className="mt-5 w-full">
          <div className="overflow-hidden whitespace-nowrap">
            <div className="animation-container flex space-x-4">
              <div className="h-52 w-52 animate-pulse rounded-lg bg-neutral-800"></div>
              <div className="h-52 w-52 animate-pulse rounded-lg bg-neutral-800"></div>
              <div className="h-52 w-52 animate-pulse rounded-lg bg-neutral-800"></div>
              <div className="h-52 w-52 animate-pulse rounded-lg bg-neutral-800"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return <div>No player profiles available.</div>;
  }

  return (
    <div className="mx-auto mb-20 w-full max-w-4xl">
      <div className="flex flex-nowrap items-center justify-center">
        <div
          className={`text-3xl font-semibold uppercase text-white lg:text-4xl ${teko.className}`}
        >
          Display your <span className="text-primary">Achievements</span>
        </div>
      </div>
      <div className="flex flex-nowrap items-center justify-center">
        <p className="text-center text-neutral-400">
          Just like your apex banner, show off your achievements to the world.
        </p>
      </div>
      <div className="mt-5 w-full">
        <ScrollingHomeCard cards={data} />
      </div>
    </div>
  );
}
