'use client';

import { AnalyticsTrackerCards } from "@/components/analytics-cards";
import { ITransaction, TrackerTable } from "@/components/tracker-table";
import { ExpenseFormPortal } from "@/components/transaction-form";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { FilterIcon } from "lucide-react";

export default function Home() {
	const dashboardData = useQuery(api.dashboard.get);
	const transactions = useQuery(api.transactions.get) as ITransaction[];

	const dashboard = dashboardData?.[0];

	return (
		<div>
			<AnalyticsTrackerCards
				income={dashboard?.income ?? 0}
				expense={dashboard?.expense ?? 0}
				balance={dashboard?.balance ?? 0}
			/>
			<div className="flex justify-between items-center mt-10">
				<h1 className="text-xl font-bold">Transactions</h1>
				<div>
					<ExpenseFormPortal />
					<Button variant="outline" size="icon" className="h-8 w-8">
						<FilterIcon className="w-6 h-6" />
					</Button>
				</div>
			</div>
			<TrackerTable data={transactions} />
		</div>
	);
}
