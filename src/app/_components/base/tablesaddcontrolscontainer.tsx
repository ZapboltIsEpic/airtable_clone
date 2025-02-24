'use client';

import Image from "next/image";
import { api } from "~/trpc/react"; 
import TableTab from "./tabletab";
import { Base } from "@prisma/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function TablesAddControlsContainer({base} : { base : Base}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const { data: tables, isLoading, error } = api.table.getAllTables.useQuery(
        { baseid: base?.id as UUID }, 
        { enabled: !!base?.id }
    );

    const { mutate: createTable, error : createTableError } = api.table.create.useMutation({
        onSuccess: () => {
          console.log("Table created successfully");
          alert("Table created successfully");
        },
        onError: (createTableError) => {
          console.error("Error creating Table:", createTableError);
        },
    });

    const tableCount = tables?.length ?? 0;
    const newTableName = `Table ${tableCount + 1}`;

    if (searchParams.get('tableid') === null) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("tableid", tables?.[0]?.id ?? "");

        router.replace(`${pathname}?${newParams.toString()}`);
    };

    return (
        <div className="relative hide-print bg-green-100">
            <div className="flex h-8">
                <div className="flex flex-auto relative bg-green-200">
                    <div className="absolute all-0 pl-3">
                        <div className="flex flex-auto pt-1 -mt-1 pl-1 -ml-1">
                            <nav className="flex flex-none">   
                                {isLoading ? <p>Loading tables...</p> : tables?.length > 0 && tables.map((table) => (
                                    <div key={table.id}>
                                        <TableTab key={table.id} table={table} />
                                    </div>
                                ))}
                            </nav>
                            <div className="flex">
                                <button aria-label="Search all tables" className="pointer flex flex-none justify-center items-center px-3">
                                    <Image src="down-chevron-svgrepo-com.svg.svg" alt="^" width={16} height={16}></Image>
                                </button>
                            </div>
                            <div className="flex-none flex relative">
                                <button onClick={() => {
                                    createTable({
                                        name: newTableName,
                                        baseid: base?.id ?? ""
                                    } ,
                                )
                                }} aria-label="Add or import tables" className="pointer flex items-center flex-none rounded-full px-3 h-8">
                                    <Image src="plus-svgrepo-com.svg" alt="^" width={16} height={16}></Image>
                                    <p>Add or import</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px=1 rounded-big-top-right"></div>
                <div className="flex-none flex items-center ml-2 rounded-big-top-left bg-green-200">
                    <div className="flex h-8">
                        <div className="flex">
                            <button className="flex items-center pointer px-3">
                                <div className="flex items-center">
                                    <div>Extensions</div>
                                </div>
                            </button>
                        </div>
                        <div className="flex">
                            <button className="flex items-center pointer px-3">
                                <div className="pr-1">Tools</div>
                                <Image src="down-chevron-svgrepo-com.svg.svg" alt="^" width={16} height={16}></Image>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}