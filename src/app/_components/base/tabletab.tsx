'use client';

import type { Table } from "@prisma/client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function TableTab({ table }: { table: Table }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const newParams = new URLSearchParams(searchParams);
    newParams.set("tableid", table.id);

    const isCurrentTable = () => {
        const tableIdFromQuery = searchParams.get('tableid');
        return tableIdFromQuery === table.id;
    }

    return (
        <div className={isCurrentTable() ? "flex h-8 bg-white rounded-t font-normal" : "flex h-8 rounded-t hover:bg-[#abd4ad] font-light"}>
            <div className="flex relative flex-none">
                <Link className={isCurrentTable() ? "h-full flex flex-auto items-center pl-3 pr-8 text-[13px]" : "h-full flex flex-auto items-center pl-3 pr-3 text-[13px]"} 
                    href={`${pathname}?${newParams.toString()}`}>
                    { table.name }
                </Link>
                <div className="flex justify-center items-center">
                    <div className="border-l border-gray-600 border-opacity-20 h-4"></div>
                </div>
                {isCurrentTable() ? (
                    <div className="flex items-center">
                        <div className="absolute bottom-0 right-2 flex items-center h-8 w-6">
                            <svg className="w-4 h-4 flex-none ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                ) : <div />}
            </div>
        </div>
    )
}