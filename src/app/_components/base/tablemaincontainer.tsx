'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Image from "next/image";
import { api } from "~/trpc/react"; 

export default function TableMainContainer() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get("tableid");

  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rowids, setRowIds] = useState([]);

  const { data, isLoading, error } = api.table.getTableRowsAndColumns.useQuery(
    { tableid: tableId}, 
    { enabled: !!tableId } 
  );

  useEffect(() => {
    if (error || !data || data.length === 0) {
      console.error("Error fetching table data:", error);
      setTableData([]);
      setColumns([]);
      setRowIds([]);
      return;
    }

    // Process rows
    const rowids_ = [];
    const rows = data.map((rowWithColumns) => {
      const rowData = {};
      rowids_.push(rowWithColumns.row.id);
      rowWithColumns.columns.forEach((column) => {
        rowData[column.fieldname.toLowerCase()] = column.columncontent;
      });
      return rowData;
    });

    // Extract unique fieldnames for columns
    const fieldNames = new Set();
    data.forEach((rowWithColumns) => {
      rowWithColumns.columns.forEach((col) => {
        fieldNames.add(col.fieldname);
      });
    });

    // Create column definitions
    const tableColumns = Array.from(fieldNames).map((fieldname) => ({
      header: fieldname, // Column header (Note: lowercase 'header' for TanStack v8)
      accessorKey: fieldname.toLowerCase(), // Corresponding key in data rows
    }));

    // Update state
    setTableData(rows);
    setColumns(tableColumns);
    setRowIds(rowids_);
  }, [data, error]);

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  const { mutate: createNewCol, error : createNewColError } = api.column.createNewCol.useMutation({
    onSuccess: () => {
      console.log("Column created successfully");
      alert("Column created successfully");
    },
    onError: (createNewColError) => {
      console.error("Error creating column:", createNewColError);
    },
});

  return (
    <div className="h-full">
      <div className="flex h-[calc(100vh-132px)] flex-row">
        <div className="h-full w-full border border-gray-300">
          <table className="border-collapse">
            <thead className="h-8 border">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="w-40 border bg-gray-100 px-2 text-left text-sm font-normal">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                  <th className="w-12 bg-gray-100 px-2">
                    <button onClick={() => {
                        createNewCol({
                          fieldname: "Untitled",
                          rowids: rowids,
                        });
                    }}>
                      <Image src="plus-svgrepo-com.svg" alt="+" width={16} height={16} />
                    </button>
                  </th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, rowIdx) => (
                <tr key={row.id} className="h-8">
                  {row.getVisibleCells().map((cell, cellIdx) => (
                    <td key={cell.id} className="border border-gray-300 px-2 py-1 text-xs font-normal">
                      {cellIdx === 0 ? rowIdx + 1 : null}
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}