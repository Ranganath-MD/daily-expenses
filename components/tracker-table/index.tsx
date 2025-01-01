"use client";

import {
	ColumnDef,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Id } from "@/convex/_generated/dataModel";
import { ArrowDown, ArrowUp } from "lucide-react";

export interface ITransaction {
	_id: Id<"transactions">;
	_creationTime: number;
	expense: number;
	date: string;
	remarks: string;
	type: string;
	categoryId: string;
}

interface ITableProps {
	data: ITransaction[];
}

const columnHelper = createColumnHelper<ITransaction>();

const defaultColumns = [
	columnHelper.accessor("type", {
		maxSize: 50,
		cell: (row) => {
			return (
				<>
					{row.getValue() === "expense" ? (
						<ArrowDown className="text-red-600 w-4" />
					) : (
						<ArrowUp className="text-green-600 w-4" />
					)}
				</>
			);
		},
		header: () => <div className="font-bold">Type</div>,
	}),
	columnHelper.accessor("date", {
		maxSize: 100,
		cell: (row) => <div>{row.getValue()}</div>,
		header: () => <div className="font-bold">Date</div>,
	}),
	columnHelper.accessor("expense", {
		maxSize: 150,
		cell: (row) => {
			const numberFormat = new Intl.NumberFormat("en-IN").format(
				row.getValue()
			);
			return <>{numberFormat}</>;
		},
		header: () => <div className="font-bold">Expense</div>,
	}),
	columnHelper.accessor("categoryId", {
		maxSize: 100,
		cell: (row) => <div>{row.getValue()}</div>,
		header: () => <div className="font-bold">Category</div>,
	}),
	columnHelper.accessor("remarks", {
		cell: (row) => <div className="truncate">{row.getValue()}</div>,
		header: () => <div className="font-bold">Remarks</div>,
	}),
];

export const TrackerTable: React.FC<ITableProps> = ({ data }) => {
	const table = useReactTable({
		data,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	if (!data) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="border mt-4 rounded-md">
			<Table>
				<TableHeader>
					{table?.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									className="h-10"
									style={{ width: header.column.getSize() }}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table?.getRowModel().rows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell
									key={cell.id}
									className="h-8 py-2"
									style={{ width: cell.column.getSize() }}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
