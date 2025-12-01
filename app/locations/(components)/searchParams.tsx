import { createLoader, parseAsString } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const locationsSearchParams = {
  countryCode: parseAsString,
};

export const loadSearchParams = createLoader(locationsSearchParams, {
  urlKeys: {
    countryCode: "country",
  },
});
