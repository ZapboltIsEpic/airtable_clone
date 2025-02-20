"use client";

import { redirect } from "next/navigation";
import HomeMainContent from "../_components/home/homemaincontent";
import HomeNavBar from "../_components/home/homenavbar";
import HomeSideBar from "../_components/home/homesidebar";
import { useEffect, useState } from "react";

export default function HomePage() {
    interface Session {
        user: {
            id: string;
        };
    }

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

    return (
        <div>
            <HomeNavBar></HomeNavBar>
            <div className="flex flex-auto">
                <HomeSideBar></HomeSideBar>
                <HomeMainContent session={session}/>
            </div>
        </div>
    );
}