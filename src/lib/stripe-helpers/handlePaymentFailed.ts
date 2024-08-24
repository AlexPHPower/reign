import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { stripeSubscriptions } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export async function handlePaymentFailed(
  eventObject: Stripe.PaymentIntent | Stripe.Checkout.Session | Stripe.Invoice,
) {
  const customerId = eventObject.customer?.toString();

  if (!customerId) {
    return NextResponse.json(
      { error: "Customer ID not found in event data" },
      { status: 404 },
    );
  }

  await db
    .delete(stripeSubscriptions)
    .where(
      and(
        eq(stripeSubscriptions.stripeCustomerId, customerId),
        eq(stripeSubscriptions.status, "pending"),
      ),
    );

  return NextResponse.json({ received: true });
}
