'use client';

import Image from "next/image";

export default function TableViewBar() {
    return (
        <div className="flex flex-none h-11 z-10">
            <div className="flex-none flex items-center">
                <div className="h-full flex items-center pl-3">
                    <button className="relative flex items-center pointer mr-2 h-7 px-3 hover:bg-[rgb(242,242,242)]">
                        <span className="flex items-center flex-none">
                            <Image src="hamburger-menu-svgrepo-com.svg" alt="." width={16} height={16} />
                        </span>
                        <span className="flex-none strong ml-1 text-[13px]">Views</span>
                    </button>
                    <div className="flex justify-center items-center ml-1 mr-3">
                        <div className="border-l border-gray-600 border-opacity-20 h-4"></div>
                    </div>
                    <button className="flex items-center pointer px-2 h-7 hover:bg-[rgb(242,242,242)]">
                        <div className="flex items-center">
                            <Image src="/tables.PNG" alt="." width={16} height={16} />
                            <h2 className="text-[13px]">Grid view</h2>
                            <div className="flex mx-2">
                                <Image src="/users3-svgrepo-com.svg" alt="." width={16} height={16} />
                            </div>
                            <div>
                                <svg className="w-4 h-4 flex-none ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <div className="flex-auto flex items-center">
                <div className="flex flex-auto items-center h-full overflow-hidden">
                    <div className="flex items-center px-2">
                        <div className="flex items-center">
                            <div className="flex flex-row mr-2">
                                <div>
                                    <button className="mr-2 focus-visible hover:bg-[rgb(242,242,242)]">
                                        <div className="pointer flex items-center px-2 rounded-full py-1">
                                            <Image src="eye-slash-visibility-visible-hide-hidden-show-watch-svgrepo-com.svg" alt="." width={16} height={16} />
                                            <div className="ml-1 text-[13px]">Hide fields</div>
                                        </div>
                                    </button>
                                </div>
                                <button className="hover:bg-[rgb(242,242,242)]">
                                    <div className="pointer flex items-center px-2 rounded-full py-1">
                                        <Image src="funnel-simple-thin-svgrepo-com.svg" alt="." width={16} height={16} />
                                        <div className="ml-1 text-[13px]">Filter</div>
                                    </div>
                                </button>
                            </div>
                            <div className="flex items-center">
                                <div>
                                    <button className="mr-2 focus-visible hover:bg-[rgb(242,242,242)]">
                                        <div className="pointer flex items-center px-2 rounded-full py-1">
                                            <Image src="/group.PNG" alt="." width={16} height={16} />
                                            <div className="ml-1 text-[13px]">Group</div>
                                        </div>
                                    </button>
                                </div>
                                <div>
                                    <button className="mr-2 focus-visible hover:bg-[rgb(242,242,242)]">
                                        <div className="pointer flex items-center px-2 rounded-full py-1">
                                            <Image src="arrows-down-up-duotone-svgrepo-com.svg" alt="." width={16} height={16} />
                                            <div className="ml-1 text-[13px]">Sort</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <button className="mr-2 hover:bg-[rgb(242,242,242)]">
                                <div className="pointer flex items-center rounded px-2 py-1">
                                    <Image src="paint-bucket-thin-svgrepo-com.svg" alt="." width={16} height={16} />
                                    <div className="ml-1 text-[13px]">Color</div>
                                </div>
                            </button>
                            <div>
                                <button className="hover:bg-[rgb(242,242,242)]">
                                    <div className="pointer flex items-center px-2 rounded-full py-1">
                                        <Image src="/row-height-small.PNG" alt="." width={16} height={16} />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <span className="flex items-center">
                            <button className="flex items-center px-1 rounded pointer mr-2 hover:bg-[rgb(242,242,242)]">
                                <div className="flex">
                                    <div className="flex items-center p-1">
                                        <Image src="/arrows-square-out.PNG" alt="." width={16} height={16} />
                                    </div>
                                    <div className="text-[13px] py-1 pr-1">Share and sync</div>
                                </div>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <button className="flex flex-none w-8">
                <div className="flex items-center">
                    <Image src="/magnifying-glass-backup-svgrepo-com.svg" alt="." width={16} height={16} />
                </div>
            </button>
        </div>
    )
}