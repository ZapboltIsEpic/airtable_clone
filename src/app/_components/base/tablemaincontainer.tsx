'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Image from "next/image";
import { api } from "~/trpc/react"; 

export default function TableMainContainer() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get("tableid");

  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rowids, setRowIds] = useState([]);
  const [fieldnames, setFieldNames] = useState([]);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = api.table.getTableRowsAndColumns.useQuery(
    { tableid: tableId}, 
    { enabled: !!tableId } 
  );

  console.log(tableData);

  useEffect(() => {
    if (error || !data || data.length === 0) {
      console.error("Error fetching table data:", error);
      setTableData([]);
      setColumns([]);
      setRowIds([]);
      return;
    }

    const rowids_ = [];
    const rows = data.map((rowWithColumns) => {
      const rowData = {};
      rowids_.push(rowWithColumns.row.id);
      rowWithColumns.columns.forEach((column) => {
        rowData[column.fieldname] = column.columncontent;
      });
      return rowData;
    });

    // Extract unique fieldnames for columns
    const fieldNames_ = new Set();
    data.forEach((rowWithColumns) => {
      rowWithColumns.columns.forEach((col) => {
        fieldNames_.add(col.fieldname);
      });
    });
    setFieldNames([...fieldNames_]);

    
    const tableColumns = Array.from(fieldNames_).map((fieldname) => ({
      header: fieldname,
      accessorKey: fieldname,
      cell: ({ getValue, row, column }) => {
        const initialValue = getValue();
        const [value, setValue] = useState(initialValue);

        const onBlur = () => {
          if (value !== initialValue) { 
            mutation.mutate({
              rowid: rowids_[row.index],
              columncontent: value,
              // column.id is fieldname for some reason, dont change
              fieldname: column.id,
            });
          }
          row.original[column.id] = value;

          console.log("row index", row.index);
        };
    
        return (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            className="w-[180px] h-[32px]"
          />
        );
      }
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

  const mutation = api.column.updateColContent.useMutation();

  // optimistic updates...
  // const { mutate : createNewCol, } = useMutation({
  //   mutationFn: async (newColumn) => {
  //     // Call your API or mutation logic
  //     const response = await api.column.createNewCol(newColumn); 
  //     return response; // Ensure this returns the necessary data
  //   },
  
  //   onMutate: async (newColumn) => {
  //     // Step 1: Save previous table data for rollback in case of an error
  //     const previousTableData = [...tableData];
      
  //     // Step 2: Optimistically update the table data to include the new column
  //     const newTableData = tableData.map((row) => {
  //       return {
  //         ...row,
  //         [newColumn.fieldname]: "",  // Add the new column with default value
  //       };
  //     });
  
  //     // Step 3: Immediately update the table UI with the new column (optimistic update)
  //     setTableData(newTableData); 
  
  //     // Optionally update the cache with the new optimistic data if you're using React Query
  //     queryClient.setQueryData('tableData', newTableData); 
  
  //     // Return the context for possible rollback in case of error
  //     return { previousTableData };
  //   },
  
  //   onError: (error, newColumn, context) => {
  //     // Rollback to the previous table data if the mutation failed
  //     console.error('Error creating column:', error);
  //     setTableData(context.previousTableData);  // Rollback to previous data
  
  //     // Optionally, you can reset the cache or handle errors differently
  //     queryClient.setQueryData('tableData', context.previousTableData);
  //   },
  
  //   onSettled: () => {
  //     // Optionally invalidate queries or refetch data after mutation is complete
  //     queryClient.invalidateQueries('tableData');  // Invalidate the cache and refetch data
  //   }
  // })

  // const { mutate: createNewCol, error: createNewColError } = api.column.createNewCol.useMutation({
  //   onMutate: async (newColumn) => {
  //     // Save the previous table data to rollback in case of error
  //     const previousTableData = [...tableData];
  
  //     // Optimistically update the table data to include the new column
  //     const newTableData = tableData.map((row) => {
  //       return {
  //         ...row,
  //         [newColumn.fieldname]: "",  // Add the new column with default value
  //       };
  //     });
  
  //     // Immediately update the table UI with the new column
  //     setTableData(newTableData);
  //     console.log("newtabledata", tableData);
  
  //     // Return the context to revert the optimistic update in case of error
  //     return { previousTableData };
  //   },
  //   onError: (err, newColumn, context) => {
  //     console.error('Error creating column:', err);
  //     // Rollback to the previous table data if the mutation failed
  //     setTableData(context.previousTableData);
  //   },
  //   onSettled: () => {
  //     // Optionally invalidate queries or refetch data if necessary
  //     // queryClient.invalidateQueries({ queryKey: ['columns'] });
  //   },
  // });

  const handleCreateColumn = (newColumn) => {
    createNewCol(newColumn); 
  };

  const { mutate: createNewRow, error : createNewRowError } = api.row.createNewRow.useMutation({
    onSuccess: () => {
      console.log("Row created successfully");
      alert("Row created successfully");
    },
    onError: (createNewRowError) => {
      console.error("Error creating row:", createNewRowError);
    },
  });

  return (
    <div className="h-full w-full">
      <div className="flex h-[calc(100vh-132px)] flex-row">
        <div className="h-full w-full border border-gray-300">
          <table className="table-fixed border-collapse overflow-scroll">
            <thead className="h-8 border">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="w-40 border bg-gray-100 px-2 text-left text-sm font-normal">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                  <th className="w-12 bg-gray-100 px-2 min-w-[48px]">
                    <button onClick={() => {
                        createNewCol({
                          fieldname: "Untitled " + (fieldnames.length+1),
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
                    <td key={cell.id} className="border border-gray-300 text-xs font-normal p-0 w-[180px] h-[32px]">
                      <div className="w-full h-full flex items-center justify-center">
                        {cellIdx === 0 ? rowIdx + 1 : null}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="w-12 px-2">
                <td className="border border-gray-300 text-xs font-normal p-0 w-[180px] h-[32px]">
                  <button onClick={() => {
                      createNewRow({
                        tableid: tableId,
                        fieldnames: fieldnames,
                      });
                  }}>
                    <Image src="plus-svgrepo-com.svg" alt="+" width={16} height={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}