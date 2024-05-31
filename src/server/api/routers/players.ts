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
      kills: 100,
      leagueWins: 12,
      rival: "Second Player",
      main: "Wraith",
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
        kills: 100,
        leagueWins: 12,
        rival: "Final Player",
        main: "Wattson",
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
        kills: 100,
        leagueWins: 12,
        rival: "First Player",
        main: "Bloodhound",
      },
      {
        name: "Penultimate Player",
        image: "/Rick.png",
        badges: {
          win: "/badges/win.png",
        },
        played: 10,
        kills: 100,
        leagueWins: 12,
        rival: "Penultimate Player",
        main: "Lifeline",
      },
      {
        name: "Final Player",
        image: "/Rick.png",
        badges: {
          win: "/badges/win.png",
        },
        played: 10,
        kills: 100,
        leagueWins: 12,
        rival: "Second Player",
        main: "Valkyrie",
      },
    ];
  }),
});
