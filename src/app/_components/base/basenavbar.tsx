'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Base } from '@prisma/client';

export default function BaseNavBar({ base }: { base: Base }) {


    return(
        <div className="baymax hover-container configDialogOpen bg-green-100">
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
                                    <div className="truncate font-bold heading-size-small strongest min-w-0 flex-initial leading-6">
                                        { base.name }
                                    </div>
                                    <svg className="w-4 h-4 flex-none ml-half" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                    <nav className="flex items-center justify-center">
                        <ul className="flex items-center justify-center list-none m-4">
                            <li>
                                <button className="text-sm h-7 flex justify-center items-center px-3 list-item rounded-full bg-green-300 align-middle" href="/">
                                    <p className="pt-0.5 flex font-normal">Data</p>
                                </button>
                            </li>
                            <li>
                                <button className="text-sm h-7 flex-inline justify-items-center place-items-center px-3 list-item rounded-full hover:bg-green-300" href='/'>
                                    <p className="pt-1 flex font-normal">Automations</p>
                                </button>
                            </li>
                            <li>
                                <button className="text-sm h-7 flex-inline justify-items-center place-items-center px-3 list-item rounded-full hover:bg-green-300" href='/'>
                                    <p className="pt-1 flex font-normal">Interfaces</p>
                                </button>
                            </li>
                            <li>
                                <button className="text-sm h-7 flex-inline justify-items-center place-items-center px-3 list-item rounded-full hover:bg-green-300" href='/'>
                                    <p className="pt-1 flex font-normal">Forms</p>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="z1 flex-none flex flex-row place-items-center top-bar-text-dark">
                    <div className="flex-none flex place-items-center">
                        <button aria-label="Base history" className="h-7 px-3 rounded-full hover:bg-green-300">
                            <Image src="/clock-counter-clockwise-thin-svgrepo-com.svg" alt="clock-counter-clockwise-thin" width={16} height={16} />
                        </button>
                        <button aria-label="Help menu" className="mx-2 flex place-items-center justify-items-center h-7 px-3 rounded-full hover:bg-green-300">
                            <Image src="question-circle-svgrepo-com.svg" alt="?" width={16} height={16}/>
                            <div className="text-sm">Help</div>
                        </button>
                        <button className="px-3 rounded-full bg-gray-400 mx-2 text-sm text-white">
                            Trial 14 Days Left
                        </button>
                        <button className="flex place-items-center px-3 mx-2 rounded-full bg-white">
                            <Image src="users-svgrepo-com.svg" alt="." width={16} height={16}/>
                            <span className="text-sm">Share</span>
                        </button>
                        <button className="px-3 rounded-full bg-white mx-2" aria-label="no unseen notifications">
                            <Image src="bell-svgrepo-com.svg" alt="." width={16} height={16}/>
                        </button>
                        <button className="px-3 rounded-full bg-green-300">
                            Y
                        </button>

                    </div>
                </div>
                
            </div>
            

        </div>
    )
}