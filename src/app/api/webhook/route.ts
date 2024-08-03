import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "~/lib/stripe";
import type Stripe from "stripe";
import { stripeSubscriptions } from "~/server/db/schema";
import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const buf = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: ${(err as Error).message}` },
      { status: 400 },
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const eventObject = event.data.object;

      if (eventObject.payment_status !== "paid") {
        return NextResponse.json(
          {
            received: true,
            message: "Payment not completed",
          },
          { status: 200 },
        );
      }

      const invoiceId = eventObject.invoice;
      const customerId = eventObject.customer;

      if (!customerId) {
        return NextResponse.json(
          { error: "Customer ID not found in event data" },
          { status: 404 },
        );
      }

      if (!invoiceId) {
        return NextResponse.json(
          { error: "Invoice ID not found in event data" },
          { status: 404 },
        );
      }

      const invoice: Stripe.Invoice = await stripe.invoices.retrieve(
        typeof invoiceId === "string" ? invoiceId : invoiceId.id,
      );

      if (!invoice) {
        return NextResponse.json(
          { error: "Invoice not found" },
          { status: 404 },
        );
      }

      const userId = eventObject.metadata!.userId;
      const tempSubscriptionId = eventObject.metadata!.tempSubscriptionId;

      const endDate = invoice.due_date
        ? new Date(invoice.due_date * 1000)
        : new Date(new Date().getDate() + 30);

      if (!tempSubscriptionId) {
        return NextResponse.json(
          { error: "Subscription ID not found in metadata" },
          { status: 404 },
        );
      }

      if (!userId) {
        return NextResponse.json(
          { error: "User ID not found in metadata" },
          { status: 402 },
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
              : invoice.subscription!.id,
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

      break;
    case "invoice.payment_failed":
    case "checkout.session.async_payment_failed":
    case "payment_intent.payment_failed":
      if (!event.data.object.customer) {
        return NextResponse.json(
          { error: "Customer ID not found in event data" },
          { status: 404 },
        );
      }

      await db
        .delete(stripeSubscriptions)
        .where(
          and(
            eq(
              stripeSubscriptions.stripeCustomerId,
              typeof event.data.object.customer === "string"
                ? event.data.object.customer
                : event.data.object.customer.id,
            ),
            eq(stripeSubscriptions.status, "pending"),
          ),
        );
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
