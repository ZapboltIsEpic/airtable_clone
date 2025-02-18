import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Key");
}

export const supabase = createClient(supabaseUrl, supabaseKey);