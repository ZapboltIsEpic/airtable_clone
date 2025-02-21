'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BaseNavBar({ base }) {


    return(
        <div className="baymax hover-container configDialogOpen bg-green-100">
            <div className="flex place-items-center justify-between px2 flex-auto top-bar-text-dark h-14 pl-5 pr-5">
                <div className="flex flex-auto relative place-items-center min-w-400">
                    <div className="flex place-items-center min-w-60">
                        <div className="justify-items-center w-10">
                            <Link className="mr2 flex flex-none relative circle focus-visible-current-color border-darken3 w-6 h-6" href="/home">
                                <Image src="/airtable-navbar-icon.PNG" alt="Airtable Navbar Icon" width={24} height={24} />
                            </Link>
                        </div>
                        <button aria-label="Open base settings menu" className="flex place-items-center flex-auto max-w-480">
                            <div className="flex place-items-center huge pointer line-height-3 focus-visible-current-color rounded css-w1u7fo lightColoredBase min-w-0 flex-initial">
                                <div className="truncate font-family-display-updated heading-size-small strongest min-w-0 flex-initial leading-6">
                                    { base.name }
                                </div>
                                <svg className="w-4 h-4 flex-none ml-half" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <nav className="mx2 flex place-items-center">
                        <ul className="flex place-items-center list-none m-4">
                            <li>
                                <Link className="flex-inline justify-items-center place-items-center px-3 list-item rounded-full bg-green-300" href='/'>
                                    <p className="font-family-default text-size-default line-height-4 font-weight-default">Data</p>
                                </Link>
                            </li>
                            <li>
                                <Link className="flex-inline justify-items-center place-items-center px-3 list-item rounded-full bg-green-300" href='/'>
                                    <p className="font-family-default text-size-default line-height-4 font-weight-default">Automations</p>
                                </Link>
                            </li>
                            <li>
                                <Link className="flex-inline justify-items-center place-items-center px-3 list-item rounded-full bg-green-300" href='/'>
                                    <p className="font-family-default text-size-default line-height-4 font-weight-default">Interfaces</p>
                                </Link>
                            </li>
                            <li>
                                <Link className="flex-inline justify-items-center place-items-center px-3 list-item rounded-full bg-green-300" href='/'>
                                    <p className="font-family-default text-size-default line-height-4 font-weight-default">Forms</p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="z1 flex-none flex flex-row place-items-center top-bar-text-dark">
                    <div className="flex-none flex place-items-center">
                        <button aria-label="Base history" className="h-7 px-3 rounded-full bg-green-300">
                            <Image src="/clock-counter-clockwise-thin-svgrepo-com.svg" alt="clock-counter-clockwise-thin" width={16} height={16} />
                        </button>
                        <button aria-label="Help menu" className="flex place-items-center justify-items-center h-7 px-3 rounded-full bg-green-300">
                            <Image src="question-circle-svgrepo-com.svg" alt="?" width={16} height={16}/>
                            <div>Help</div>
                        </button>
                        <button className="px-3 rounded-full bg-gray-400">
                            Trial 14 Days Left
                        </button>
                        <button className="flex place-items-center px-3 rounded-full bg-white">
                            <Image src="users-svgrepo-com.svg" alt="." width={16} height={16}/>
                            <span>Share</span>
                        </button>
                        <button className="px-3 rounded-full bg-white" aria-label="no unseen notifications">
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