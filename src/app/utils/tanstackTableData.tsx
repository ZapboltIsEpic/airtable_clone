import { api } from "~/trpc/react";

export async function fetchTanstackTableData(tableId: string | null) {
  if (!tableId) return { columns: [], data: [] };

  // Fetch rows for the given table
  const rows = api.row.getAllRowsByTableId.useQuery({ tableid: tableId });
  console.log(rows);

  // Fetch columns for each row
  const columnPromises = rows.map(async (row) => {
    const columns = api.column.getAllColsByRowId.query({ rowid: row.id });
    return { row, columns };
  });

  const rowsWithColumns = await Promise.all(columnPromises);

  // Collect unique field names from all rows
  const uniqueFields = new Set<string>();

  const formattedData = rowsWithColumns.map(({ row, columns }) => {
    const rowData: Record<string, string> = { id: row.id };

    columns.forEach((col) => {
      uniqueFields.add(col.fieldName);
      rowData[col.fieldName] = col.columnContent;
    });

    return rowData;
  });

  // Generate column definitions dynamically
  const dynamicColumns = Array.from(uniqueFields).map((fieldName) => ({
    header: fieldName,
    accessorKey: fieldName,
  }));

  return { columns: dynamicColumns, data: formattedData };
}