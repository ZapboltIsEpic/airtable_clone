import { api } from "~/trpc/react";

export const useTablesQuery = (baseId?: string) => {
    const { data, isLoading, error } = api.table.getAllTables.useQuery(
        { baseid: baseId! },
        { enabled: !!baseId}, 
    );

    return { data, isLoading, error };
};

export const useCreateTableMutation = () => {
    const ctx = api.useUtils(); 
    return api.table.create.useMutation({
        onMutate: async (newTable: { name: string; baseid: string }) => {
            await ctx.table.getAllTables.cancel();

            const previousTables = ctx.table.getAllTables.getData({ baseid: newTable.baseid });

            ctx.table.getAllTables.setData({ baseid: newTable.baseid }, [
                ...(previousTables ?? []),
                {
                  id: `temp-${(previousTables?.length ?? 0) + 1}`, 
                  name: newTable.name,
                  createdat: new Date(),
                  updatedat: new Date(),
                  baseid: newTable.baseid,
                  numberedid: (previousTables?.length ?? 0) + 1,
                },
            ]);

            return { previousTables }
        },
        onError: (error, newTable, context) => {
            console.error("Error creating table:", error);
            if (context?.previousTables) {
              ctx.table.getAllTables.setData({ baseid: newTable.baseid }, context.previousTables);
            }
        },
        onSuccess: () => {
            console.log("success");
        },
        onSettled: async () => {
            await ctx.table.getAllTables.invalidate();
        },
    });
}

export const useTableGetAllRowsAndColumnsQuery = (tableId?: string) => {
    const { data, isLoading, error } = api.table.getTableRowsAndColumns.useQuery(
        { tableid: tableId! }, 
        { enabled: !!tableId } 
    );

    return { data, isLoading, error };
};