'use client';

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const transactions = useQuery(api.transactions.get);
  
  console.log(transactions);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    </div>
  );
}
