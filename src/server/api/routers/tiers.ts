import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type StripePrice, type Tier, type TierDetails } from "~/types";
import { stripe } from "~/lib/stripe";

export const tierRouter = createTRPCRouter({
  tiers: publicProcedure.query(async (): Promise<Tier> => {
    const prices: StripePrice[] = await fetchPricesFromStripe();

    const defaultTierDetails: TierDetails = {
      title: "Unknown",
      description: "No description available.",
      features: [],
      price: 0,
      id: "",
    };

    const peasant =
      prices.find((price) => price.price === 10) ?? defaultTierDetails;
    const lord =
      prices.find((price) => price.price === 15) ?? defaultTierDetails;
    const king =
      prices.find((price) => price.price === 20) ?? defaultTierDetails;

    return {
      peasant: {
        title: peasant.title,
        description: peasant.description,
        features: peasant.features,
        price: peasant.price,
        id: peasant.id,
      },
      lord: {
        title: lord.title,
        description: lord.description,
        features: lord.features,
        price: lord.price,
        id: lord.id,
      },
      king: {
        title: king.title,
        description: king.description,
        features: king.features,
        price: king.price,
        id: king.id,
      },
    };
  }),
});

async function fetchPricesFromStripe(): Promise<StripePrice[]> {
  const prices = await stripe.prices.list({ limit: 3 });
  return prices.data.map((price) => {
    const priceInCents = price.unit_amount!;
    const tierInfo = getTierInfoByPrice(priceInCents);

    return {
      id: price.id,
      title: tierInfo.title || "Unknown Title",
      description: tierInfo.description || "No description available.",
      price: priceInCents / 100,
      features: tierInfo.features,
    };
  });
}

function getTierInfoByPrice(priceInCents: number) {
  switch (priceInCents) {
    case 1000: // $10
      return {
        title: "Militia tier",
        description: "For those just enlisting in the fight for freedom.",
        features: [
          { name: "Leaderboards", enabled: true },
          { name: "Stats pages", enabled: true },
          { name: "Discord server", enabled: true },
          { name: "Monthly league", enabled: true },
          { name: "Solo queue", enabled: false },
          { name: "Team queue", enabled: false },
          { name: "Scrim sessions", enabled: false },
          { name: "Discord Bot Permissions", enabled: false },
          { name: "Achievements & Trophy Cabinet", enabled: false },
          { name: "On Demand Tournaments", enabled: false },
        ],
      };
    case 1500: // $15
      return {
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
      };
    case 2000: // $20
      return {
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
      };
    default:
      return {
        title: "Unknown Tier",
        description: "No description available.",
        features: [],
      };
  }
}
