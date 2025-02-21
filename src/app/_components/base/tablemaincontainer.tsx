'use client';

import { useState } from 'react';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import Image from 'next/image';

  type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
  }
  
  const defaultData: Person[] = [
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      firstName: 'joe',
      lastName: 'dirte',
      age: 45,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
  ]

  const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('firstName', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.lastName, {
    id: 'lastName',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: info => info.column.id,
  }),
]

export default function TableMainContainer() {
    const [data, setData] = useState(() => [...defaultData])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="h-full">
            <div className="flex h-[calc(100vh-132px)] flex-row">
                <div className="h-full w-full border border-gray-300">
                <table className="border-collapse">
                    <thead className="h-8 border">
                    <tr>
                        {table.getFlatHeaders().map((header, index) => (
                        <th
                            key={header.id}
                            className="w-40 border bg-gray-100 px-2 text-left text-sm font-normal"
                        >
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                            )}
                        </th>
                        ))}
                        <th className="w-12 bg-gray-100 px-2">
                        <button>
                            <Image src="plus-svgrepo-com.svg" alt="+" width={16} height={16} />
                        </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row, rowIdx) => (
                        <tr key={row.id} className="h-8">
                        {row.getVisibleCells().map((cell, cellIdx) => (
                            <td
                            key={cell.id}
                            className="border border-gray-300 px-2 py-1 text-xs font-normal"
                            >
                            {cellIdx === 0 ? rowIdx + 1 : null}
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                            )}
                            </td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}