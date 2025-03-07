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

        return data.map(row => ({
          ...row,
          createdat: row.createdat ? new Date(row.createdat) : null,
          updatedat: row.updatedat ? new Date(row.updatedat) : null,
        })) as Row[];
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

    const typedData = data?.map(row => ({
      ...row,
      createdat: row.createdat ? new Date(row.createdat) : null,
      updatedat: row.updatedat ? new Date(row.updatedat) : null,
    })) as Row[];

    if (error) {
      throw new Error(error.message);
    }

    if (typedData && typedData.length > 0) {
      for (const fieldname of input.fieldnames) {
        const { error: colError } = await ctx.supabase
          .schema('public')
          .from('columns')
          .insert([{ rowid : typedData[0]?.id ?? "", fieldname: fieldname, columncontent: ""}])
        
        if (colError) {
          throw new Error(colError.message);
        }
      }
    }

    const { data : newData } = await ctx.supabase
      .schema('public')
      .from('rows')
      .select("*");

    return newData?.map(row => ({
      ...row,
      createdat: row.createdat ? new Date(row.createdat) : null,
      updatedat: row.updatedat ? new Date(row.updatedat) : null,
    })) as Row[];
    }),
  
    createNew1kRows: publicProcedure
    .input(z.object({ 
      tableid: z.string(),
      fieldnames: z.string().array(),
   }))
   .mutation(async ({ ctx, input }) => {
    const rowsToInsert = Array.from({ length: 1000 }, () => ({ tableid: input.tableid }));
    const { data, error } = await ctx.supabase
      .schema('public')
      .from('rows')
      .insert(rowsToInsert)
      .select("*");

    const typedData = data?.map(row => ({
      ...row,
      createdat: row.createdat ? new Date(row.createdat) : null,
      updatedat: row.updatedat ? new Date(row.updatedat) : null,
    })) as Row[];

    if (error) {
      throw new Error(error.message);
    }

    if (typedData && typedData.length > 0) {
      for (const row of typedData) {
        for (const fieldname of input.fieldnames) {
          const { error: colError } = await ctx.supabase
            .schema('public')
            .from('columns')
            .insert([{ rowid: row.id, fieldname: fieldname, columncontent: "" }]);
          
          if (colError) {
            throw new Error(colError.message);
          }
        }
      }
    }

    const { data: newData } = await ctx.supabase
      .schema('public')
      .from('rows')
      .select("*");

    return newData?.map(row => ({
      ...row,
      createdat: row.createdat ? new Date(row.createdat) : null,
      updatedat: row.updatedat ? new Date(row.updatedat) : null,
    })) as Row[];
    }),
});
