import { useConvexAuth, useQuery } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { is } from "zod/v4/locales";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

type User = FunctionReturnType<typeof api.auth.getCurrentUser>;

const UserNavigation = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const user = useQuery(
    api.auth.getCurrentUser,
    isAuthenticated ? undefined : "skip",
  );

  if (isLoading) {
    return <UserNavigationSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return <UserNavigationContent currentUser={user} />;
};
export default UserNavigation;

type UserNavigationContent = {
  currentUser: User;
};

const UserNavigationContent = ({ currentUser }: UserNavigationContent) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar>
          {currentUser.image && <AvatarImage src={currentUser.image} />}
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem></DropdownMenuItem>
          <DropdownMenuItem></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleSignOut}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserNavigationSkeleton = () => {
  return <Skeleton className="rounded-full size-8" />;
};
