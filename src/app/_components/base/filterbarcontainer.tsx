import Image from "next/image"

export default function FilterBarContainer() {

    const filters = [{ id: "1", fieldname: "water", operator: "contains", value: ""}, { id: "2", fieldname: "s", operator: "contains", value: ""}, { id: "3", fieldname: "a", operator: "contains", value: ""}]
    
    return (
        <div className="fixed inset-y-[127px] left-[394px] z-10 max-h-[768px] max-w-[947.031px] bg-white opacity-100 shadow-lg">
            <div className="px-4 pt-3 text-[rgb(97, 102, 112)]">In this view, show records</div>
            <div className="px-4 pt-3 light-scrollbar overflow-auto max-h-[425px]">
                <div className="mb-2">
                    <div className="flex-col relative text-dark w-[calc(390px + 10.5rem)]">
                        {filters.map((filter)  => (
                            <div key={filter.id} className="h-10 w-full">
                                <div className="flex h-full">
                                    <div className="flex items-center px-2 pb-2">
                                        <div className="flex items-center flex-auto px-2 w-full h-full">Where</div>
                                    </div>
                                    <div className="flex-auto flex items-center pr-2 h-[32px]">
                                        <div className="flex items-stretch">
                                            <div className="flex-auto flex items-stretch h-[30px]">
                                                <div className="flex-none flex items-stretch col-12">
                                                    { /* next 2 divs same shit... */}
                                                    <div className="self-stretch flex border-right colors-border-default col-6">
                                                        <div className="flex flex-auto">
                                                            <button className="flex items-center px-2 rounded text-blue-focus pointer link-quiet colors-background-selected-hover w-full pointer">
                                                                <div className="truncate flex-auto text-left">{ filter.fieldname }</div>
                                                                <div className="flex-none flex items-center ml-1">
                                                                    <svg className="w-4 h-4 flex-none ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                                    </svg>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="self-stretch flex border-right colors-border-default col-6">
                                                        <div className="flex flex-auto">
                                                            <button className="flex items-center px-2 rounded text-blue-focus pointer link-quiet colors-background-selected-hover w-full pointer">
                                                                <div className="truncate flex-auto text-left">{ filter.operator }</div>
                                                                <div className="flex-none flex items-center ml-1">
                                                                    <svg className="w-4 h-4 flex-none ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                                    </svg>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-auto self-stretch flex items-stretch overflow-hidden focus-visible-within border-right colors-border-default">
                                                    <span className="relative flex-auto">
                                                        <input placeholder="Enter a value" className="col-12 px-2 py-1 truncate"></input>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-none self-stretch">
                                                <button className="flex-none self-stretch justify-center flex items-center focus-visible colors-background-selected-hover pointer border-right colors-border-default">
                                                    <Image src="/trash-svgrepo-com.svg" alt="." width={16} height={16} />
                                                </button>
                                                <button className="flex-none self-stretch justify-center flex items-center focus-visible colors-background-selected-hover pointer border-right colors-border-default">
                                                    <Image src="/dots-six-vertical-thin-svgrepo-com.svg" alt="." width={16} height={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between px-4 pb-4">
                <div className="flex items-center mr-4">
                    <button
                        tabIndex={0}
                        role="button"
                        aria-label="Add condition"
                        className="flex items-center text-sm text-gray-600 hover:text-black focus-visible:ring-2 focus-visible:ring-blue-500 font-semibold cursor-pointer focus:outline-none mr-2"
                    >
                        <Image className="flex-none mr-1" src="plus-svgrepo-com.svg" alt="+" width={12} height={12} />
                        Add condition
                    </button>
                </div>
                <div className="flex items-center">
                    <button
                        tabIndex={0}
                        role="button"
                        aria-label="Add condition group"
                        className="flex items-center text-sm text-gray-600 hover:text-black focus-visible:ring-2 focus-visible:ring-blue-500 font-semibold cursor-pointer focus:outline-none"
                    >
                        <Image className="flex-none mr-1" src="plus-svgrepo-com.svg" alt="+" width={12} height={12} />
                        Add condition group
                    </button>
                    <span className="ml-1 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500">
                        <Image className="flex-none" src="question-circle-svgrepo-com.svg" alt="?" width={16} height={16} />
                    </span>
                </div>
                <button className="ml-8 cursor-pointer font-semibold text-[13px] text-gray-600 hover:text-black focus-visible:ring-2 focus-visible:ring-blue-500">
                    Copy from another view
                </button>
            </div>
        </div>
    )
}