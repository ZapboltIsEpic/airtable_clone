// import { contextProps } from "@trpc/react-query/shared";
// import { SupabaseClient } from '@supabase/supabase-js';
import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import type { Column } from "@prisma/client";

export const columnRouter = createTRPCRouter({

  getAllColsByRowId: publicProcedure
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

        const convertedData = data.map(item => ({
          ...item,
          createdat: item.createdat ? new Date(item.createdat) : null,
          updatedat: item.updatedat ? new Date(item.updatedat) : null,
        }));
        
        return convertedData;
    }),
    
  // getFilteredColsByRowId: publicProcedure
  //   .input(z.object({ fieldnames: z.string().array() }))
  //   .query(async ({ input, ctx }) => {
  //       const { data, error } = await ctx.supabase
  //         .schema('public')
  //         .from('columns')
  //         .select('*')
  //         .eq('rowid', input.rowid);

  //       if (error) {
  //         throw new Error(error.message);
  //       }

  //       const convertedData = data.map(item => ({
  //         ...item,
  //         createdat: item.createdat ? new Date(item.createdat) : null,
  //         updatedat: item.updatedat ? new Date(item.updatedat) : null,
  //       }));
        
  //       return convertedData;
  //   }),

  
  createNewCol: publicProcedure
    .input(z.object({
      rowids: z.string().array(),
      fieldname: z.string(),
    })
    )
    .mutation(async ({ ctx, input }) => {
      for (const rowid of input.rowids) {
        const { error } = await ctx.supabase
          .schema('public')
          .from('columns')
          .insert([{ rowid : rowid, fieldname: input.fieldname, columncontent: ""}])
          
        if (error) {
          throw new Error(error.message);
        }
      }
    }),

  
  updateColContent: publicProcedure
    .input(z.object({
      rowid: z.string().uuid(),
      fieldname: z.string(),
      columncontent: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .schema('public')
        .from('columns')
        .update({ 'columncontent': input.columncontent })
        .eq('rowid', input.rowid)
        .eq('fieldname', input.fieldname)

      if (error) {
        throw new Error(error.message);
      }
    }),
  
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
      .insert([{ rowid: input.rowid, fieldname: input.fieldname, columncontent: "" }])
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    const convertedData = data.map(item => ({
      ...item,
      createdat: item.createdat ? new Date(item.createdat) : null,
      updatedat: item.updatedat ? new Date(item.updatedat) : null,
    }));

    return convertedData as Column[];
    }),
});
