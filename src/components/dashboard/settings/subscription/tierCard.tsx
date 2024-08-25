import type { TierDetails } from "~/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CircleCheck, CircleX } from "lucide-react";
import ManageSubscriptionButton from "~/components/stripe/manageSubscriptionButton";
import CheckoutButton from "~/components/stripe/checkoutButton";
import React from "react";
import { type Session } from "next-auth";
import { api } from "~/trpc/react";
import LoadingTierCard from "~/app/(home)/pricing/loading";

export default function PricingTierCard({ session }: { session: Session }) {
  const { data, error, isLoading } = api.tier.tiers.useQuery();

  if (isLoading) {
    return <LoadingTierCard className="flex flex-row justify-center gap-8" />;
  }

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return <div>No Subscriptions Available</div>;
  }

  return (
    <div className="flex flex-row justify-center gap-2">
      {Object.entries(data).map(
        ([key, tier]: [string, TierDetails], index, array) => {
          const currentTierIndex = array.findIndex(
            ([_, t]: [string, TierDetails]) => t.id === session.user.priceId,
          );

          const buttonText =
            index < currentTierIndex
              ? "Downgrade Subscription"
              : "Upgrade Subscription";

          return (
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
                  <div>
                    <hr></hr>
                    <CardFooter className={`mt-5 flex justify-center`}>
                      {session.user.priceId === tier.id ? (
                        <ManageSubscriptionButton />
                      ) : tier.id.length > 0 && !session.user.priceId ? (
                        <CheckoutButton priceId={tier.id} />
                      ) : (
                        <ManageSubscriptionButton>
                          {buttonText}
                        </ManageSubscriptionButton>
                      )}
                    </CardFooter>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        },
      )}
    </div>
  );
}
