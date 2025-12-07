import { preloadQuery } from "convex/nextjs";
import { connection } from "next/server";
import { UserProfile } from "@/components/user-profile";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";

export default async function Home() {
  await connection();
  const token = await getToken();
  const preloadedUserQuery = await preloadQuery(
    api.auth.getCurrentUser,
    {},
    { token },
  );
  return <UserProfile preloadedUserQuery={preloadedUserQuery} />;
}
