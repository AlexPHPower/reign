import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "~/lib/stripe";
import { z } from "zod";
import { db } from "~/server/db";

const BillingSessionRequestSchema = z.object({
  userEmail: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    if (!request) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const body = BillingSessionRequestSchema.parse(await request.json());

    if (!body.userEmail) {
      return NextResponse.json({ error: "Missing userEmail" }, { status: 400 });
    }

    const user = await db.query.users.findFirst({
      columns: { id: true, stripeCustomerId: true },
      where: (users, { eq }) => eq(users.email, body.userEmail),
      with: { stripeSubscriptions: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const stripeCustomerId = user?.stripeSubscriptions.map(
      (sub) => sub.stripeCustomerId,
    )[0];

    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 404 },
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${request.nextUrl.origin}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 },
    );
  }
}
