import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function OperatorFilterBarContainer({ tableid, filterid } : { tableid : string, filterid: string}) {
    const queryClient = useQueryClient();
    const { data: filters = [] } = useQuery(
        {
            queryKey: ["filters", tableid],
            queryFn: () => queryClient.getQueryData<{ id: string; fieldname: string; operator: string; value: string }[]>(["filters", tableid]) ?? []
        }
    );

    const updateFilterOperator = async (operator: string) => {
        const updatedFilters = filters.map((filter) => 
            filter.id === filterid ? { ...filter, operator } : filter
        );
    
        queryClient.setQueryData(["filters", tableid], updatedFilters);
        await queryClient.invalidateQueries({ queryKey: ["filters", tableid] });
    }

    const operators = ["contains", "does not contain", "is", "is not", "is empty", "is not empty"];

    return (
        <div className="absolute left-50 top-full mt-1 z-[100004] flex flex-col bg-white opacity-100 shadow-lg text-[13px]">
            <input placeholder="Find an operator">
            </input>
            {operators.map((operator) => (
                <button key={operator} onClick={() => updateFilterOperator(operator)}> { operator } </button>
            ))}
        </div>
    )
}