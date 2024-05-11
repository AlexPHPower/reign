import { users } from "~/server/db/schema";
import { hash } from "bcrypt";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

export const registerRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string(),
        inGameName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(users).values({
          id: createId(),
          name: input.firstName + " " + input.lastName,
          email: input.email,
          password: await hash(input.password, 10),
          inGameName: input.inGameName,
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
