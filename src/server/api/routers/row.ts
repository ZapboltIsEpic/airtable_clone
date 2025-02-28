// import { contextProps } from "@trpc/react-query/shared";
// import { SupabaseClient } from '@supabase/supabase-js';
import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import type { Row } from "@prisma/client";

export const rowRouter = createTRPCRouter({
  getAllRowsByTableId: publicProcedure
    .input(z.object({ tableid: z.string() }))
    .query(async ({ input, ctx }) => {
        const { data, error } = await ctx.supabase
          .schema('public')
          .from('rows')
          .select('*')
          .eq('tableid', input.tableid);

        if (error) {
          throw new Error(error.message);
        }

        return data as Row[];
    }),

  createNewRow: publicProcedure
    .input(z.object({ 
        tableid: z.string(),
        fieldnames: z.string().array(),
     })
    )
    .mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase
      .schema('public')
      .from('rows')
      .insert([{ tableid: input.tableid }])
      .select("*");

    const typedData = data as Row[];

    if (error) {
      throw new Error(error.message);
    }

    if (typedData && typedData.length > 0) {
      for (const fieldname of input.fieldnames) {
        const { error: colError } = await ctx.supabase
          .schema('public')
          .from('columns')
          .insert([{ rowid : typedData[0]?.id, fieldname: fieldname, columncontent: ""}])
        
        if (colError) {
          throw new Error(colError.message);
        }
      }
    }

    const { data : newData } = await ctx.supabase
      .schema('public')
      .from('rows')
      .insert([{ tableid: input.tableid }])
      .select("*");

    return newData as Row[];
    }),
});
