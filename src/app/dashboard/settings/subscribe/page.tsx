"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { NextResponse } from "next/server";
import PricingTierCard from "~/components/dashboard/settings/subscription/tierCard";
import SubscriptionInfoCard from "~/components/dashboard/settings/subscription/subscriptionInfoCard";

export default function Dashboard() {
  const { data: session } = useSession();
  if (!session?.user) {
    return NextResponse.redirect(new URL("/auth/signin"));
  }

  return (
    <main className={`space-y-4 p-4`}>
      <SubscriptionInfoCard />
      <PricingTierCard session={session}></PricingTierCard>
    </main>
  );
}
