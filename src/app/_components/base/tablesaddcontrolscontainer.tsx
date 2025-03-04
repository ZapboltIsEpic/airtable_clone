import Image from "next/image";
import TableTab from "./tabletab";
import type { Table, Base } from "@prisma/client";
import { useCreateTableMutation, useTablesQuery } from "~/app/services/table";

export default function TablesAddControlsContainer({base} : { base : Base}) {
    const { data : tables, isLoading : tablesLoading } = useTablesQuery(base.id);
    const createTable = useCreateTableMutation();
    const tablesData = tables ?? [];
    const tableCount = tablesData.length ?? 0;
    const newTableName = `Table ${tableCount + 1}`;

    return (
        <div className="relative hide-print bg-[rgb(207,245,209)]">
            <div className="flex h-8">
                <div className="flex flex-auto relative bg-[#bae6bc] rounded-tr">
                    <div className="absolute all-0 pl-3">
                        <div className="flex flex-auto pt-1 -mt-1 pl-1 -ml-1">
                            <nav className="flex flex-none">   
                                {tablesLoading ? <p>Loading tables...</p> : tableCount > 0 && tablesData.map((table : Table) => (
                                    <div key={table.id}>
                                        <TableTab key={table.id} table={table} />
                                    </div>
                                ))}
                            </nav>
                            <div className="flex">
                                <button aria-label="Search all tables" className="pointer flex flex-none justify-center items-center px-3">
                                    <svg className="w-4 h-4 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                <div className="flex justify-center items-center">
                                    <div className="border-l border-gray-600 border-opacity-20 h-4"></div>
                                </div>
                            </div>
                            <div className="flex-none flex relative">
                                <button onClick={() => {
                                    createTable.mutate({
                                        name: newTableName,
                                        baseid: base?.id ?? ""
                                    } ,
                                )
                                }} aria-label="Add or import tables" className="pointer flex items-center flex-none rounded-full px-3 h-8">
                                    <Image className="opacity-50 flex-none my-1" src="plus-svgrepo-com.svg" alt="^" width={16} height={16}></Image>
                                    <p className="text-[13px] ml-2 font-normal">Add or import</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-none flex items-center ml-2 rounded-tl bg-[#bae6bc]">
                    <div className="flex h-8">
                        <div className="flex">
                            <button className="flex items-center pointer px-3">
                                <div className="flex items-center text-[13px]">
                                    <div>Extensions</div>
                                </div>
                            </button>
                        </div>
                        <div className="flex">
                            <button className="flex items-center pointer px-3">
                                <div className="pr-1 text-[13px]">Tools</div>
                                <svg className="w-4 h-4 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}