import { preloadQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export const flagImageUrl = (countryCode: string) => {
  return `https://flagcdn.com/${countryCode.toLocaleLowerCase()}.svg`;
};

export const preloadLocationById = async (locationId?: string) => {
  const location = await preloadQuery(api.locations.get, {
    id: locationId as Id<"locations">,
  });

  if (!location) notFound();

  return location;
};
