import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "~/lib/stripe";
import { db } from "~/server/db";
import { stripeSubscriptions } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export async function handleCheckoutSessionCompleted(
  eventObject: Stripe.Checkout.Session,
) {
  const {
    payment_status,
    invoice: invoiceId,
    customer: customerId,
    metadata,
  } = eventObject;

  if (payment_status !== "paid") {
    return NextResponse.json(
      {
        received: true,
        message: "Payment not completed",
      },
      { status: 200 },
    );
  }

  if (!customerId || !invoiceId || !metadata) {
    return NextResponse.json(
      { error: "Missing required data in event object" },
      { status: 404 },
    );
  }

  const invoice: Stripe.Invoice = await stripe.invoices.retrieve(
    typeof invoiceId === "string" ? invoiceId : invoiceId.id,
  );

  const { userId, tempSubscriptionId } = metadata;
  const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  if (!userId || !tempSubscriptionId) {
    return NextResponse.json(
      { error: "Subscription or User ID not found in metadata" },
      { status: 404 },
    );
  }

  await db
    .update(stripeSubscriptions)
    .set({
      stripeCustomerId:
        typeof customerId === "string" ? customerId : customerId.id,
      stripePriceId: invoice.lines.data[0]!.price!.id,
      stripeSubscriptionId:
        typeof invoice.subscription === "string"
          ? invoice.subscription
          : invoice.subscription?.id,
      quantity: 1,
      startDate: new Date(),
      endDate: endDate,
      status: "active",
    })
    .where(
      and(
        eq(stripeSubscriptions.userId, userId),
        eq(stripeSubscriptions.stripeSubscriptionId, tempSubscriptionId),
      ),
    );

  return NextResponse.json({ received: true });
}
