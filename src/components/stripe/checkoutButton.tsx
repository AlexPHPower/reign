"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { z } from "zod";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CheckoutResponseSchema = z.object({
  sessionId: z.string(),
});

type CheckoutResponse = z.infer<typeof CheckoutResponseSchema>;

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId: "price_1PUWnYRxSHK9mwecIN77Kgty" }),
      });

      if (!response.ok) {
        new Error("Network response was not ok");
      }

      const data: CheckoutResponse = CheckoutResponseSchema.parse(
        await response.json(),
      );

      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (error) {
          console.error(error.message);
        }
      } else {
        console.error("Stripe.js failed to load.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        role="link"
        onClick={handleCheckout}
        disabled={loading}
      >
        Checkout
      </button>
    </div>
  );
}
