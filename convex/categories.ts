import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export default query(async (ctx) => {
	return await ctx.db.query("categories").collect();
});

export const createCategory = mutation({
	args: {
		title: v.string(),
		color: v.string(),
	},
	handler: async (ctx, args) => {
		await ctx.db.insert("categories", {
			title: args.title,
			color: args.color,
		});
	},
});

export const deleteCategory = mutation({
	args: { id: v.id("categories") },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});

export const updateCategory = mutation({
	args: {
		id: v.id("categories"),
		title: v.string(),
		color: v.string(),
	},
	handler: async (ctx, args) => {
		await ctx.db.replace(args.id, {
			title: args.title,
			color: args.color,
		});
	},
});

export const getTransactionsByCategory = query({
	args: { categoryId: v.id("categories") },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("transactions")
			.filter((q) => q.eq(q.field("categoryId"), args.categoryId))
			.collect();
	},
})
