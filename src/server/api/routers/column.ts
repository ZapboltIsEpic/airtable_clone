import { contextProps } from "@trpc/react-query/shared";
import { SupabaseClient } from '@supabase/supabase-js';
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const columnRouter = createTRPCRouter({

  get: publicProcedure
    .input(z.object({ rowid: z.string() }))
    .query(async ({ input, ctx }) => {
        const { data, error } = await ctx.supabase
          .schema('public')
          .from('columns')
          .select('*')
          .eq('rowid', input.rowid);

        if (error) {
          throw new Error(error.message);
        }

        return data;
    }),

    // should be protected but doesnt work for some reason?
  create: publicProcedure
    .input(z.object({ 
        rowid: z.string(),
        fieldname: z.string(),
     })
    )
    .mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase
      .schema('public')
      .from('columns')
      .insert([{ rowid: input.rowid, fieldname: input.fieldname }])
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
    }),
});
