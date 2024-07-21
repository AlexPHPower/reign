import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { db } from "~/server/db";
import { and } from "drizzle-orm";

export const config = {
  matcher: ["/dashboard/((?!settings).*)"],
};

export default withAuth(
  async (req) => {
    const { token } = req.nextauth;
    const url = new URL(req.url);
    const path = url.pathname;

    if (path === "/dashboard/settings/subscribe") {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    const userId = token.sub;

    if (!userId) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    try {
      const subscriptions = await db.query.stripeSubscriptions.findMany({
        where: (subscriptions, { eq }) =>
          and(
            eq(subscriptions.userId, userId),
            eq(subscriptions.status, "active"),
          ),
      });

      if (subscriptions.length === 0) {
        return NextResponse.redirect(
          new URL("/dashboard/settings/subscribe", req.url),
        );
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      return NextResponse.redirect(new URL("/error", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/signin",
    },
  },
);
