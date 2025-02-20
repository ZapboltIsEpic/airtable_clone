import { contextProps } from "@trpc/react-query/shared";
import { SupabaseClient } from '@supabase/supabase-js';
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const baseRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
    }),

  get: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
        const { data, error } = await ctx.supabase
          .schema('public')
          .from('bases')
          .select('*')
          .eq('userid', input.userId);

        if (error) {
          throw new Error(error.message);
        }

        return data;
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase
      .from('base')
      .insert([
        { name: input.name, created_by: ctx.session.user.id }
      ]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
    }),
});
