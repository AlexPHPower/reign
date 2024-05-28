import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type Tier } from "~/types";

export const tierRouter = createTRPCRouter({
  tiers: publicProcedure.query((): Tier => {
    return {
      peasant: {
        title: "Peasant tier",
        description: "For those without faith in their ability",
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
        title: "Lord tier",
        description: "For those who believe in their potential",
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
        title: "King tier",
        description: "For the apex predators among us",
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
