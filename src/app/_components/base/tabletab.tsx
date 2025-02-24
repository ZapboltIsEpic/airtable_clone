'use client';

import { Table } from "@prisma/client";
import Image from "next/image";
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
        <div className={isCurrentTable() ? "flex h-8 bg-white" : "flex h-8"}>
            <div className="flex relative flex-none">
                <div className="rounded-lg flex flex-auto relative">
                    <Link className="h-full flex flex-auto items-center pl-3" href={`${pathname}?${newParams.toString()}`}>
                        { table.name }
                    </Link>
                    <div className="ml-1 flex items-center">
                        <Image src="down-chevron-svgrepo-com.svg.svg" alt="^" width={16} height={16}></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}