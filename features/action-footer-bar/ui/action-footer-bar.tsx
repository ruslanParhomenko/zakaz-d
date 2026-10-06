"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import ArchiveTable from "./archive-table";
import { PurchasesTypeData } from "@/app/actions/purchases/purchasesAction";
import { GetAddCashByMonthYearType } from "@/features/add-cash/model/type";

export function ActionFooterBar({
  dataAddCash,
  dataPurchases,
}: {
  dataPurchases: PurchasesTypeData | null;
  dataAddCash: GetAddCashByMonthYearType | null;
}) {
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
    <div className="grid grid-rows-[auto_1fr] gap-2 w-full h-full">
      <div className="flex flex-col h-[70dvh]">
        <ArchiveTable
          month={month}
          year={year}
          dataAddCash={dataAddCash}
          dataPurchases={dataPurchases}
        />
      </div>
      <div className="flex h-full justify-end items-center px-4 w-full gap-10">
        <Button
          className="w-14 cursor-pointer h-10 bg-border/60"
          variant={"outline"}
          onClick={() => addCashUrl()}
          disabled={isPending}
        >
          <Plus className="text-blue-500 size-6" strokeWidth={6} />
        </Button>
        <Button
          className="w-14 cursor-pointer h-10 bg-border/60"
          variant={"outline"}
          onClick={() => purchasesUrl()}
          disabled={isPending}
        >
          <Minus className="text-red-500 size-6" strokeWidth={6} />
        </Button>
      </div>
    </div>
  );
}
