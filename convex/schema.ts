import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	categories: defineTable({
		title: v.string(),
		color: v.string(),
		transactionIds: v.optional(v.array(v.id("transactions"))),
	}),
	transactions: defineTable({
		date: v.string(),
		expense: v.float64(),
		remarks: v.string(),
		type: v.union(v.literal("income"), v.literal("expense")),
		categoryId: v.id("categories"),
	}),
	dashboard: defineTable({
		balance: v.float64(),
		expense: v.float64(),
		income: v.float64(),
	}),
});