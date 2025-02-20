import { redirect } from "next/navigation";
import Image from "next/image"
import Link from "next/link"

export default function HomeNavBar() {
    const session = localStorage.getItem('sb-xasktggrrutkhavrsexk-auth-token');
    
    // If no session, redirect to the login page
    if (!session) {
        console.log("session", session)
        redirect("/login");
    }

    // session.user.id
    // const { data, error } = await supabase
    //     .from('bases')
    //     .select()

    return (
        <div>
            <header className="flex place-items-center w-full colors-background-default flex-none shadow-elevation-low h-14 z-20">
                <nav className="flex place-items-center w-full pl-4 pr-8">
                    <div className="flex flex-1 place-items-center">
                        <div className="flex flex-auto place-items-center">
                            <button>
                                <Image src="hamburger-menu-svgrepo-com.svg" alt="." width={20} height={20} />
                            </button>
                            <Link className="px-3 flex place-items-center" aria-label="Airtable home" href="/">
                                <Image src="/airtable-home-navbar-icon.PNG" alt="." width={102} height={22.2} />
                            </Link>
                            <div className="flex-auto"></div>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-items-center">
                        <div className="flex place-items-center w-full">
                            <button className="flex place-items-center rounded-full px-4 w-full h-8 border-2 focus-visible">
                                <Image className="flex-none" src="magnifying-glass-backup-svgrepo-com.svg" alt="." width={16} height={16} />
                                <p className="leading-normal text-gray-500 flex-auto text-left ml-2">Search...</p>
                                <p className="leading-normal text-gray-500 ">ctrl K</p>
                            </button>
                        </div>
                    </div>
                    <div className="flex place-items-center flex-1">
                        <div className="flex-auto flex place-items-center">
                            <div className="flex flex-auto place-items-center justify-end">
                                <button className="flex items-center justify-center flex-reverse rounded-full px3 h-7" aria-label="Help menu">
                                    <Image src="/question-circle-svgrepo-com.svg" alt="?" width={16} height={16} />
                                </button>
                                <button className="relative flex items-center justify-center rounded-full h-7 w-7 mx-3 border-2" aria-label="no unseen notification">
                                    <Image src="/bell-svgrepo-com.svg" alt="?" width={16} height={16} />
                                </button>
                            </div>
                            <button onClick={() => redirect("./login")}>
                                <Image src="/user-icon" alt="Y" width={28} height={28} />
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}