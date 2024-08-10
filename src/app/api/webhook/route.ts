import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "~/lib/stripe";
import type Stripe from "stripe";
import { stripeSubscriptions } from "~/server/db/schema";
import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

async function handleInvoicePaid(eventObject: Stripe.Invoice) {
  const {
    id: invoiceId,
    customer: customerId,
    customer_email: customerEmail,
    lines,
    subscription,
  } = eventObject;
  const priceId = lines.data[0]?.price?.id;

  if (
    !customerId ||
    !invoiceId ||
    !customerEmail ||
    !priceId ||
    !subscription
  ) {
    return NextResponse.json(
      { error: "Missing required data in event object" },
      { status: 404 },
    );
  }

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, customerEmail),
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await db.transaction(async (tx) => {
    await tx
      .update(stripeSubscriptions)
      .set({ status: "expired" })
      .where(
        and(
          eq(
            stripeSubscriptions.stripeCustomerId,
            typeof customerId === "string" ? customerId : customerId.id,
          ),
          eq(stripeSubscriptions.status, "active"),
        ),
      );

    await tx.insert(stripeSubscriptions).values({
      id: createId(),
      userId: user.id,
      stripeSubscriptionId:
        typeof subscription === "string" ? subscription : subscription.id,
      stripeCustomerId:
        typeof customerId === "string" ? customerId : customerId.id,
      stripePriceId: priceId,
      quantity: 1,
      startDate: new Date(),
      endDate: new Date(),
      status: "active",
    });
  });

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(
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
  const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

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

async function handlePaymentFailed(
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

  switch (event.type) {
    case "checkout.session.completed":
      return await handleCheckoutSessionCompleted(event.data.object);
    case "invoice.payment_failed":
    case "checkout.session.async_payment_failed":
    case "payment_intent.payment_failed":
      return await handlePaymentFailed(event.data.object);
    case "invoice.paid":
      return await handleInvoicePaid(event.data.object);
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
