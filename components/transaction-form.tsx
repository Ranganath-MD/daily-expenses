import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState } from "react";
import { PlusIcon } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DatePicker } from "./date-picker";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexError } from "convex/values";
import { toast } from "sonner";

export const Form: React.FC<{
	mode: string;
	handleMode: (value: string) => void;
	onSubmit: (e: any) => void;
	onChange: any;
	formData: any;
	handleSelect: any;
	handleDate: any;
}> = ({
	// mode,
	// handleMode,
	onSubmit,
	onChange,
	formData,
	handleSelect,
	handleDate,
}) => {
	const categories = useQuery(api.categories.default);
	const disableSubmit =
		!+formData.expense || !formData.category || !formData.remarks;
	return (
		<Card>
			<CardContent className="p-6 space-y-4">
				<form onSubmit={onSubmit}>
					{/* <ToggleGroup
						type="single"
						value={mode}
						onValueChange={(value) => handleMode?.(value)}
					>
						<ToggleGroupItem
							name="type"
							value="expense"
							aria-label="Toggle expense"
							className={`flex-1 ${mode === "expense" ? "font-bold" : ""}`}
						>
							Expense
						</ToggleGroupItem>
						<ToggleGroupItem
							name="type"
							value="income"
							aria-label="Toggle income"
							className={`flex-1 ${mode === "income" ? "font-bold" : ""}`}
						>
							Income
						</ToggleGroupItem>
					</ToggleGroup> */}

					<div className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">Amount</label>
							<Input
								placeholder="Enter amount"
								type="number"
								name="expense"
								value={formData?.expense}
								onChange={onChange}
								min={0}
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Category</label>
							<Select
								name="categoryId"
								onValueChange={handleSelect}
								value={formData?.category}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent>
									{categories?.map((category) => (
										<SelectItem value={category._id} key={category._id}>
											{category.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2 flex flex-col">
							<label className="text-sm font-medium">Date of transaction</label>
							<DatePicker onSelect={handleDate} date={formData?.date} />
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Remarks</label>
							<Input
								placeholder="Enter description"
								name="remarks"
								value={formData?.remarks}
								onChange={onChange}
							/>
						</div>

						<Button className="w-full" type="submit" disabled={disableSubmit}>
							Add Transaction
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

type Type = "expense" | "income";

const initialValue = {
	expense: 0,
	date: new Date(),
	remarks: "",
	category: "",
};

export function ExpenseFormPortal() {
	const createTransaction = useMutation(api.transactions.create);
	// const [mode, setMode] = useState("expense");
	const [formData, setFormData] = useState(initialValue);

	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleSetInputs = (e: any) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleDate = (value: Date) =>
		setFormData((prev) => ({ ...prev, date: value }));
	const handleSelect = (value: string) =>
		setFormData((prev) => ({ ...prev, category: value }));

	const handleMode = (value: string) => {
		if (!value) return;
		// setMode(value);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (+formData.expense === 0 || !formData.category || !formData.remarks) {
			return;
		}
		const payload = {
			expense: +formData.expense,
			date: formData.date.toLocaleDateString(),
			categoryId: formData.category as Id<"categories">,
			remarks: formData.remarks,
			type: "expense" as Type,
		};
		try {
			await createTransaction(payload);
			setOpen(false);
			setFormData(initialValue);
		} catch (err) {
			const error = err as ConvexError<{ message: string }>;
			toast.error(error.data.message, {
				position: isDesktop ? "bottom-right" : "bottom-center",
			});
		}
	};

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						className="h-8 font-bold border-dashed mr-2"
					>
						<PlusIcon className="px-0" /> Add Transaction
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							<span className="text-xl font-bold">Add New Transaction</span>
						</DialogTitle>
					</DialogHeader>
					<Form
						mode={"expense"}
						handleMode={handleMode}
						onSubmit={onSubmit}
						onChange={handleSetInputs}
						formData={formData}
						handleDate={handleDate}
						handleSelect={handleSelect}
					/>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline" className="h-8 font-bold border-dashed mr-2">
					<PlusIcon className="px-0" /> Add Transaction
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>
						<span className="text-xl font-bold">Add New Transaction</span>
					</DrawerTitle>
				</DrawerHeader>
				<Form
					mode={"expense"}
					handleMode={handleMode}
					onSubmit={onSubmit}
					onChange={handleSetInputs}
					handleDate={handleDate}
					handleSelect={handleSelect}
					formData={formData}
				/>

				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
