import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "~/lib/stripe";
import type Stripe from "stripe";
import { handleInvoicePaid } from "~/lib/stripe-helpers/handleInvoicePaid";
import { handleCheckoutSessionCompleted } from "~/lib/stripe-helpers/handleCheckoutSessionCompleted";
import { handlePaymentFailed } from "~/lib/stripe-helpers/handlePaymentFailed";

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
