"use client";
import { AddCashTypeData } from "@/app/actions/add-cash/addCashAction";
import { PurchasesTypeData } from "@/app/actions/purchases/purchasesAction";
import { Label } from "@/components/ui/label";
import { MONTHS_STRING } from "@/lib/utils";
import { PenBox } from "lucide-react";
import { useRouter } from "next/navigation";
import { calculateBalance } from "./utils";

export default function HeaderInfoArchive({
  month,
  year,
  initialBalance,
  remainingBalance,
  dataPurchases,
  dataAddCash,
}: {
  month: number;
  year: number;
  initialBalance: number;
  remainingBalance: number;
  dataPurchases: PurchasesTypeData;
  dataAddCash: AddCashTypeData;
}) {
  const router = useRouter();
  const { totalPurchase, totalFuel, totalCleaning, totalPayment } =
    calculateBalance(dataPurchases, dataAddCash);
  return (
    <>
      <div className="flex justify-between items-center  pb-2">
        <Label className="px-4">
          <span className="font-bold">сальдо:</span> {initialBalance}
          <PenBox
            className="inline ml-3 w-4 h-4 cursor-pointer "
            onClick={() => router.push(`/balance?month=${month}&year=${year}`)}
          />
        </Label>
        <Label>{MONTHS_STRING[month - 1]}</Label>

        <Label className="px-4">
          <span className="font-bold">остаток:</span> {remainingBalance}
        </Label>
      </div>
      <div className="flex flex-row justify-between text-xs">
        <span>
          <span className="font-medium pr-1">закупка:</span> {totalPurchase}
        </span>
        <span>
          <span className="font-medium p-1">топливо:</span> {totalFuel}
        </span>
        <span>
          <span className="font-medium p-1">химчистка:</span> {totalCleaning}
        </span>
        <span>
          <span className="font-medium p-1">оплата:</span> {totalPayment}
        </span>
      </div>
    </>
  );
}
