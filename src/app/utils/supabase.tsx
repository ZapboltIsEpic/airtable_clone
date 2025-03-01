import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/supabase";  // Adjust the path to where your types are located

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Key");
}

const isBrowser = typeof window !== "undefined";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: isBrowser
    ? {
        storage: window.localStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      }
    : undefined,
});