import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function FieldNamesFilterBarContainer({ fieldnames, tableid, filterid } : { fieldnames : string[], tableid : string, filterid: string}) {

    const queryClient = useQueryClient();
    const { data: filters = [] } = useQuery(
        {
            queryKey: ["filters", tableid],
            queryFn: () => queryClient.getQueryData<{ id: string; fieldname: string; operator: string; value: string }[]>(["filters", tableid]) ?? []
        }
    );

    const updateFilterFieldName = async (fieldname: string) => {
        const updatedFilters = filters.map((filter) => 
            filter.id === filterid ? { ...filter, fieldname } : filter
        );
        
        queryClient.setQueryData(["filters", tableid], updatedFilters);
        await queryClient.invalidateQueries({ queryKey: ["filters", tableid]});
    }

    return (
        <div className="absolute left-0 top-full mt-1 z-[100004] flex flex-col bg-white opacity-100 shadow-lg text-[13px]">
            <input placeholder="Find a field">
            </input>
            {fieldnames.map((fieldname) => (
                <button key={fieldname} onClick={() => updateFilterFieldName(fieldname)}> { fieldname } </button>
            ))}
        </div>
    )
}