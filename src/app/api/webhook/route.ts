// app/api/webhook/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "~/lib/stripe";
import { buffer } from "micro";
import { convertToIncomingMessage } from "~/lib/convertToIncomingMessage";
import type Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  const rawRequest = convertToIncomingMessage(request);
  const buf = await buffer(rawRequest);
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
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
    case "invoice.payment_succeeded":
      // handle successful payment here
      break;
    case "invoice.payment_failed":
      // handle failed payment here
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
