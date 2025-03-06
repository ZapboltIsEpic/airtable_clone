import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import FieldNamesFilterBarContainer from "./filterbar/fieldnamesfilterbarcontainer";
import { useState } from "react";

export default function FilterBarContainer({ tableid }: { tableid: string }) {
    const queryClient = useQueryClient();
    const fieldnames = queryClient.getQueryData<string[]>(["fieldNames", tableid]) ?? [];
    const [showFieldNamesFilterBarContainer, setShowFieldNamesFilterBarContainer] = useState<string | null>(null);

    const toggleShowFieldNamesFilterBarContainer = (id : string) => {
        if (showFieldNamesFilterBarContainer === id) {
            setShowFieldNamesFilterBarContainer(null);
        }
        else {
            setShowFieldNamesFilterBarContainer(id);
        }
    }

    const operators = ["contains", "does not contain", "is", "is not", "is empty", "is not empty"];

    const { data: filters = [] } = useQuery(
        {
            queryKey: ["filters", tableid],
            queryFn: () => queryClient.getQueryData<{ id: string; fieldname: string; operator: string; value: string }[]>(["filters", tableid]) ?? []
        }
    );

    console.log(filters);

    const addFilter = async () => {
        queryClient.setQueryData(["filters", tableid], [
            ...filters,
            { id: filters.length, fieldname: "Name", operator: "contains", value: "" }
        ]);
        await queryClient.invalidateQueries({ queryKey: ["filters", tableid] });
        console.log("revalidated?")
    }

    return (
        <div className="fixed inset-y-[127px] left-[394px] z-10 max-h-[768px] max-w-[947.031px] bg-white opacity-100 shadow-lg text-[13px]">
            <div className="px-4 pt-3 text-gray-600">In this view, show records</div>
            <div className="px-4 pt-3 overflow-auto max-h-[425px]">
                <div className="mb-2">
                    <div className="flex flex-col relative text-dark w-[calc(390px+10.5rem)]">
                        {filters.map((filter) => (
                            <div key={filter.id} className="h-10 w-full">
                                <div className="flex h-full">
                                    <div className="flex items-center px-2 pb-2">
                                        <div className="flex items-center flex-auto px-2 w-full h-full">Where</div>
                                    </div>
                                    <div className="flex-auto flex items-center pr-2 h-[32px]">
                                        <div className="flex items-stretch">
                                            <div className="flex-auto flex items-stretch h-[30px]">
                                                <div className="flex-none flex items-stretch w-1/2 border-r border-gray-300">
                                                    <div className="flex flex-auto">
                                                        <button 
                                                            className="flex items-center px-2 rounded text-blue-600 hover:bg-gray-100 w-full"
                                                            onClick={() => toggleShowFieldNamesFilterBarContainer(filter.id)}
                                                        >
                                                            <div className="truncate flex-auto text-left">{filter.fieldname}</div>
                                                            <div className="flex-none flex items-center ml-1">
                                                                <svg className="w-4 h-4 flex-none ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                                </svg>
                                                            </div>
                                                        </button>
                                                        {showFieldNamesFilterBarContainer === filter.id && (
                                                            <FieldNamesFilterBarContainer fieldnames={fieldnames} />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex-none flex items-stretch w-1/2 border-r border-gray-300">
                                                    <div className="flex flex-auto">
                                                        <button className="flex items-center px-2 rounded text-blue-600 hover:bg-gray-100 w-full">
                                                            <div className="truncate flex-auto text-left">{filter.operator}</div>
                                                            <div className="flex-none flex items-center ml-1">
                                                                <svg className="w-4 h-4 flex-none ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                                </svg>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-auto flex items-stretch overflow-hidden focus-within:border-r border-gray-300">
                                                <span className="relative flex-auto">
                                                    <input placeholder="Enter a value" className="w-full px-2 py-1 truncate border-none focus:outline-none" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-none items-stretch">
                                            <button className="flex-none flex justify-center items-center hover:bg-gray-100 border-r border-gray-300">
                                                <Image src="/trash-svgrepo-com.svg" alt="." width={16} height={16} />
                                            </button>
                                            <button className="flex-none flex justify-center items-center hover:bg-gray-100 border-r border-gray-300">
                                                <Image src="/dots-six-vertical-thin-svgrepo-com.svg" alt="." width={16} height={16} />
                                            </button>
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
                        className="flex items-center text-sm text-gray-600 hover:text-black focus:ring-2 focus:ring-blue-500 font-semibold cursor-pointer focus:outline-none mr-2"
                        onClick={(addFilter)}
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
                        className="flex items-center text-sm text-gray-600 hover:text-black focus:ring-2 focus:ring-blue-500 font-semibold cursor-pointer focus:outline-none"
                    >
                        <Image className="flex-none mr-1" src="plus-svgrepo-com.svg" alt="+" width={12} height={12} />
                        Add condition group
                    </button>
                    <span className="ml-1 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer focus:ring-2 focus:ring-blue-500">
                        <Image className="flex-none" src="question-circle-svgrepo-com.svg" alt="?" width={16} height={16} />
                    </span>
                </div>
                <button className="ml-8 cursor-pointer font-semibold text-sm text-gray-600 hover:text-black focus:ring-2 focus:ring-blue-500">
                    Copy from another view
                </button>
            </div>
        </div>
    );
}