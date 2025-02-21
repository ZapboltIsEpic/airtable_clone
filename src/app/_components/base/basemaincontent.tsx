'use client';

import TableContainer from "./tablecontainer";
import TablesAddControlsContainer from "./tablesaddcontrolscontainer";

export default function BaseMainContent() {
    return (
        <div>
            <TablesAddControlsContainer />
            <TableContainer />
        </div>
    )
}