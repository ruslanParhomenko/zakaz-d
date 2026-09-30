"use client";
import { AddCashTypeData } from "@/app/actions/add-cash/addCashAction";
import { PurchasesTypeData } from "@/app/actions/purchases/purchasesAction";
import { Label } from "@/components/ui/label";
import { calculateBalance } from "./utils";

export default function HeaderInfoArchive({
  initialBalance,
  remainingBalance,
  dataPurchases,
  dataAddCash,
}: {
  initialBalance: number;
  remainingBalance: number;
  dataPurchases: PurchasesTypeData;
  dataAddCash: AddCashTypeData;
}) {
  const { totalPurchase, totalFuel, totalCleaning, totalPayment } =
    calculateBalance(dataPurchases, dataAddCash);
  return (
    <>
      <div className="flex justify-between items-center  pb-2">
        <Label className="px-4">
          <span className="font-bold">сальдо:</span> {initialBalance}
        </Label>

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
          <span className="font-medium p-1">хим-ка:</span> {totalCleaning}
        </span>
        <span>
          <span className="font-medium p-1">оплата:</span> {totalPayment}
        </span>
      </div>
    </>
  );
}
