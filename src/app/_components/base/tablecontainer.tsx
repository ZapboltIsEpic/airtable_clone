'use client';

// import type { Table } from "@prisma/client";
import TableMainContainer from "./tablemaincontainer";
import TableViewBar from "./tableviewbar";
import { useState } from "react";

export default function TableContainer() {
    const [showFindBar, setShowFindBar] = useState(false);
    const [showHideFieldsBar, setHideFieldsBar] = useState(false);

    const toggleFindBar = () => {
        setShowFindBar((prev) => !prev);
    };

    const toggleHideFieldsBar = () => {
        setHideFieldsBar((prev) => !prev);
    };

    return (
        <div>
            <TableViewBar toggleFindBar={toggleFindBar} toggleHideFieldsBar={toggleHideFieldsBar} />
            <TableMainContainer showFindBar={showFindBar} toggleFindBar={toggleFindBar} showHideFieldsBar={showHideFieldsBar} />
        </div>
    )
}