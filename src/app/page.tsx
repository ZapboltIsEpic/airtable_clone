import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import MainPage from "./pages/mainpage";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();
  const user = null;


  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  

  return (
    <HydrateClient>
      <MainPage></MainPage>
    </HydrateClient>
  );
}
