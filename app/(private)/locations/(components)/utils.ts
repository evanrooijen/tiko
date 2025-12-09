import { betterFetch } from "@better-fetch/fetch";
import { preloadQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import z from "zod";
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

export const getCountryCodes = () => {
  return betterFetch("https://restcountries.com/v3.1/all", {
    query: {
      fields: "cca2,name",
    },
    output: z.array(
      z.object({
        cca2: z.string(),
        name: z.object({
          common: z.string(),
        }),
      }),
    ),
  });
};
