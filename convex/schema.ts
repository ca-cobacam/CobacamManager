import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  memorials: defineTable({
    memberName: v.string(),
    description: v.string(),
    createdAt: v.number(),
  }).index("by_created", ["createdAt"]),
});
