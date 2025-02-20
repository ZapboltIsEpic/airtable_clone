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

    // should be protected but doesnt work for some reason?
  create: publicProcedure
    .input(z.object({ 
        name: z.string(),
        workspace: z.string(),
        userId: z.string(),
     })
    )
    .mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase
      .schema('public')
      .from('bases')
      .insert([{ name: input.name, workspace: input.workspace, userid: input.userId }])
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
    }),
});
