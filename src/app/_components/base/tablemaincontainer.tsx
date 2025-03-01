'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { type CellContext, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Image from "next/image";
import { api } from "~/trpc/react"; 
import FindBarContainer from "./findbarcontainer";

// Helper function to create rows and columns
const createRowsAndColumns = (typedData: RowWithColumns[], rowIds: string[]) => {
  const rows: Record<string, string>[] = [];
  const fieldNamesSet = new Set<string>();

  typedData.forEach((rowWithColumns: RowWithColumns) => {
    const rowData: Record<string, string> = {};
    rowIds.push(rowWithColumns.row.id); // Collect row IDs
    rowWithColumns.columns.forEach((column) => {
      rowData[column.fieldname] = column.columncontent;
      fieldNamesSet.add(column.fieldname); // Collect unique field names
    });
    rows.push(rowData);
  });

  const fieldNames = [...fieldNamesSet]; // Convert Set to array
  return { rows, fieldNames };
};

interface TableMainContainerProps {
  showFindBar: boolean;
  toggleFindBar: () => void;
}

type RowWithColumns = {
  row: {
    id: string;
    tableid: string;
    createdat: Date;
    updatedat: Date;
    numberedid: number;
  };
  columns: {
    id: string;
    rowid: string;
    createdat: Date;
    updatedat: Date;
    fieldname: string;
    columncontent: string;
  }[]
};

interface TableColumn {
  header: string;
  accessorKey: string;
  cell: ({ getValue, row, column }: CellContext<Record<string, string>, string>) => JSX.Element;
}

export default function TableMainContainer({ showFindBar, toggleFindBar } : TableMainContainerProps) {
  const searchParams = useSearchParams();
  const tableId = searchParams.get("tableid");

  const [tableData, setTableData] = useState<Record<string, string>[]>([]);
  const [columns, setColumns] = useState<TableColumn[]>([]);;
  const [rowids, setRowIds] = useState<string[]>([]);
  const [fieldnames, setFieldNames] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // const queryClient = useQueryClient();

  const { data, isLoading, error } = api.table.getTableRowsAndColumns.useQuery(
    { tableid: tableId! }, 
    { enabled: !!tableId } 
  );

  const mutation = api.column.updateColContent.useMutation();

  useEffect(() => {
    if (isLoading || error || !data) return;
    const typedData = data as unknown as RowWithColumns[];

    const rowids_: string[] = [];
    const { rows, fieldNames: fieldNames_ } = createRowsAndColumns(typedData, rowids_);
    
    const tableColumns: TableColumn[] = Array.from(fieldNames_).map((fieldname) => ({
      header: fieldname,
      accessorKey: fieldname,
      cell: ({ getValue, row, column }: CellContext<Record<string, string>, string>) => {
        const initialValue = getValue();
  
        const onBlur = () => {
          if (initialValue !== row.original[column.id]) {
            mutation.mutate({
              rowid: rowids_[row.index] ?? "",
              columncontent: initialValue,
              fieldname: column.id,
            });
          }
          row.original[column.id] = initialValue;
        };

        const isHighlighted =
          searchTerm != "" && 
          initialValue != "" && 
          initialValue.toLowerCase().includes(searchTerm.toLowerCase());

        return (
          <div className={`w-[180px] h-[32px] flex items-center justify-center`}>
            <input
              value={initialValue}
              onChange={(e) => row.original[column.id] = e.target.value}
              onBlur={onBlur}
              className={`w-full h-full outline-none ${isHighlighted ? "bg-[rgb(255,243,211)]" : ""}`}
              data-highlighted={isHighlighted ? "true" : "false"}
            />
          </div>
        );
      },
    }));

    if (JSON.stringify(rows) !== JSON.stringify(tableData)) {
      console.log("rows", rows, " tabledata", tableData);
      setTableData(rows);
    }
    if (JSON.stringify(tableColumns) !== JSON.stringify(columns)) {
      setColumns(tableColumns);
    }
    if (JSON.stringify(rowids_) !== JSON.stringify(rowids)) {
      setRowIds(rowids_);
    }
    if (JSON.stringify(fieldNames_) !== JSON.stringify(fieldnames)) {
      setFieldNames(fieldNames_);
    }
  }, [data, error, isLoading, mutation, searchTerm, fieldnames, tableData, columns, rowids]);

  if (searchTerm) {
    const firstHighlightedElement = document.querySelector('[data-highlighted="true"]');
    if (firstHighlightedElement) {
      firstHighlightedElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  const { mutateAsync: createNewColApi } = api.column.createNewCol.useMutation();
  const { mutateAsync: createNewRowApi } = api.row.createNewRow.useMutation();

  const { mutate : createNewCol, } = useMutation({
    mutationFn: async (newColumn: { rowids: string[]; fieldname: string }) => {
      const response = await createNewColApi(newColumn); 
      return response;
    },
  
    onMutate: async (newColumn) => {
      const previousTableData = [...tableData];
      const newTableData = tableData.map((row) => {
        return {
          ...row,
          [newColumn.fieldname]: "",  
        };
      });

      setTableData(newTableData); 
      return { previousTableData };
    },
  
    onError: (error, context) => {
      console.error('Error creating column:', error);
      if (context) {
        setTableData(context as unknown as Record<string, string>[]);
      }
      // queryClient.setQueryData('tableData', context.previousTableData);
    },
  
    onSettled: () => {
      // rather than tableData probs have to put back in current format... but that is kinda pain in the ass.
      // queryClient.invalidateQueries({ queryKey: ["tableData"] }); 
    }
  })

  const { mutate : createNewRow, } = useMutation({
    mutationFn: async (newRow : { tableid: string; fieldnames: string[] }) => {
      const response = await createNewRowApi(newRow); 
      return response; 
    },
  
    onMutate: async (newRow) => {
      const previousTableData = [...tableData];
      const newRowData = newRow.fieldnames.reduce((acc: Record<string, string>, fieldname) => {
        acc[fieldname] = "";
        return acc;
      }, {});

      const newTableData = [...tableData, newRowData];
      setTableData(newTableData); 
  
      // queryClient.setQueryData('tableData', newTableData); 

      return { previousTableData };
    },
  
    onError: (error, context) => {
      console.error('Error creating row:', error);
      if (context) {
        setTableData(context as unknown as Record<string, string>[]);
      } 
  
      // queryClient.setQueryData('tableData', context.previousTableData);
    },
  
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["tableData"] }); 
    }
  })

  return (
    <div className="h-full w-full">
      <div className="flex h-[calc(100vh-132px)] flex-row">
        <div className="h-full w-full border border-gray-300">
          {showFindBar && <FindBarContainer toggleFindBar={toggleFindBar} setSearchTerm={setSearchTerm}/>}
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
                        tableid: tableId ?? "",
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