import type { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";

export const list = query({
  handler: async (ctx): Promise<Doc<"locations">[]> => {
    return await ctx.db.query("locations").collect();
  },
});
