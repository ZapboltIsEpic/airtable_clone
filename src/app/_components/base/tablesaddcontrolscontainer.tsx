'use client';

import Image from "next/image";
import { api } from "~/trpc/react"; 
import TableTab from "./tabletab";
import { Base } from "@prisma/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "@prisma/client";

interface TableData {
    name: string;
    baseid: string;
}

export default function TablesAddControlsContainer({base} : { base : Base}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const queryClient = useQueryClient();

    const [tablesData, setTablesData] = useState<TableData[]>([]);

    const { data: tables, isLoading, error } = api.table.getAllTables.useQuery(
        { baseid: base?.id }, 
        { enabled: !!base?.id }
    );

    useEffect(() => {
        setTablesData(tables ?? []);
    }, [tables]);

    const { mutateAsync: createNewTableApi } = api.table.create.useMutation();

    const { mutate : createTable, } = useMutation({
        mutationFn: async (newTable: { name: string; baseid: string }) => {
            const response = await createNewTableApi(newTable); 
            return response; 
        },
        
        onMutate: async (newTable) => {
            const previousTablesData = [...tablesData];
        
            const newTableData = {
                name: newTable.name,
                baseid: newTable.baseid,
            }
            const newTablesData = [...tablesData, newTableData];
            setTablesData(newTablesData); 

            return { previousTablesData };
        },
        
        onError: (error, newColumn, context) => {
            console.error('Error creating table:', error);
            if (context?.previousTablesData) {
                setTablesData(context.previousTablesData);
            }  
        
            // queryClient.setQueryData('tableData', context.previousTableData);
        },
        
        onSettled: () => {
            // rather than tableData probs have to put back in current format... but that is kinda pain in the ass.
            queryClient.invalidateQueries({ queryKey: ["tablesData"] }); 
        }
    })

    const tableCount = tables?.length ?? 0;
    const newTableName = `Table ${tableCount + 1}`;

    if (searchParams.get('tableid') === null) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("tableid", tables?.[0]?.id ?? "");

        router.replace(`${pathname}?${newParams.toString()}`);
    };

    return (
        <div className="relative hide-print bg-[rgb(207,245,209)]">
            <div className="flex h-8">
                <div className="flex flex-auto relative bg-[#bae6bc] rounded-tr">
                    <div className="absolute all-0 pl-3">
                        <div className="flex flex-auto pt-1 -mt-1 pl-1 -ml-1">
                            <nav className="flex flex-none">   
                                {isLoading ? <p>Loading tables...</p> : tablesData?.length > 0 && tablesData.map((table : Table) => (
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
                                    createTable({
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