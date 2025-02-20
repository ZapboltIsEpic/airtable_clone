import Image from "next/image";

export default function BaseListItem({ base }: { base: Base }) {
    return (
        <div className="flex items-center w-full">
            <div className="relative pointer rounded-lg w-full colors-background-selected-hover">
                <div className="p-2 grid grid-cols-2 gap-x-6">
                    <div className="flex flex-auto items-center">
                        <div className="flex justify-center items-center flex-none relative text-white rounded-md bg-yellow-600 w-6 h-6">
                            <span className="text-xs">{ base.name.substring(0,2) }</span> 
                        </div>
                        <div className="flex items-center h-full truncate px-6">
                            <a className="flex-auto text-left flex items-center" href="/base">
                                {/* HREF SHOULD LINK TO SPECIFIC BASE */}
                                <h3 className="text-sm font-bold"> { base.name }</h3>
                            </a>
                        </div>
                    </div>
                    <div className="opacity-75 grid grid-cols-3 text-left items-center w-full gap-x-6">
                        <div className="truncate">Base</div>
                        <div className="truncate">
                            <span>{ base.workspace }</span>
                        </div>
                        <div className="flex-none place-items-end">
                            <button className="flex items-center justify-center p-2" aria-label="More actions">
                                <Image src="/overflow-menu-horizontal-svgrepo-com.svg" alt="..." width={16} height={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}