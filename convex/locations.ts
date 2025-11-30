import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";

export const list = query({
  args: {
    countryCode: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<Doc<"locations">[]> => {
    const locations = await ctx.db.query("locations").collect();
    if (!args.countryCode) {
      return locations;
    }
    return locations.filter(
      (location) => location.countryCode === args.countryCode,
    );
  },
});

export const countryCodes = query({
  handler: async (ctx): Promise<string[]> => {
    const locations = await ctx.db.query("locations").collect();
    return locations.map((location) => location.countryCode);
  },
});
