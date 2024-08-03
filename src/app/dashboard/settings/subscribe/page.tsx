"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react";
import React from "react";
import type { TierDetails } from "~/types";
import { db } from "~/server/db";
import { NextResponse } from "next/server";
import CheckoutButton from "~/components/stripe/checkoutButton";

export default function Dashboard() {
  const { data: session, status } = useSession();
  if (!session?.user) {
    return NextResponse.redirect(new URL("/auth/signin"));
  }

  const { data, error, isLoading } = api.tier.tiers.useQuery();
  // const userId = session.user.id;
  const subscription = [];

  // await db.query.stripeSubscriptions.findMany({
  //   where: (subscriptions, { eq }) => eq(subscriptions.userId, userId),
  // });

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return <div>No Subscriptions Available</div>;
  }

  return (
    <main className={`p-4`}>
      <div className="flex flex-row gap-2">
        {Object.entries(data).map(([key, tier]: [string, TierDetails]) => (
          <Card
            key={key}
            className={`relative flex w-1/3 max-w-sm flex-col border-4 border-blue-600 bg-gray-500 shadow-lg`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center">{tier.title}</CardTitle>
              <CardTitle className="flex items-center">£{tier.price}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{tier.description}</p>
              {subscription.length > 0 ? (
                <button className="rounded bg-blue-500 p-2 text-white">
                  Manage Subscription
                </button>
              ) : tier.id.length > 0 ? (
                <CheckoutButton priceId={tier.id} />
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
