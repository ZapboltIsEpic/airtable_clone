'use client';

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation';
import BaseNavBar from '../_components/base/basenavbar'
import BaseMainContent from '../_components/base/basemaincontent';

export default function BasePage() {
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
            <BaseNavBar />
            <BaseMainContent />
        </div>
    )
}