'use client';

import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
// import CreateBasePopUp from "createbasepopup";
import { api } from "~/trpc/react";
// import { useRouter } from "next/router";
import { Session } from '@prisma/client';

export default function HomeSideBar({ session, isExpanded }: { session: Session; isExpanded: boolean }) {

    const [isHovered, setIsHovered] = useState(false);
    // const router = useRouter()
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const expanded = isHovered || isExpanded;

    const { mutate: createBase, error } = api.base.create.useMutation({
        // instead take him straight to the base
        onSuccess: () => {
          console.log("Base created successfully");
          alert("Base created successfully");
        },
        onError: (error) => {
          console.error("Error creating base:", error);
        },
    });

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {!expanded ? (
                <div className="colors-border-default border-right h-screen
                overflow-visible relative colors-background-default homescreen-nav-wrapper z-10 w-12">
                    <div className="absolute flex flex-col h-full items-center left-0 pt-5 top-0 w-full">
                        <div className="flex mb-5">
                            <Image className="flex-none icon" src="/house-01-svgrepo-com.svg" alt="." width={20} height={20} />
                        </div>
                        <div className="flex mb-5">
                            <Image className="flex-none icon" src="/users3-svgrepo-com.svg" alt="." width={20} height={20} />
                        </div>
                        <div className="css-1ek0t4u mb2-and-quarter">
                        </div>
                        <div className="flex-auto"></div>
                        <div className="css-1ek0t4u css-170a2ks">
                        </div>
                        <div className="flex flex-col items-center">
                            <Image className="flex-none icon" src="/book-open-svgrepo-com.svg" alt="." width={16} height={16} />
                            <Image className="flex-none icon" src="/shopping-bag-svgrepo-com.svg" alt="." width={16} height={16} />
                            <Image className="flex-none icon" src="/globe-svgrepo-com.svg" alt="." width={16} height={16} />
                            <div className="shadow-elevation-low flex rounded-full items-center justify-center">
                                <Image className="flex-none icon" src="/plus-svgrepo-com.svg" alt="." width={16} height={16} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="colors-border-default border-right h-screen
                overflow-visible relative colors-background-default homescreen-nav-wrapper z-10 w-72">
                    <div className="flex-none h-full flex flex-col m-4">
                        <div className="flex-auto flex flex-col">
                            <div className="flex items-center justify-between rounded mb-2">
                                <Link className="w-full text-left px-3 py-2" href="/">
                                    <h4 className="text-lg font-medium">Home</h4>
                                </Link>
                                <button className="flex p-1 m-2 items-center">
                                    <Image src="down-chevron-svgrepo-com.svg.svg" alt=">" width={16} height={16} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between rounded mb-2">
                                <Link className="w-full text-left px-3 py-2" href="/workspaces">
                                    <h4 className="text-lg font-medium">
                                        <div className="flex justify-between items-center">
                                            All workspaces
                                            <button className="flex p-1 items-center -mr-4">
                                                <Image src="plus-svgrepo-com.svg" alt="+" width={16} height={16} />
                                            </button>
                                        </div>
                                    </h4>
                                </Link>
                                <button className="flex p-1 m-2 items-center">
                                    <Image src="down-chevron-svgrepo-com.svg.svg" alt=">" width={16} height={16} />
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="w-full mb-4">

                            </div>
                            <div>
                                <button className="block">
                                    <p className="flex items-center px-2">
                                        <Image src="book-open-svgrepo-com.svg" alt="+" width={16} height={16} />
                                        <span className="ml-1">Template and apps</span>
                                    </p>
                                </button>
                                <button className="block">
                                    <p className="flex items-center px-2">
                                        <Image src="shopping-bag-svgrepo-com.svg" alt="+" width={16} height={16} />
                                        <span className="ml-1">Marketplace</span>
                                    </p>
                                </button>
                                <button className="block">
                                    <p className="flex items-center px-2">
                                        <Image src="upload-simple-thin-svgrepo-com.svg" alt="+" width={16} height={16} />
                                        <span className="ml-1">Import</span>
                                    </p>
                                </button>
                                <button onClick={() => {
                                        createBase({
                                            name: "Untitled Base",
                                            workspace: "Default Workspace",
                                            userId: session?.user?.id ?? "",
                                        });
                                    }} 
                                    className="flex pointer-events-auto items-center justify-center 
                                                        rounded-lg text-white px-3 mt-4 mb-2 w-full bg-blue-600 h-8 text-sm"
                                >
                                    <Image className="invert flex-none noevents mr-2 text-white" src="plus-svgrepo-com.svg" alt="+" width={14} height={14} />
                                    <span className="truncate noevents button-text-label no-user-select">Create</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}