import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Wallet } from "lucide-react";

export const AnalyticsTrackerCards: React.FC<{
	income: number;
	expense: number;
	balance: number;
}> = ({ income = 0, expense = 0, balance = 0 }) => {
	const getNumberFormat = (value: number) => {
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
		}).format(value);
	};
	return (
		<div className="flex items-center gap-4 overflow-auto mt-12 [&::-webkit-scrollbar]:hidden">
			<Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900 ">
				<CardContent className="p-6 w-60">
					<div className="flex items-center gap-2 text-green-800 dark:text-green-200">
						<ArrowUp className="h-4 w-4" />
						<span>Income</span>
					</div>
					<div className="text-2xl font-bold text-green-800 dark:text-green-200">
						{getNumberFormat(income)}
					</div>
				</CardContent>
			</Card>

			<Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900">
				<CardContent className="p-6 w-60">
					<div className="flex items-center gap-2 text-red-800 dark:text-red-200">
						<ArrowDown className="h-4 w-4" />
						<span>Expenses</span>
					</div>
					<div className="text-2xl font-bold text-red-800 dark:text-red-200">
						{getNumberFormat(expense)}
					</div>
				</CardContent>
			</Card>

			<Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
				<CardContent className="p-6 w-60">
					<div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
						<Wallet className="h-4 w-4" />
						<span>Balance</span>
					</div>
					<div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
						{getNumberFormat(balance)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
