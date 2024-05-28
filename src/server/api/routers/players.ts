import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { PlayerProfile } from "~/types";

export const playersRouter = createTRPCRouter({
  playerProfiles: publicProcedure.query(({ ctx }): PlayerProfile[] => {
    const userProfile: PlayerProfile = {
      name: ctx.session?.user?.name ?? "You",
      image: ctx.session?.user?.image ?? "/Rick.png",
      badges: {
        "4K Damage": "/badges/damage4.png",
        "20K": "/badges/20kill.png",
        "Back to Back": "/badges/back2back.png",
      },
      played: 10,
      wins: 5,
      kills: 100,
    };
    return [
      {
        name: "First Player",
        image: "/Rick.png",
        badges: {
          "4K Damage": "/badges/damage4.png",
          "20K": "/badges/20kill.png",
          "Back to Back": "/badges/back2back.png",
        },
        played: 10,
        wins: 5,
        kills: 100,
      },
      userProfile,
      {
        name: "Second Player",
        image: "/Rick.png",
        badges: {
          "4K Damage": "/badges/damage4.png",
          "20K": "/badges/20kill.png",
          Pro: "/badges/certifiedPro.png",
        },
        played: 10,
        wins: 5,
        kills: 100,
      },
      {
        name: "Penultimate Player",
        image: "/Rick.png",
        badges: {
          win: "/badges/win.png",
        },
        played: 10,
        wins: 1,
        kills: 100,
      },
      {
        name: "Final Player",
        image: "/Rick.png",
        badges: {
          win: "/badges/win.png",
        },
        played: 10,
        wins: 1,
        kills: 100,
      },
    ];
  }),
});
