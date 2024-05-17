import { Card, CardContent, CardHeader } from "~/components/ui/card";
import Image from "next/image";
import React from "react";

export default function PayoutsCard() {
  return (
    <Card className="col-span-1 shadow-lg shadow-secondary">
      <CardHeader className="text-center text-2xl font-bold text-primary md:text-left">
        Payouts you can trust
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-center text-neutral-400 md:text-left">
            League winnings are paid out within 72 hours of the end of the
            league via PayPal.
          </p>
          <Image
            src="/PaypalLogo.png"
            alt="Paypal Logo"
            className="mx-auto mt-8 h-24 w-auto"
            width={100}
            height={24}
          />
        </div>
      </CardContent>
    </Card>
  );
}
