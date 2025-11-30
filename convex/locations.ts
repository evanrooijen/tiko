import { v } from "convex/values";
import { query } from "./_generated/server";

export const list = query({
  args: {
    countryCode: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const locations = await ctx.db.query("locations").collect();

    const locationsWithImages = await Promise.all(
      locations.map(async (location) => ({
        ...location,
        ...(location.imageId
          ? {
              image: await ctx.storage.getUrl(location.imageId),
            }
          : {
              image: null,
            }),
      })),
    );

    if (!args.countryCode) {
      return locationsWithImages;
    }
    return locationsWithImages.filter(
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
