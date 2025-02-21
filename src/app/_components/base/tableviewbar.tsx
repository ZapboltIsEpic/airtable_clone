'use client';

import Image from "next/image";

export default function TableViewBar() {
    return (
        <div className="flex flex-none">
            <div className="flex-none flex items-center">
                <div className="h-full flex items-center pl-3">
                    <button className="relative rounded-full flex items-center pointer mr-2 h-7">
                        <span className="flex items-center flex-none">
                            <Image src="hamburger-menu-svgrepo-com.svg" alt="." width={16} height={16} />
                        </span>
                        <span className="flex-none strong ml-half">Views</span>
                    </button>
                    <button className="flex items-center pointer px-2 h-7">
                        <div className="flex items-center">
                            <Image src="/tables.PNG" alt="." width={16} height={16} />
                            <h2>Grid view</h2>
                            <div className="flex mx-2">
                                <Image src="/users3-svgrepo-com.svg" alt="." width={16} height={16} />
                            </div>
                            <div>
                                <Image src="down-chevron-svgrepo-com.svg.svg" alt="." width={16} height={16} />
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
                                    <button className="mr-2 focus-visible">
                                        <div className="pointer flex items-center px-2 rounded-full py-1">
                                            <Image src="eye-slash-visibility-visible-hide-hidden-show-watch-svgrepo-com.svg" alt="." width={16} height={16} />
                                            <div className="ml-1">Hide fields</div>
                                        </div>
                                    </button>
                                </div>
                                <button>
                                    <div className="pointer flex items-center px-2 rounded-full py-1">
                                        <Image src="funnel-simple-thin-svgrepo-com.svg" alt="." width={16} height={16} />
                                        <div className="ml-1">Filter</div>
                                    </div>
                                </button>
                            </div>
                            <div className="flex items-center">
                                <div>
                                    <button className="mr-2 focus-visible">
                                        <div className="pointer flex items-center px-2 rounded-full py-1">
                                            <Image src="/group.PNG" alt="." width={16} height={16} />
                                            <div className="ml-1">Group</div>
                                        </div>
                                    </button>
                                </div>
                                <div>
                                    <button className="mr-2 focus-visible">
                                        <div className="pointer flex items-center px-2 rounded-full py-1">
                                            <Image src="arrows-down-up-duotone-svgrepo-com.svg" alt="." width={16} height={16} />
                                            <div className="ml-1">Sort</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <button className="mr-2">
                                <div className="pointer flex items-center rounded px-2 py-1">
                                    <Image src="paint-bucket-thin-svgrepo-com.svg" alt="." width={16} height={16} />
                                    <div className="ml-1">Color</div>
                                </div>
                            </button>
                            <div>
                                <button>
                                    <div className="pointer flex items-center px-2 rounded-full py-1">
                                        <Image src="/row-height-small.PNG" alt="." width={16} height={16} />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <span className="flex items-center">
                            <button className="flex items-center px-1 rounded pointer mr-2">
                                <div className="flex">
                                    <div className="flex items-center p-1">
                                        <Image src="/arrows-square-out.PNG" alt="." width={16} height={16} />
                                    </div>
                                    <div className="py-1 pr-1">Share and sync</div>
                                </div>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <button className="flex flex-none">
                <div className="flex items-center">
                    <Image src="/magnifying-glass-backup-svgrepo-com.svg" alt="." width={16} height={16} />
                </div>
            </button>
        </div>
    )
}