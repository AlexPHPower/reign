import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import React from "react";

export default function SubscriptionInfoCard() {
  return (
    <Card className={`card-content relative flex flex-col shadow-lg`}>
      <CardHeader className="flex flex-row items-center justify-center space-y-0">
        <CardTitle className="flex text-4xl ">Plans and Billing</CardTitle>
      </CardHeader>
      <CardContent className={`space-y-4`}>
        <p>
          Your subscription is managed through Stripe, with billing
          automatically processed at the start of each billing cycle. To upgrade
          or cancel your subscription, please use the Stripe portal.
        </p>
        <p>
          Note that any changes, including cancellations or upgrades, will take
          effect at the end of the current billing period. For further
          assistance or inquiries, please contact our support team at{" "}
          <a href="mailto:support@titan.com" className="text-blue-500">
            support@titan.com
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
}
