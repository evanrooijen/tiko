import { defineTable } from "convex/server";
import { v } from "convex/values";

export const locations = defineTable({
  lat: v.number(),
  long: v.number(),
  title: v.string(),
  description: v.optional(v.string()),
  countryCode: v.string(),
  imageId: v.optional(v.id("_storage")),
});
