import { api, HydrateClient } from "~/trpc/server";
import { supabase } from "~/app/utils/supabase";
import LoginPage from "./login/page";
import { redirect } from "next/navigation"; // Import redirect

export default async function Home() {
  // Prefetch data if user is authenticated
  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <LoginPage />
    </HydrateClient>
  );
}