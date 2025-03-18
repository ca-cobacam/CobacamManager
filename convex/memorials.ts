import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    memberName: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("memorials", {
      memberName: args.memberName,
      description: args.description,
      createdAt: Date.now(),
    });
  },
});
