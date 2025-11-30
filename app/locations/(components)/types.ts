import type { Preloaded } from "convex/react";
import type { api } from "@/convex/_generated/api";

export type WithPreloadedLocations = {
  preloadedLocations: Preloaded<typeof api.locations.list>;
};
export type WithPreloadedCountryCodes = {
  preloadedCountryCodes: Preloaded<typeof api.locations.countryCodes>;
};
