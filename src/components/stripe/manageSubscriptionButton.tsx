"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useSession } from "next-auth/react";

const CheckoutResponseSchema = z.object({
  url: z.string(),
});

type CheckoutResponse = z.infer<typeof CheckoutResponseSchema>;

export default function ManageSubscriptionButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/customer-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: session?.user?.email,
        }),
      });

      if (!response.ok) {
        new Error("Network response was not ok");
      }

      const data: CheckoutResponse = CheckoutResponseSchema.parse(
        await response.json(),
      );

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Portal URL not found in response data");
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
        className="rounded border border-gray-600 bg-card p-2 text-white"
      >
        {children ?? "Manage Subscription"}
      </button>
    </div>
  );
}
