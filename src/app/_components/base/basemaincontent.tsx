'use client';

import type { Base } from "@prisma/client";
import TableContainer from "./tablecontainer";
import TablesAddControlsContainer from "./tablesaddcontrolscontainer";

export default function BaseMainContent({ base } : { base: Base }) {
    return (
        <div>
            <TablesAddControlsContainer base={base}/>
            <TableContainer />
        </div>
    )
}