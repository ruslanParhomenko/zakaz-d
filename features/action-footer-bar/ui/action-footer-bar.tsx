"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export function ActionFooterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const month = Number(params.get("month"));
  const year = Number(params.get("year"));

  const [isPending, startTransition] = useTransition();

  const purchasesUrl = () => {
    const params = new URLSearchParams({
      month: String(month),
      year: String(year),
    });
    startTransition(() => {
      router.push(`/purchases?${params.toString()}`);
    });
  };

  const addCashUrl = () => {
    const params = new URLSearchParams({
      month: String(month),
      year: String(year),
    });
    startTransition(() => {
      router.push(`/add-cash?${params.toString()}`);
    });
  };

  return (
    <div className="flex h-full justify-around items-center px-8 w-full">
      <Button
        className="w-22 cursor-pointer h-14 bg-border/60"
        variant={"outline"}
        onClick={() => addCashUrl()}
        disabled={isPending}
      >
        <Plus className="text-blue-500 size-6" strokeWidth={6} />
      </Button>
      <Button
        className="w-22 cursor-pointer h-14 bg-border/60"
        variant={"outline"}
        onClick={() => purchasesUrl()}
        disabled={isPending}
      >
        <Minus className="text-red-500 size-6" strokeWidth={6} />
      </Button>
    </div>
  );
}
