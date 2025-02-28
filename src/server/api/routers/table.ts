// import { contextProps } from "@trpc/react-query/shared";
// import { SupabaseClient } from '@supabase/supabase-js';
import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import type { Table, Row } from "@prisma/client";

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

      return data as Table[];
    }),

    getTableRowsAndColumns: publicProcedure
    .input(z.object({ tableid: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      try {
        const { data: rows, error: rowError } = await ctx.supabase
          .schema('public')
          .from('rows')
          .select('*')
          .eq('tableid', input.tableid);
    
        if (rowError || !rows || rows.length === 0) {
          throw new Error('No rows found for this table.');
        }
    
        // Fetch columns for each row
        const columnsPromises = rows.map(async (row : Row) => {
          const { data: columns, error: columnError } = await ctx.supabase
            .schema('public')
            .from('columns')
            .select('*')
            .eq('rowid', row.id);
    
          if (columnError) {
            throw new Error(`Error fetching columns for row ${row.id}: ${columnError.message}`);
          }
    
          return { row, columns };
        });
    
        const rowsWithColumns = await Promise.all(columnsPromises);
        return rowsWithColumns; // Return both rows and columns
      } catch (error) {
        console.error('Error fetching table rows and columns:', error);
        throw error;
      }
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

    const typedData = data as Table[];
    const tableId = typedData[0]?.id;

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
      
      const typedRowData = rowData as Row[];
      const rowId = typedRowData[0]?.id;
  
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

        const {} = await ctx.supabase
        .schema('public')
        .from('columns')
        .insert([{ 
          fieldname: fieldName,
          columncontent: "",
          rowid: rowId
        }])

      }
    }

    const { data: newData} = await ctx.supabase
      .schema('public')
      .from('tables')
      .insert([{ name: input.name, baseid: input.baseid }])
      .select("*");

    return newData as Table[];
    }),
});
