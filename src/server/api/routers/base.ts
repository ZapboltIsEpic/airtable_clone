import { contextProps } from "@trpc/react-query/shared";
import { SupabaseClient } from '@supabase/supabase-js';
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
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
      
      const { error: tableError } = await ctx.supabase
        .schema('public')
        .from('tables')
        .insert([{ 
            name: "Table 1", 
            baseid: baseId 
        }]);

      if (tableError) {
          throw new Error(tableError.message);
      }

      return data;
    }),
});
