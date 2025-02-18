import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import HomePage from "./pages/homepage";
import LoginPage from "./login/page";
import { redirect } from "next/navigation"; // Import redirect

export default async function Home() {
  const session = await auth();

  // If no session, redirect to the login page
  if (!session?.user) {
    redirect("/login");
  }

  // Prefetch data if user is authenticated
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <HomePage />
    </HydrateClient>
  );
}