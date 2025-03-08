import { api } from "~/trpc/react";

export const useCreateRowMutation = () => {
    const ctx = api.useUtils(); 
    return api.row.createNewRow.useMutation({
        onMutate: async (newRow: { tableid: string; fieldnames: string[] }) => {
            await ctx.table.getTableRowsAndColumns.cancel();

            const previousTableRowsAndColumns = ctx.table.getTableRowsAndColumns.getData({ tableid: newRow.tableid });

            const newTempRow = {
                row: {
                    id: `temp-${Date.now()}`,
                    tableid: newRow.tableid,
                    createdat: new Date(),
                    updatedat: new Date(),
                },
                columns: newRow.fieldnames.map((fieldname, index) => ({
                    columncontent: "", 
                    createdat: new Date().toISOString(),
                    fieldname,
                    id: `temp-col-${Date.now()}-${index}`, 
                    numberedid: index + 1, 
                    rowid: `temp-${Date.now()}`,
                    updatedat: new Date().toISOString(),
                }))
            };

            const newTableRowsAndColumns = [...(previousTableRowsAndColumns ?? []), newTempRow];
            ctx.table.getTableRowsAndColumns.setData({ tableid: newRow.tableid }, newTableRowsAndColumns);

            return { previousTableRowsAndColumns }
        },
        onError: (error, newRow, context) => {
            console.error("Error creating table:", error);
            if (context?.previousTableRowsAndColumns) {
              ctx.table.getTableRowsAndColumns.setData({ tableid: newRow.tableid }, context.previousTableRowsAndColumns);
            }
        },
        onSuccess: () => {
            console.log("success");
        },
        onSettled: async () => {
            await ctx.table.getTableRowsAndColumns.invalidate();
        },
    });
}

export const useCreate1kRowsMutation = () => {
    const ctx = api.useUtils();

    return api.row.createNew1kRows.useMutation({
        onMutate: async (newRowsData: { tableid: string; fieldnames: string[] }) => {
            await ctx.table.getTableRowsAndColumns.cancel();

            const previousTableRowsAndColumns = ctx.table.getTableRowsAndColumns.getData({ tableid: newRowsData.tableid });

            const newTempRows = Array.from({ length: 1000 }, (_, i) => {
                const rowId = `temp-${Date.now()}-${i}`;
                const columns = newRowsData.fieldnames.map((fieldname, index) => ({
                    columncontent: "",
                    createdat: new Date().toISOString(),
                    fieldname,
                    id: `temp-col-${Date.now()}-${index}-${i}`,
                    numberedid: index + 1,
                    rowid: rowId,
                    updatedat: new Date().toISOString(),
                }));

                return {
                    row: {
                        id: rowId,
                        tableid: newRowsData.tableid,
                        createdat: new Date(),
                        updatedat: new Date(),
                    },
                    columns,
                };
            });

            const newTableRowsAndColumns = [...(previousTableRowsAndColumns ?? []), ...newTempRows];
            ctx.table.getTableRowsAndColumns.setData({ tableid: newRowsData.tableid }, newTableRowsAndColumns);

            return { previousTableRowsAndColumns };
        },
        onError: (error, newRowsData, context) => {
            console.error("Error creating rows:", error);
            if (context?.previousTableRowsAndColumns) {
                ctx.table.getTableRowsAndColumns.setData({ tableid: newRowsData.tableid }, context.previousTableRowsAndColumns);
            }
        },
        onSuccess: () => {
            console.log("Successfully created 1000 rows");
        },
        onSettled: async () => {
            await ctx.table.getTableRowsAndColumns.invalidate();
        },
    });
};