'use client';

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import Image from "next/image"
import TableCreationWayFlexBox from "../tablecreationwayflexbox"
import BaseListItem from "./baselistitem";
import { Session } from "@supabase/supabase-js"

export default function HomeMainContent({ session }: { session: Session }) {
    const { data: bases, isLoading, error } = api.base.get.useQuery(
        { userId: session?.user?.id ?? "" }, 
        { enabled: !!session?.user?.id } 
    );
    console.log(bases);


    return (
        <div className="bg-gray-100 overflow-auto w-full flex flex-col">
            <div className="pt-8 px-12 flex-auto">
                <div className="flex flex-col h-full">
                    <h1 className="font-black pb-6 text-left text-xl">Home</h1>
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <div className="flex gap-4 mt-1 grid grid-cols-4">
                                <div>
                                    <TableCreationWayFlexBox
                                        image="/aifeature.PNG"
                                        header="Start with AI"
                                        content="Turn your process into an app with data and interfaces using AI"
                                    />
                                </div>
                                <div>
                                    <TableCreationWayFlexBox
                                        image="/grid.PNG"
                                        header="Start with templates"
                                        content="Select a template to get started and customize as you go."
                                    />
                                </div>
                                <div>
                                    <TableCreationWayFlexBox
                                        image="/uparrow.PNG"
                                        header="Quickly upload"
                                        content="Easily migrate your exisiting projects in just a few minutes."
                                    />
                                </div>
                                <div>
                                    <TableCreationWayFlexBox
                                        image="/tables.PNG"
                                        header="Start from scratch"
                                        content="Create a new blank base from custom tables, fields and views."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex-shrink-0 pb-2.5 -mb-2.5 z-10">
                            <div className="flex items-center relative pb-6 justify-between">
                                <div className="flex items-center mr-2">
                                    <div className="mr-3">
                                        <div className="flex items-center">
                                            <button className="flex items-center">
                                                <div className="mr-1">
                                                    <p>Opened by you</p>
                                                </div>
                                                <Image src="down-chevron-svgrepo-com.svg.svg" alt="^" width={16} height={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button className="flex items-center">
                                            <div className="mr-1">
                                                <p>Show all types</p>
                                            </div>
                                            <Image src="down-chevron-svgrepo-com.svg.svg" alt="^" width={16} height={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex items-center">
                                        <button aria-label="View items in a list">
                                            <Image src="hamburger-menu-svgrepo-com.svg" alt="." width={20} height={20} />
                                        </button>
                                    </div>
                                    <div className="flex items-center">
                                        <button aria-label="View items in a grid">
                                            <Image src="/grid.PNG" alt="." width={20} height={20} />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex-auto overflow-auto px-1">
                            <div className="flex flex-col justify-center mb-4 w-full">
                                <div className="text-left">
                                    <p>Name</p>
                                </div>
                            </div>
                            <div className="flex flex-col w-full items-start mb-6">
                                <h4>Today</h4>
                                <div className="flex flex-col gap-2 items-center w-full">
                                    { isLoading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p>Error getting bases</p>
                                    ) : (
                                        <>
                                            {bases && bases.length > 0 ? (
                                                bases.map((base) => (
                                                    <div key={base.id} className="w-full">
                                                        <BaseListItem key={base.id} base={base} />
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No bases available</p>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}