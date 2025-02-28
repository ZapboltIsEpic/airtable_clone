'use client';

import { useEffect, useState } from 'react'
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import BaseNavBar from '../_components/base/basenavbar'
import BaseMainContent from '../_components/base/basemaincontent';
import { api } from '~/trpc/react';

export default function BasePage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('baseid')?.replace(/^"|"$/g, '') ?? "";

    useEffect(() => {
        const storedSession = localStorage.getItem("sb-xasktggrrutkhavrsexk-auth-token");
        if (storedSession) {
            setSession(JSON.parse(storedSession) as Session);
        }
        else {
            redirect("/login");
        }
    }, []);

    interface Session {
        user: {
            id: string;
        };
    }

    const [session, setSession] = useState<Session | null>(null);

    const { data: base, isLoading, error } = api.base.getSpecificBase.useQuery(
        { id: id }, 
        { enabled: !!id} 
    );

    if (isLoading) return <div>Loading...</div>;

    if (error) {
        alert("error occurred when accessing specific base");
    }

    return (
        <div>
            <BaseNavBar base={base[0]}/>
            <BaseMainContent base={base[0]}/>
        </div>
    )
}