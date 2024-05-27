import { api } from "~/trpc/react";
import LoadingPricePage from "~/app/(home)/about/loading";
import type { TierDetails } from "~/types";
import TierCard from "~/components/pricing/tier-card";
import React from "react";

export default function Tiers() {
  const { data, error, isLoading } = api.tier.tiers.useQuery();

  if (isLoading) {
    return <LoadingPricePage />;
  }

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return <div>No tiers available.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {Object.entries(data).map(([tierKey, tier]: [string, TierDetails]) => (
        <TierCard
          key={tierKey}
          title={tier.title}
          description={tier.description}
          features={tier.features}
          price={tier.price}
        />
      ))}
    </div>
  );
}
