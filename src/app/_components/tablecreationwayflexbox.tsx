import Image from "next/image"

interface TableCreationWayFlexBoxProps {
    image: string;
    header: string;
    content: string;
}

export default function TableCreationWayFlexBox({image, header, content}: TableCreationWayFlexBoxProps) {
    return (
        <button className="h-full p-4 rounded-lg bg-white" aria-label="Create a base with AI">
            <div className="flex">
                <Image src= { image } alt="." width={20} height={20}></Image>
                <h2>{ header }</h2>
            </div>
            <p className="text-left">
                { content }
            </p>
        </button>
    )
}