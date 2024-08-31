import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const userProfileRouter = createTRPCRouter({
  eaId: publicProcedure
    .input(
      z.object({
        eaId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!ctx.session?.user && !ctx.session?.user?.id) {
          return;
        }

        await ctx.db
          .update(users)
          .set({
            eaId: input.eaId,
          })
          .where(eq(users.id, ctx.session.user.id));
      } catch (error) {
        console.log(error);
      }
    }),
  inGameName: publicProcedure
    .input(
      z.object({
        inGameName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!ctx.session?.user && !ctx.session?.user?.id) {
          return;
        }

        await ctx.db
          .update(users)
          .set({
            inGameName: input.inGameName,
          })
          .where(eq(users.id, ctx.session.user.id));
      } catch (error) {
        console.log(error);
      }
    }),
});
