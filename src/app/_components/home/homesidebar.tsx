import Image from "next/image"

export default function HomeSideBar() {
    return (
        <div>
            <div className="colors-border-default border-right h-screen
            overflow-visible relative colors-background-default homescreen-nav-wrapper z-10 w-12">
                <div className="absolute flex flex-col h-full items-center left-0 pt-5 top-0 w-full">
                    <div className="flex mb-5">
                        <Image className="flex-none icon" src="/house-01-svgrepo-com.svg" alt="." width={20} height={20} />
                    </div>
                    <div className="flex mb-5">
                        <Image className="flex-none icon" src="/users3-svgrepo-com.svg" alt="." width={20} height={20} />
                    </div>
                    <div className="css-1ek0t4u mb2-and-quarter">
                    </div>
                    <div className="flex-auto"></div>
                    <div className="css-1ek0t4u css-170a2ks">
                    </div>
                    <div className="flex flex-col items-center">
                        <Image className="flex-none icon" src="/book-open-svgrepo-com.svg" alt="." width={16} height={16} />
                        <Image className="flex-none icon" src="/shopping-bag-svgrepo-com.svg" alt="." width={16} height={16} />
                        <Image className="flex-none icon" src="/globe-svgrepo-com.svg" alt="." width={16} height={16} />
                        <div className="shadow-elevation-low flex rounded-full items-center justify-center">
                            <Image className="flex-none icon" src="/plus-svgrepo-com.svg" alt="." width={16} height={16} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}