"use client";

import { redirect } from "next/navigation";
import HomeMainContent from "../_components/home/homemaincontent";
import HomeNavBar from "../_components/home/homenavbar";
import HomeSideBar from "../_components/home/homesidebar";

export default function HomePage() {
    const session = localStorage.getItem('sb-xasktggrrutkhavrsexk-auth-token');
    
    // If no session, redirect to the login page
    if (!session) {
        console.log("session", session)
        redirect("/login");
    }

    return (
        <div>
            <HomeNavBar></HomeNavBar>
            <div className="flex flex-auto">
                <HomeSideBar></HomeSideBar>
                <HomeMainContent></HomeMainContent>
            </div>
        </div>
    );
}