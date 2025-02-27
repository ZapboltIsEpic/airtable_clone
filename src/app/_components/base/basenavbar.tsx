'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Base } from '@prisma/client';

export default function BaseNavBar({ base }: { base: Base }) {

    return(
        <div className="baymax hover-container configDialogOpen bg-[rgb(207,245,209)]">
            <div className="flex items-center justify-between px-4 flex-auto h-14 pl-5 pr-5">
                <div className="flex flex-auto relative items-center">
                    <div className="flex items-center min-w-15">
                        <div className="items-center w-10">
                            <Link className="mr2 flex flex-none relative circle focus-visible-current-color border-darken3 w-6 h-6" href="/home">
                                <Image src="/airtable-navbar-icon.PNG" alt="Airtable Navbar Icon" width={24} height={24} />
                            </Link>
                        </div>
                        <div className="flex items-center flex-auto w-32">
                            <button aria-label="Open base settings menu" className="flex items-center flex-auto">
                                <div className="flex place-items-center huge pointer line-height-3 focus-visible-current-color rounded css-w1u7fo lightColoredBase min-w-0 flex-initial">
                                    <div className="truncate font-[675] heading-size-small strongest min-w-0 flex-initial leading-6">
                                        { base.name }
                                    </div>
                                    <svg className="w-4 h-4 flex-none ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                    <nav className="flex items-center justify-center">
                        <ul className="flex items-center justify-center list-none m-4">
                            <li>
                                <button className="mr-2 text-[13px] font-sans h-7 inline-flex justify-center items-center px-3 list-item rounded-full bg-[rgb(175,222,177)] align-middle">
                                    <p className="font-sans leading-4 font-normal">Data</p>
                                </button>
                            </li>
                            <li>
                                <button className="mr-2 text-[13px] font-[apple-system]  h-7 flex-inline justify-items-center place-items-center px-3 list-item rounded-full hover:bg-[rgb(175,222,177)]">
                                    <p className="font-sans leading-4 font-light">Automations</p>
                                </button>
                            </li>
                            <li>
                                <button className="mr-2 text-[13px] h-7 flex-inline justify-items-center place-items-center px-3 list-item rounded-full hover:bg-[rgb(175,222,177)]">
                                    <p className="font-sans leading-4 font-light">Interfaces</p>
                                </button>
                            </li>
                            <div className="border-l border-gray-600 ml-1 h-5 border-opacity-20"></div>
                            <li className="pl-3">
                                <button className="mr-2 text-[13px] font-[apple-system]  h-7 flex-inline justify-items-center place-items-center px-3 list-item rounded-full hover:bg-[rgb(175,222,177)]">
                                    <p className="font-sans leading-4 font-light">Forms</p>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="z-1 flex-none flex flex-row items-center">
                    <div className="flex-none flex items-center">
                        <button aria-label="Base history" className="h-7 px-3 rounded-full hover:bg-[rgb(175,222,177)]">
                            <Image src="/clock-counter-clockwise-thin-svgrepo-com.svg" alt="clock-counter-clockwise-thin" width={16} height={16} />
                        </button>
                        <button aria-label="Help menu" className="font-light mx-2 flex place-items-center justify-items-center h-7 px-3 rounded-full hover:bg-[rgb(175,222,177)]">
                            <Image src="question-circle-svgrepo-com.svg" alt="?" width={16} height={16}/>
                            <div className="text-[13px] font-sans ml-1">Help</div>
                        </button>
                        <button className="flex items-baseline justify-center cursor-pointer px-3 rounded-full bg-[hsl(124.14,16.96%,66.47%)] mx-2 text-[13px] font-sans text-white focus-visible h-8 leading-8">
                            Trial: 7 days left
                        </button>
                        <button className="flex place-items-center px-3 mx-2 rounded-full bg-white h-7">
                            <Image src="users-svgrepo-com.svg" alt="." width={16} height={16}/>
                            <span className="text-[13px] font-sans">Share</span>
                        </button>
                        <button className="my-0 mx-2 flex flex-shrink-0 items-center justify-center rounded-full bg-white h-7 w-7" aria-label="no unseen notifications">
                            <Image src="/bell-svgrepo-com.svg" alt="?" width={16} height={16} />
                        </button>
                        <button className="ml-2 flex items-center justify-center border-white px-3 rounded-full bg-green-300 h-[26px] w-[26px] text-[13px] font-sans">
                            Y
                        </button>

                    </div>
                </div>
                
            </div>
            

        </div>
    )
}