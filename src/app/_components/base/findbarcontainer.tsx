import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

interface FindBarProps {
    toggleFindBar: () => void;
}

export default function FindBarContainer({ toggleFindBar }: FindBarProps) {
    const queryClient = useQueryClient();

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        queryClient.setQueryData(["searchTerm"], searchTerm);
        await queryClient.invalidateQueries({ queryKey: ["searchTerm"] })
    };

    return (
        <div className="relative">
            <div className="mr-2 rounded-bottom absolute top-0 right-0 border flex flex-col w-[300px] z-50">
                <div className="flex border-2">
                    <input 
                        defaultValue={queryClient.getQueryData(["searchTerm"])}
                        type="text"
                        className="p-2 flex-auto font-medium text-[13px]"
                        placeholder="Find in view" 
                        onChange={handleSearchChange}
                    />
                    <button onClick={toggleFindBar} className="flex flex-none items-center px-2 z-20">
                        <Image src="cross-svgrepo-com.svg" alt="X" width={16} height={16} />
                    </button>
                </div>
                <div className="p-2 text-[11px] z-20 bg-[#f2f2f2] font-light">
                    <span>Use advanced search options in the search extension</span>
                </div>
            </div>
        </div>
    );
}