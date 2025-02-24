'use client';

import { Table } from "@prisma/client";
import TableMainContainer from "./tablemaincontainer";
import TableViewBar from "./tableviewbar";

export default function TableContainer() {
    return (
        <div>
            <TableViewBar/>
            <TableMainContainer/>
        </div>
    )
}