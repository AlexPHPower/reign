import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type Tier } from "~/types";

export const tierRouter = createTRPCRouter({
  tiers: publicProcedure.query((): Tier => {
    return {
      peasant: {
        title: "Militia tier",
        description: "For those just enlisting in the fight for freedom.",
        features: [
          { name: "Leaderboards", enabled: true },
          { name: "Stats pages", enabled: true },
          { name: "Discord server", enabled: true },
          { name: "Monthly league", enabled: true },
          { name: "Solo queue", enabled: true },
          { name: "Team queue", enabled: false },
          { name: "Scrim sessions", enabled: false },
          { name: "Discord Bot Permissions", enabled: false },
          { name: "Achievements & Trophy Cabinet", enabled: false },
          { name: "On Demand Tournaments", enabled: false },
        ],
        price: 10,
      },
      lord: {
        title: "IMC Elite tier",
        description: "For those who harness the power of advanced warfare.",
        features: [
          { name: "Leaderboards", enabled: true },
          { name: "Stats pages", enabled: true },
          { name: "Discord server", enabled: true },
          { name: "Monthly league", enabled: true },
          { name: "Solo queue", enabled: true },
          { name: "Team queue", enabled: true },
          { name: "Scrim sessions", enabled: true },
          { name: "Discord Bot Permissions", enabled: true },
          { name: "Achievements & Trophy Cabinet", enabled: true },
          { name: "On Demand Tournaments", enabled: false },
        ],
        price: 15,
      },
      king: {
        title: "Titan tier",
        description:
          "For those who dominate the battlefield with unrivaled might.",
        features: [
          { name: "Leaderboards", enabled: true },
          { name: "Stats pages", enabled: true },
          { name: "Discord server", enabled: true },
          { name: "Monthly league", enabled: true },
          { name: "Solo queue", enabled: true },
          { name: "Team queue", enabled: true },
          { name: "Scrim sessions", enabled: true },
          { name: "Discord Bot Permissions", enabled: true },
          { name: "Achievements & Trophy Cabinet", enabled: true },
          { name: "On Demand Tournaments", enabled: true },
        ],
        price: 20,
      },
    };
  }),
});
