// import { contextProps } from "@trpc/react-query/shared";
// import { SupabaseClient } from '@supabase/supabase-js';
import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import type { Table } from "@prisma/client";

interface Row {
  id: string;
  tableid: string;
  createdat: Date | null;
  updatedat: Date | null;
}

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

      return data.map(table => ({
        ...table,
        createdat: table.createdat ? new Date(table.createdat) : null,
        updatedat: table.updatedat ? new Date(table.updatedat) : null,
      })) as Table[];
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
        const columnsPromises = rows.map(async (row) => {
          const typedRow: Row = {
            ...row,
            createdat: row.createdat ? new Date(row.createdat) : null,
            updatedat: row.updatedat ? new Date(row.updatedat) : null,
          };
          const { data: columns } = await ctx.supabase
            .schema('public')
            .from('columns')
            .select('*')
            .eq('rowid', row.id);
          return { row: typedRow, columns };
        });
    
        const rowsWithColumns = await Promise.all(columnsPromises);
        return rowsWithColumns; // Return both rows and columns
      } catch (error) {
        console.error('Error fetching table rows and columns:', error);
        throw error;
      }
    }),
  
    getTableFilteredRowsAndColumns: publicProcedure
    .input(z.object({ 
      tableid: z.string(),
      filters: z.array(
        z.object({
          id: z.union([z.string(), z.number().transform(num => num.toString())]),
          fieldname: z.string(),
          operator: z.string(),
          value: z.string(),
        })
      ).optional(),
     }))
    .query(async ({ input, ctx }) => {
      const { tableid, filters } = input;

      let query = ctx.supabase
        .schema('public')
        .from('rows')
        .select('*')
        .eq('tableid', tableid);

      let rows: Row[] = [];
      if (filters && filters.length > 0) {
        const { data: rowsData, error: rowsError } = await ctx.supabase
          .schema('public')
          .from('rows')
          .select('*')
          .eq('tableid', tableid);

        if (rowsError) {
          throw new Error(rowsError.message);
        }

        rows = rowsData as Row[];

        const { data: columnsData, error: columnsError } = await ctx.supabase
          .schema('public')
          .from('columns')
          .select('*')
          .in('rowid', rows.map(row => row.id));

        if (columnsError) {
          throw new Error(columnsError.message);
        }

        const filteredRowIds = new Set<string>();

        rows.forEach(row => {
          const rowColumns = columnsData.filter(column => column.rowid === row.id);
          let rowMatches = true;

          filters.forEach(filter => {
        const { fieldname, operator, value } = filter;
        const column = rowColumns.find(col => col.fieldname === fieldname);

        if (!column) {
          rowMatches = false;
          return;
        }

        switch (operator) {
          case 'contains':
            if (!column.columncontent.includes(value)) rowMatches = false;
            break;
          case 'does not contain':
            if (column.columncontent.includes(value)) rowMatches = false;
            break;
          case 'is':
            if (column.columncontent !== value) rowMatches = false;
            break;
          case 'is not':
            if (column.columncontent === value) rowMatches = false;
            break;
          case 'is empty':
            if (column.columncontent !== null) rowMatches = false;
            break;
          case 'is not empty':
            if (column.columncontent === null) rowMatches = false;
            break;
          default:
            break;
        }
          });

          if (rowMatches) {
        filteredRowIds.add(row.id);
          }
        });

        query = query.in('id', Array.from(filteredRowIds));
      }

      const { data: rowsData, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      const columnsPromises = rowsData.map(async (row) => {
        const typedRow: Row = {
          ...row,
          createdat: row.createdat ? new Date(row.createdat) : null,
          updatedat: row.updatedat ? new Date(row.updatedat) : null,
        };
        const { data: columns, error: columnError } = await ctx.supabase
          .schema('public')
          .from('columns')
          .select('*')
          .eq('rowid', row.id);

        if (columnError) {
          throw new Error(columnError.message);
        }

        return { row: typedRow, columns };
      });

      const rowsWithColumns = await Promise.all(columnsPromises);
      return rowsWithColumns;
    }),

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

    const typedData = data.map(table => ({
      ...table,
      createdat: table.createdat ? new Date(table.createdat) : null,
      updatedat: table.updatedat ? new Date(table.updatedat) : null,
    })) as Table[];
    const tableId = typedData[0]?.id;
    if (!tableId) {
      throw new Error('Table ID is undefined.');
    }

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

        if (!rowId) {
          throw new Error(`Row ID is undefined for row ${i + 1}`);
        }

        const { error: columnError } = await ctx.supabase
          .schema('public')
          .from('columns')
          .insert([{ 
            fieldname: fieldName,
            columncontent: "",
            rowid: rowId
          }]);

        if (columnError) {
          console.error(`Error inserting column ${j + 1} for row ${i + 1}:`, columnError);
        }

      }
    }

    return typedData;
    }),
});
