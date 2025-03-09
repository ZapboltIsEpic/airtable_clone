import Image from "next/image";

export default function SortBarContainer() {
    const sorts = [{id: 1, name : "Name", sort: "A -> Z"}, {id: 2, name: "Label", sort: "Z -> A"}];

    return (
        <div className="bg-white opacity-100 shadow-lg absolute top-[123px] left-[616px] z-[10004] w-min min-w-[138px] transform translate-x-0 translate-y-0 text-[13px]">
            <div className="p-3">
                <div className="flex justify-between mx-2 items-center">
                    <div className="flex items-center">
                        <p className="font-family-default text-size-default text-color-quiet line-height-4 font-weight-strong">
                            Sort by
                        </p>
                        <button>
                            <Image src="question-circle-svgrepo-com.svg" alt="?" width={16} height={16} />
                        </button>
                    </div>
                </div>
                <hr className="border-t-0 border-b-0 border-x-0 border border-default mx-2 my-2" />
                <div className="overflow-auto light-scrollbar min-h-[70px] max-h-[calc(-380px+100vh)]">
                    <ul className="pt-2 flex flex-auto flex-col">
                        {sorts.map((sort) => (
                            <div key={sort.id} className="pb-2">
                                <div className="mx-2 relative rounded flex justify-start">
                                    <div className="mr-3 w-[240px]">
                                        <div className="flex flex-auto">
                                            <button className="flex items-center px-1 rounded hover:brightness-90 hover:bg-gray-100 w-full border border-gray-300 cursor-pointer h-7">
                                                <div className="flex-auto truncate text-left"> 
                                                    { sort.name }
                                                </div>
                                                <div className="flex-none flex items-center ml-1">
                                                    <svg className="w-4 h-4 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mr-3 flex w-[120px] h-[28px]">
                                        <div className="flex flex-auto items-center">
                                            <button className="flex flex-auto truncate left-align pointer focus-container pointer">
                                                <div className="flex flex-auto items-center px-1 rounded cursor-pointer hover:bg-gray-100 border border-gray-300">
                                                    <div className="flex-auto truncate">
                                                        <span> { sort.sort }</span>
                                                    </div>
                                                    <svg
                                                        className="w-4 h-4 flex-none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <button className="flex pointer link-unquiet-focusable text-blue-focus items-center quieter justify-center colors-background-selected-hover rounded w-7">
                                        <Image src="cross-svgrepo-com.svg" alt="X" width={16} height={16} />
                                    </button>
                                    <button className="dragHandle link-unquiet quieter flex items-center justify-center">
                                        <Image src="/dots-six-vertical-thin-svgrepo-com.svg" alt="." width={16} height={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                    <div className="flex flex-auto">
                        <button className="flex items-center font-semibold cursor-pointer h-8">
                            <div className="truncate flex-auto text-right">
                                <div className="flex items-center ml-1">
                                    <Image src="plus-svgrepo-com.svg" alt="+" width={16} height={16} />
                                    <p className="font-sans text-sm text-gray-700 leading-4 font-normal">
                                        Add another sort
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="justify-between flex colors-background-subtler items-center px-1 min-h-[44px]">
                <button className="flex link-quiet items-center pointer p-2">
                    <div>Automatically sort records</div>
                </button>
            </div> 
        </div>
    )
}