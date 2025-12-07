"use client";
import { type Preloaded, useConvexAuth, usePreloadedQuery } from "convex/react";
import { useEffect, useState } from "react";
import { UserProfile as UserProfileComponent } from "@/components/server/user-profile";
import type { api } from "@/convex/_generated/api";

export const UserProfile = ({
  preloadedUserQuery,
}: {
  preloadedUserQuery: Preloaded<typeof api.auth.getCurrentUser>;
}) => {
  const { isLoading } = useConvexAuth();
  const user = usePreloadedQuery(preloadedUserQuery);
  const [currentUser, setCurrentUser] = useState(user);
  useEffect(() => {
    if (!isLoading) {
      setCurrentUser(user);
    }
  }, [user, isLoading]);
  return (
    <>
      <UserProfileComponent user={currentUser as any} />
    </>
  );
};
