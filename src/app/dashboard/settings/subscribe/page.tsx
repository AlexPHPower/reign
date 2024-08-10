"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import React from "react";
import type { TierDetails } from "~/types";
import { NextResponse } from "next/server";
import CheckoutButton from "~/components/stripe/checkoutButton";
import { CircleCheck, CircleX } from "lucide-react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  if (!session?.user) {
    return NextResponse.redirect(new URL("/auth/signin"));
  }

  const { data, error, isLoading } = api.tier.tiers.useQuery();

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
          <div
            key={key + "wrapper"}
            className={`${session.user.priceId === tier.id ? "card-wrapper-green" : "card-wrapper"}`}
          >
            <Card
              key={key}
              className={`card-content relative flex w-1/3 max-w-sm flex-col shadow-lg`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center">
                  {tier.title}
                </CardTitle>
                <CardTitle className="flex items-center">
                  £{tier.price}
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-4`}>
                <p>{tier.description}</p>
                <ul className={`text-center text-neutral-200`} role={`list`}>
                  {tier.features.map(({ name, enabled }) => (
                    <li className={`flex items-center`} key={name}>
                      {enabled ? (
                        <CircleCheck
                          className={`mr-1 h-5 w-5 text-green-500`}
                        />
                      ) : (
                        <CircleX className={`mr-1 h-5 w-5 text-red-500`} />
                      )}
                      {name}
                    </li>
                  ))}
                </ul>
                <div className={`flex justify-center`}>
                  {session.user.priceId === tier.id ? (
                    <button className="rounded bg-green-600 p-2 text-white">
                      Manage Subscription
                    </button>
                  ) : tier.id.length > 0 && !session.user.priceId ? (
                    <CheckoutButton priceId={tier.id} />
                  ) : null}
                </div>
                {session.user.priceId === tier.id ? (
                  <div>
                    <hr></hr>
                    <CardFooter className={`mt-5 flex justify-center`}>
                      Your current subscription
                    </CardFooter>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </main>
  );
}
