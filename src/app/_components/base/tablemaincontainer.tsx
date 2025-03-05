import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type CellContext, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import Image from "next/image";
import FindBarContainer from "./findbarcontainer";
import { useTableGetAllRowsAndColumnsQuery } from "~/app/services/table";
import { useCreateColumnMutation, useUpdateColumnContent } from "~/app/services/column";
import { useCreateRowMutation } from "~/app/services/row";
import { useMemo } from "react";
import HideFieldsContainer from "./hidefieldscontainer";

const createRowsAndColumns = (typedData: RowWithColumns[], rowIds: string[]) => {
  const rows: Record<string, string>[] = [];
  const fieldNamesSet = new Set<string>();

  typedData?.forEach((rowWithColumns: RowWithColumns) => {
    const rowData: Record<string, string> = {};
    rowIds.push(rowWithColumns.row.id);
    rowWithColumns.columns.forEach((column) => {
      rowData[column.fieldname] = column.columncontent;
      fieldNamesSet.add(column.fieldname); 
    });
    rows.push(rowData);
  });

  const fieldNames = [...fieldNamesSet]; 
  return { rows, fieldNames };
};

interface TableMainContainerProps {
  showFindBar: boolean;
  toggleFindBar: () => void;
  showHideFieldsBar: boolean;
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

// interface TableColumn {
//   header: string;
//   accessorKey: string;
//   cell: ({ getValue, row, column }: CellContext<Record<string, string>, string>) => JSX.Element;
// }

export default function TableMainContainer({ showFindBar, toggleFindBar, showHideFieldsBar } : TableMainContainerProps) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const tableId = searchParams.get("tableid");
  const { data : tableRowsAndColumns, isLoading : tableRowsAndColumnsLoading } = useTableGetAllRowsAndColumnsQuery(tableId ?? "");
  const typedData = tableRowsAndColumns as unknown as RowWithColumns[];
  const rowids: string[] = [];
  const { rows, fieldNames: fieldnames } = createRowsAndColumns(typedData, rowids);
  const mutation = useUpdateColumnContent(tableId ?? "");
  const { data: visibleColumns = {} } = useQuery(
    {
        queryKey: ["visibleColumns", tableId],
        queryFn: () => queryClient.getQueryData<Record<string, boolean>>(["visibleColumns", tableId]) ?? {}
    }
);
  const filteredFieldNames = fieldnames.filter((fieldname) => visibleColumns[fieldname] ?? true);

  console.log("hi i rerendered fucker");

  const tableColumns = filteredFieldNames.map((fieldname) => ({
    header: fieldname,
    accessorKey: fieldname,
    cell: ({ getValue, row, column }: CellContext<Record<string, string>, string>) => {
      const searchTerm = queryClient.getQueryData(["searchTerm"]) ?? "";
      const initialValue = getValue();
  
      const onBlur = (value: string) => {
        if (value !== initialValue) {
          mutation.mutate({
            rowid: rowids[row.index] ?? "",
            columncontent: value,
            fieldname: column.id,
          });
        }
      };
  
      const isHighlighted =
        searchTerm !== "" &&
        initialValue !== "" &&
        typeof initialValue === 'string' && typeof searchTerm === 'string' && initialValue.toLowerCase().includes(searchTerm.toLowerCase());
  
      return (
        <input
          id={`editable-cell-${row.index}-${column.id}`}
          name={`editable-cell-${row.index}-${column.id}`}
          value={initialValue}
          onChange={(e) => onBlur(e.target.value)}
          onBlur={(e) => onBlur(e.target.value)}
          className={`w-full h-full outline-none ${
            isHighlighted ? "bg-[rgb(255,243,211)]" : ""
          }`}
        />
      );
    },
  }));


  if (queryClient.getQueryData(["searchTerm"])) {
    const firstHighlightedElement = document.querySelector('[data-highlighted="true"]');
    if (firstHighlightedElement) {
      firstHighlightedElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }


  const createNewCol = useCreateColumnMutation(tableId ?? "");
  const createNewRow = useCreateRowMutation();

  const table = useReactTable({
    columns : tableColumns,
    data: rows,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true, 
  });

  const rowModel = useMemo(() => {
    return !tableRowsAndColumnsLoading && tableRowsAndColumns
      ? table.getRowModel()
      : { rows: [] }; 
  }, [tableRowsAndColumnsLoading, tableRowsAndColumns, table]);

  queryClient.setQueryData(["fieldNames", tableId], fieldnames);

  return (
    <div className="h-full w-full">
      <div className="flex h-[calc(100vh-132px)] flex-row">
        <div className="h-full w-full border border-gray-300">
          {showHideFieldsBar && <HideFieldsContainer tableid={tableId ?? ""} />}
          {showFindBar && <FindBarContainer toggleFindBar={toggleFindBar} />}
          {tableRowsAndColumnsLoading ? <p>Loading table info...</p> :
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
                          createNewCol.mutate({
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
                {rowModel.rows.map((row, rowIdx) => (
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
                        createNewRow.mutate({
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
          }
        </div>
      </div>
    </div>
  );
}