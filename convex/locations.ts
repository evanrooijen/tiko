import type { GenericQueryCtx } from "convex/server";
import { v } from "convex/values";
import type { DataModel, Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

const includeLocationImage =
  (ctx: GenericQueryCtx<DataModel>) => async (location: Doc<"locations">) => ({
    ...location,
    ...(location.imageId
      ? {
          image: await ctx.storage.getUrl(location.imageId),
        }
      : {
          image: null,
        }),
  });

export const list = query({
  args: {
    countryCode: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const locations = await ctx.db.query("locations").collect();

    const locationsWithImages = await Promise.all(
      locations.map(includeLocationImage(ctx)),
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

export const get = query({
  args: { id: v.id("locations") },
  handler: async (ctx, args) => {
    const data = await ctx.db.get(args.id);
    if (!data) {
      return null;
    }
    return await includeLocationImage(ctx)(data);
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const setLocationImage = mutation({
  args: { storageId: v.id("_storage"), locationId: v.id("locations") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.locationId, {
      imageId: args.storageId,
    });
  },
});
