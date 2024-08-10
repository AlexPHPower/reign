import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "~/lib/stripe";
import { z } from "zod";
import { db } from "~/server/db";
import { stripeSubscriptions } from "~/server/db/schema";
import { createId } from "@paralleldrive/cuid2";

const CheckoutSessionRequestSchema = z.object({
  priceId: z.string(),
  userEmail: z.string(),
});

type CheckoutSessionRequest = z.infer<typeof CheckoutSessionRequestSchema>;

export async function POST(request: NextRequest) {
  try {
    if (!request) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const body: CheckoutSessionRequest = CheckoutSessionRequestSchema.parse(
      await request.json(),
    );

    if (!body.priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    if (!body.userEmail) {
      return NextResponse.json({ error: "Missing userEmail" }, { status: 400 });
    }

    const user = await db.query.users.findFirst({
      columns: { id: true },
      where: (users, { eq }) => eq(users.email, body.userEmail),
    });

    if (!user?.id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tempSubscriptionId = createId();

    const customer = await stripe.customers.create({
      email: body.userEmail,
      metadata: {
        userId: user.id,
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      mode: "subscription",
      customer: customer.id,
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      success_url: `${request.nextUrl.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cancel`,
      metadata: {
        userId: user.id,
        tempSubscriptionId: tempSubscriptionId,
      },
    });

    await db.insert(stripeSubscriptions).values({
      id: createId(),
      userId: user.id,
      stripeSubscriptionId: tempSubscriptionId,
      stripeCustomerId: customer.id,
      stripePriceId: body.priceId,
      quantity: 1,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: "pending",
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
