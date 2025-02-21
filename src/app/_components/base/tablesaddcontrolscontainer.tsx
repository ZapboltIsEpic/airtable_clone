'use client';

import Image from "next/image";

export default function TablesAddControlsContainer() {
    return (
        <div className="relative hide-print bg-green-100">
            <div className="flex h-8">
                <div className="flex flex-auto relative bg-green-200">
                    <div className="absolute all-0 pl-3">
                        <div className="flex flex-auto pt-1 -mt-1 pl-1 -ml-1">
                            <button className="flex flex-none">
                                <div className="flex h-8">
                                    <div className="flex relative flex-none">
                                        <div className="rounded-lg flex flex-auto relative">
                                            <div className="h-full flex flex-auto items-center pl-3">
                                                <span>Table 1</span>
                                            </div>
                                            <div className="ml-1 flex items-center">
                                                <Image src="down-chevron-svgrepo-com.svg.svg" alt="^" width={16} height={16}></Image>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <div className="flex">
                                <button aria-label="Search all tables" className="pointer flex flex-none justify-center items-center px-3">
                                    <Image src="down-chevron-svgrepo-com.svg.svg" alt="^" width={16} height={16}></Image>
                                </button>
                            </div>
                            <div className="flex-none flex relative">
                                <button aria-label="Add or import tables" className="pointer flex items-center flex-none rounded-full px-3 h-8">
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