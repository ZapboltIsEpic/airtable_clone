"use client";

import { redirect } from "next/navigation";
import HomeMainContent from "../_components/home/homemaincontent";
import HomeNavBar from "../_components/home/homenavbar";
import HomeSideBar from "../_components/home/homesidebar";
import { useEffect, useState } from "react";

interface Session {
    user: {
        id: string;
    };
}

export default function HomePage() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const storedSession = localStorage.getItem("sb-xasktggrrutkhavrsexk-auth-token");
        if (storedSession) {
            setSession(JSON.parse(storedSession) as Session);
        }
        else {
            redirect("/login");
        }
    }, []); 

    const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);
    const toggleSideBar = () => {
        setIsSideBarExpanded(!isSideBarExpanded);
    };

    return (
        <div>
            <HomeNavBar toggleSideBar={toggleSideBar}></HomeNavBar>
            <div className="flex flex-auto">
                {session && <HomeSideBar session={session} isExpanded={isSideBarExpanded}></HomeSideBar>}
                {session && <HomeMainContent session={session}/>}
            </div>
        </div>
    );
}