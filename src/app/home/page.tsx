'use client';

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
    const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);

    useEffect(() => {
        // Make sure we're running on the client before accessing localStorage
        if (typeof window !== "undefined") {
            const storedSession = localStorage.getItem("sb-xasktggrrutkhavrsexk-auth-token");
            if (storedSession) {
                setSession(JSON.parse(storedSession) as Session);
            } else {
                redirect("/login");
            }
        }
    }, []); // Empty dependency array means this runs once when the component mounts

    const toggleSideBar = () => {
        setIsSideBarExpanded(!isSideBarExpanded);
    };

    // Make sure session is loaded before rendering the main content
    if (!session) {
        return <div>Loading...</div>; // Optional loading state
    }

    return (
        <div>
            <HomeNavBar toggleSideBar={toggleSideBar}></HomeNavBar>
            <div className="flex flex-auto">
                <HomeSideBar session={session} isExpanded={isSideBarExpanded}></HomeSideBar>
                <HomeMainContent session={session} />
            </div>
        </div>
    );
}