import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "~/lib/stripe";
import { z } from "zod";

const CheckoutSessionRequestSchema = z.object({
  priceId: z.string(),
});

type CheckoutSessionRequest = z.infer<typeof CheckoutSessionRequestSchema>;

export async function POST(request: NextRequest | null) {
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
