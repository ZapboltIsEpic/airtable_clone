import { HydrateClient } from "~/trpc/server";
import LoginPage from "./login/page";

export default async function Home() {
  return (
    <HydrateClient>
      <LoginPage />
    </HydrateClient>
  );
}