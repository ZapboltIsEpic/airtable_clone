import { contextProps } from "@trpc/react-query/shared";
import { SupabaseClient } from '@supabase/supabase-js';
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tableRouter = createTRPCRouter({

  get: publicProcedure
    .input(z.object({ baseid: z.string() }))
    .query(async ({ input, ctx }) => {
        const { data, error } = await ctx.supabase
          .schema('public')
          .from('tables')
          .select('*')
          .eq('baseid', input.baseid);

        if (error) {
          throw new Error(error.message);
        }

        return data;
    }),

    // should be protected but doesnt work for some reason?
  create: publicProcedure
    .input(z.object({ 
        name: z.string(),
        baseid: z.string()
     })
    )
    .mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase
      .schema('public')
      .from('tables')
      .insert([{ name: input.name, baseid: input.baseid }])
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
    }),
});
