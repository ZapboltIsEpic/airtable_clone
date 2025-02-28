'use client';

// import type { Table } from "@prisma/client";
import TableMainContainer from "./tablemaincontainer";
import TableViewBar from "./tableviewbar";
import { useState } from "react";

export default function TableContainer() {
    const [showFindBar, setShowFindBar] = useState(false);

    const toggleFindBar = () => {
        setShowFindBar((prev) => !prev);
    };

    return (
        <div>
            <TableViewBar toggleFindBar={toggleFindBar} />
            <TableMainContainer showFindBar={showFindBar} toggleFindBar={toggleFindBar} />
        </div>
    )
}