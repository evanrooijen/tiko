import {
  createLoader,
  parseAsBoolean,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

const modes = ["view", "edit"] as const;

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const locationsSearchParams = {
  countryCode: parseAsString,
  location: parseAsString,
  mode: parseAsStringLiteral(modes),
};

export const loadSearchParams = createLoader(locationsSearchParams, {
  urlKeys: {
    countryCode: "country",
  },
});
