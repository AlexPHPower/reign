import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { stripeSubscriptions } from "~/server/db/schema";
import { and, eq, lte } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export async function handleInvoicePaid(eventObject: Stripe.Invoice) {
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

  const endPeriod = eventObject.lines.data[0]?.period.end;
  const endDate = new Date(
    endPeriod ? endPeriod * 1000 : Date.now() + 30 * 24 * 60 * 60 * 1000,
  );

  const existingSubscriptions = await db
    .select({
      id: stripeSubscriptions.id,
    })
    .from(stripeSubscriptions)
    .where(
      and(
        eq(
          stripeSubscriptions.stripeCustomerId,
          typeof customerId === "string" ? customerId : customerId.id,
        ),
        eq(stripeSubscriptions.status, "active"),
        lte(stripeSubscriptions.endDate, endDate),
      ),
    )
    .execute();

  if (existingSubscriptions.length > 0) {
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
            lte(stripeSubscriptions.endDate, endDate),
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
        endDate: endDate,
        status: "active",
      });
    });
  }

  return NextResponse.json({ received: true });
}
