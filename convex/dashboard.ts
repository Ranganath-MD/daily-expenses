import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
	handler: async (ctx) => {
		return await ctx.db.query("dashboard").collect();
	},
});

export const update = mutation({
  args: {
    id: v.id("dashboard"),
    balance: v.float64(),
    expense: v.float64(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      balance: args.balance,
      expense: args.expense,
    });
  },
});

export const setIncomeForCurrentMonth = mutation({
  args: {
    id: v.id("dashboard"),
    income: v.float64(),
  },
  handler: async (ctx, args) => {
    const dashboard = await ctx.db.query("dashboard").first();
    if (dashboard) {
      await ctx.db.patch(args.id, {
        income: dashboard.income + args.income,
        balance: dashboard?.balance + args.income,
      });
    }
  },
});