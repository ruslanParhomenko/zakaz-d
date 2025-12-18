"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function NavMenuFooter() {
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
    <div className="flex w-full justify-center items-center gap-10 mt-auto">
      <Button
        className="w-36 text-white bg-blue-700"
        variant={"outline"}
        onClick={() => addCashUrl()}
        disabled={isPending}
      >
        приход
      </Button>
      <Button
        className="w-36 text-white bg-red-800"
        variant={"outline"}
        onClick={() => purchasesUrl()}
        disabled={isPending}
      >
        расход
      </Button>
    </div>
  );
}
