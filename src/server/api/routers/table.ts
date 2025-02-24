import { contextProps } from "@trpc/react-query/shared";
import { SupabaseClient } from '@supabase/supabase-js';
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tableRouter = createTRPCRouter({

  getAllTables: publicProcedure
    .input(z.object({ baseid: z.string().uuid() }))
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

    const tableId = data[0].id;

    for (let i = 0; i < 3; i++) {
      const { data: rowData, error: rowError } = await ctx.supabase
        .schema('public')
        .from('rows')
        .insert([{ 
            tableid: tableId
        }])
        .select("*");

      const rowId = rowData[0].id;
  
      if (rowError) {
          console.error(`Error inserting row ${i + 1}:`, rowError);
          break; 
      } else {
          console.log(`Row ${i + 1} inserted successfully.`, rowId);
      }

      for (let j = 0; j < 4; j++) {
        let fieldName = "";
        if (j == 0) {
          fieldName = "Name";
        }
        else if (j == 1) {
          fieldName = "Notes";
        }
        else if (j == 2) {
          fieldName = "Assignee";
        }
        else if (j == 3) {
          fieldName = "Status";
        }

        const { data: rowData, error: rowError } = await ctx.supabase
        .schema('public')
        .from('columns')
        .insert([{ 
          fieldname: fieldName,
          columncontent: "",
          rowid: rowId
        }])

      }
    }

    return data;
    }),
});
