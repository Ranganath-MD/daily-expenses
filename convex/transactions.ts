// Import necessary modules from convex
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all transactions
export const get = query({
	args: {},
	handler: async (ctx) => {
		// Fetch and return all transactions from the database
		return await ctx.db.query("transactions").collect();
	},
});

// Mutation to create a new transaction
export const create = mutation({
	args: {
		date: v.string(), // Date of the transaction
		expense: v.float64(), // Expense amount
		remarks: v.string(), // Remarks for the transaction
		type: v.union(v.literal("income"), v.literal("expense")), // Type of transaction
		categoryId: v.id("categories"), // ID of the category
	},
	handler: async (ctx, args) => {
		// Insert the new transaction into the database
		const transactionId = await ctx.db.insert("transactions", {
			date: args.date,
			expense: args.expense,
			remarks: args.remarks,
			type: args.type,
			categoryId: args.categoryId,
		});

		// Fetch the category associated with the transaction
		const category = await ctx.db
			.query("categories")
			.filter((q) => q.eq(q.field("_id"), args.categoryId))
			.first();

		// Fetch the dashboard data
		const dashboard = await ctx.db.query("dashboard").first();

		// Update the dashboard if it exists
		if (dashboard) {
			if (dashboard.balance <= 0) {
				throw new ConvexError({
					message: "Insufficient balance",
				});
			}
			await ctx.db.patch(dashboard._id, {
				balance: dashboard.balance - args.expense,
				expense: dashboard.expense + args.expense,
			});
		}

		// Update the category with the new transaction ID
		if (category) {
			await ctx.db.patch(category._id, {
				transactionIds: [...(category.transactionIds || []), transactionId],
			});
		}
	},
});
