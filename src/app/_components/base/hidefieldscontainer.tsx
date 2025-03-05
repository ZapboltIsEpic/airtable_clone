import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image"

export default function HideFieldsContainer({ tableid }: { tableid: string }) {
    const queryClient = useQueryClient();

    const fieldnames = queryClient.getQueryData<string[]>(["fieldNames", tableid]) ?? [];
    const { data: visibleColumns = {} } = useQuery(
        {
            queryKey: ["visibleColumns", tableid],
            queryFn: () => queryClient.getQueryData<Record<string, boolean>>(["visibleColumns", tableid]) ?? {}
        }
    );

    if (!visibleColumns || Object.keys(visibleColumns).length === 0) {
        queryClient.setQueryData(["visibleColumns", tableid],
        fieldnames.reduce((acc, fieldname) => {
            acc[fieldname] = true;
            return acc;
        }, {} as Record<string, boolean>)
        );
    }

    const toggleColumn = async (fieldname: string) => {
        queryClient.setQueryData(["visibleColumns", tableid], {
            ...visibleColumns,
            [fieldname]: !visibleColumns[fieldname]
        });
        await queryClient.invalidateQueries({ queryKey: ["visibleColumns", tableid] });
        console.log("revalidated?")
    };
    
    return (
        <div className="absolute top-[123px] left-[259px] z-50 min-w-[105px]">
            <div className="mt-2 mx-4 flex items-center border-b-2 border-solid">
                <input type="text" placeholder="Find a field" className="flex-auto small px-0 py-2" value="" />
                <button className="font-light mx-2 flex place-items-center justify-items-center h-7 px-3 rounded-full">
                    <Image src="question-circle-svgrepo-com.svg" alt="?" width={16} height={16}/>
                </button>
            </div>
            <div className="overflow-auto px-4 pt-2 pb-2 min-h-[100px] max-h-[calc(-380px + 100vh)]">
                <ul>
                    {fieldnames.map((fieldname : string) => (
                        <div className="mt-2 mb-1 text-[13px]" key={fieldname}>
                            <div className="flex items-center">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns[fieldname] ?? true}
                                        onChange={() => toggleColumn(fieldname)}
                                    />
                                    <span className="truncate">{fieldname}</span>
                                </label>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}