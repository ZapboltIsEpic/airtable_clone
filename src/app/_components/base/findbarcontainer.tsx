import Image from "next/image";

interface FindBarProps {
    toggleFindBar: () => void;
}

export default function FindBarContainer({ toggleFindBar } : FindBarProps) {
    return (
        <div className="relative">
            <button className="mr-2 rounded-bottom absolute top-0 right-0 border flex flex-col w-[300px] z-50">
                <div className="flex border-2">
                    <input className="p-2 flex-auto font-medium"></input>
                    <div className="flex items-center pr-2 z-20"></div>
                    <button onClick={toggleFindBar} className="flex flex-none items-center px-2 z-20">
                        <Image src="cross-svgrepo-com.svg" alt="X" width={16} height={16} />
                    </button>
                </div>
                <div className="p-2 text-[11px] z-20 bg-[#f2f2f2]">
                    <span>Use advanced search options in the search extension</span>
                </div>
            </button>
        </div>
    )
}