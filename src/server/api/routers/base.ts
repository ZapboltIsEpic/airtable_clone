import { contextProps } from "@trpc/react-query/shared";
import { SupabaseClient } from '@supabase/supabase-js';
import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { api } from "~/trpc/server";

export const baseRouter = createTRPCRouter({
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
  
  // should only return 1 base
  getSpecificBase: publicProcedure
  .input(z.object({ id: z.string().uuid() }))
  .query(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase
        .schema('public')
        .from('bases')
        .select('*')
        .eq('id', input.id);

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

      const baseId = data[0].id;
      
      const { data: tableData, error: tableError } = await ctx.supabase
        .schema('public')
        .from('tables')
        .insert([{ 
            name: "Table 1", 
            baseid: baseId 
        }])
        .select("*")

      if (tableError) {
          throw new Error(tableError.message);
      }

      const tableId = tableData[0].id;

      for (let i = 0; i < 3; i++) {
        const { data: rowData, error: rowError } = await ctx.supabase
          .schema('public')
          .from('rows')
          .insert([{ 
              tableid: tableId
          }])
          .select("*");
  
        if (!rowData || rowData.length === 0) {
          throw new Error(`No row data returned for row ${i + 1}`);
        }

        const rowId = rowData[0].id as string;
    
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
