// 'use client';

// import { useMemo, useState, useEffect } from 'react';
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import Image from 'next/image';
// import { Column, Row, Table } from '@prisma/client';
// import { useSearchParams } from 'next/navigation';
// import { api } from '~/trpc/react';
// import { useQueries } from '@tanstack/react-query';
// import { fetchTanstackTableData } from "~/app/utils/tanstackTableData";

// export default function TableMainContainer() {
//   const searchParams = useSearchParams();
//   const tableId = searchParams.get("tableid");

//   const [tableData, setTableData] = useState([]);
//   const [columns, setColumns] = useState([]);

//   useEffect(() => {
//     if (!tableId) return;

//     const loadData = async () => {
//       const { columns, data } = await fetchTanstackTableData(tableId);
//       setColumns(columns);
//       setTableData(data);
//     };

//     loadData().catch((error) => {
//       console.error('Failed to load table data:', error);
//     });
//   }, [tableId]);

//   const table = useReactTable({
//     columns,
//     data: tableData,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div className="h-full">
//       <div className="flex h-[calc(100vh-132px)] flex-row">
//         <div className="h-full w-full border border-gray-300">
//           <table className="border-collapse">
//             <thead className="h-8 border">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <th
//                       key={header.id}
//                       className="w-40 border bg-gray-100 px-2 text-left text-sm font-normal"
//                     >
//                       {flexRender(header.column.columnDef.header, header.getContext())}
//                     </th>
//                   ))}
//                   <th className="w-12 bg-gray-100 px-2">
//                     <button>
//                       <Image
//                         src="plus-svgrepo-com.svg"
//                         alt="+"
//                         width={16}
//                         height={16}
//                       />
//                     </button>
//                   </th>
//                 </tr>
//               ))}
//             </thead>
//             <tbody>
//               {table.getRowModel().rows.map((row, rowIdx) => (
//                 <tr key={row.id} className="h-8">
//                   {row.getVisibleCells().map((cell, cellIdx) => (
//                     <td
//                       key={cell.id}
//                       className="border border-gray-300 px-2 py-1 text-xs font-normal"
//                     >
//                       {cellIdx === 0 ? rowIdx + 1 : null}
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

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

  // Query to fetch rows by table ID
  const { data: rows, isLoading: isRowsLoading, error: rowsError } = useQuery({
    queryKey: ["rows", tableId],
    queryFn: () => api.row.getAllRowsByTableId.query({ tableid: tableId }),
    enabled: !!tableId, // Only run if tableId exists
  });

  // Query to fetch columns for each row once rows are loaded
  const { data: columnsData, isLoading: isColumnsLoading, error: columnsError } = useQuery({
    queryKey: ["columns", rows],
    queryFn: async () => {
      if (!rows) return [];
      const columnsPromises = rows.map(async (row) => {
        const columnsResponse = await api.column.getAllColsByRowId.query({ rowid: row.id });
        return { row, columns: columnsResponse };
      });
      const columnsResults = await Promise.all(columnsPromises);
      return columnsResults;
    },
    enabled: !!rows, // Run after rows are fetched
  });

  // Only call this effect when `columnsData` is updated
  useEffect(() => {
    if (columnsData) {
      const uniqueFields = new Set<string>();
      const formattedData = columnsData.map(({ row, columns }) => {
        const rowData: Record<string, string> = { id: row.id };
        columns.forEach((col) => {
          uniqueFields.add(col.fieldName);
          rowData[col.fieldName] = col.columnContent;
        });
        return rowData;
      });

      const dynamicColumns = Array.from(uniqueFields).map((fieldName) => ({
        header: fieldName,
        accessorKey: fieldName,
      }));

      setColumns(dynamicColumns);
      setTableData(formattedData);
    }
  }, [columnsData]);

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isRowsLoading || isColumnsLoading) {
    return <div>Loading...</div>;
  }

  if (rowsError || columnsError) {
    return <div>Error loading data</div>;
  }

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
                    <button>
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