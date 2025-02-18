import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { supabase } from "~/app/utils/supabase";

export async function POST(request: Request) {
    try {
        const body = await request.json() as { email: string; password: string };
        const { email, password } = body;
        console.log({email, password});

        // const hashedPassword = await hash(password, 10);
        const { data: dbData, error: dbError } = await supabase
            .from("airtable-clone.users")
            .insert([{ email, password }]);

        if (dbError) {
            console.error("Database insert error:", dbError.message);
            return NextResponse.json({ error: dbError.message }, { status: 500 });
        }

        console.log("User stored in DB:", dbData);
    }
    catch (e) {
        console.log({ e });
    }

    return NextResponse.json({ message: "Success"});
}