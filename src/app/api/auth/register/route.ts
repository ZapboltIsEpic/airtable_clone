import { NextResponse } from "next/server";
import { supabase } from "~/app/utils/supabase";

export async function POST(request: Request) {
    try {
        const body = await request.json() as { email: string; password: string };
        const { email, password } = body;
        console.log({email, password});

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            console.error("Database insert error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        console.log("User stored in DB:", data);
    }
    catch (e) {
        console.log({ e });
    }

    return NextResponse.json({ message: "Success"});
}