import { api } from "~/trpc/react";

export const useCreateColumnMutation = (tableid : string) => {
    const ctx = api.useUtils(); 
    return api.column.createNewCol.useMutation({
        onMutate: async (newColumn: { rowids: string[]; fieldname: string }) => {
            await ctx.table.getTableRowsAndColumns.cancel();

            const previousTableRowsAndColumns = ctx.table.getTableRowsAndColumns.getData({ tableid: tableid });

            const newCol = {
                columncontent: "",
                createdat: new Date().toISOString(),
                fieldname: "New Column",
                id: `col-${Date.now()}`, 
                numberedid: 999, 
                rowid: "", 
                updatedat: new Date().toISOString(),
            };

            const newTableRowsAndColumns = previousTableRowsAndColumns?.map(rowObj => ({
                ...rowObj,
                columns: [...(rowObj.columns ?? []), { ...newCol, rowid: rowObj.row.id, ...newColumn }]
            }));

            ctx.table.getTableRowsAndColumns.setData({ tableid: tableid }, newTableRowsAndColumns);

            return { previousTableRowsAndColumns }
        },
        onError: (error, newTable, context) => {
            console.error("Error creating table:", error);
            if (context?.previousTableRowsAndColumns) {
              ctx.table.getTableRowsAndColumns.setData({ tableid: tableid }, context.previousTableRowsAndColumns);
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

export const useUpdateColumnContent = (tableid: string) => {
    const ctx = api.useUtils(); 
    return api.column.updateColContent.useMutation({
        onMutate: async (updatedColumn: { rowid: string, fieldname: string, columncontent: string, }) => {
            await ctx.table.getTableRowsAndColumns.cancel();

            const previousTableRowsAndColumns = ctx.table.getTableRowsAndColumns.getData({ tableid: tableid });

            if (previousTableRowsAndColumns) {
                const updatedRows = previousTableRowsAndColumns.map(row => ({
                  ...row,
                  columns: row.columns
                    ? row.columns.map(col =>
                        col.rowid === updatedColumn.rowid && col.fieldname === updatedColumn.fieldname
                          ? { ...col, columncontent: updatedColumn.columncontent } 
                          : col
                      )
                    : row.columns,
                }));
              
                ctx.table.getTableRowsAndColumns.setData({ tableid }, updatedRows);
            }

            return { previousTableRowsAndColumns }
        },
        onError: (error, newTable, context) => {
            console.error("Error updating column content:", error);
            if (context?.previousTableRowsAndColumns) {
              ctx.table.getTableRowsAndColumns.setData({ tableid: tableid }, context.previousTableRowsAndColumns);
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