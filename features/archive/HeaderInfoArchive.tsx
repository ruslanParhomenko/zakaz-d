"use client";
import { PurchasesTypeData } from "@/app/actions/purchases/purchasesAction";
import { calculateBalance } from "./utils";
import { GetAddCashByMonthYearType } from "../add-cash/model/type";
import { Flag, Fuel, ShoppingBasket, Wallet2 } from "lucide-react";

export default function HeaderInfoArchive({
  initialBalance,
  remainingBalance,
  dataPurchases,
  dataAddCash,
}: {
  initialBalance: number;
  remainingBalance: number;
  dataPurchases: PurchasesTypeData;
  dataAddCash: GetAddCashByMonthYearType | null;
}) {
  const { totalPurchase, totalFuel, totalCleaning, totalPayment } =
    calculateBalance(dataPurchases, dataAddCash);
  return (
    <div className="flex justify-between items-center  pb-2">
      <div className="px-4 flex items-center justify-center text-xs">
        <Flag className="mr-2 size-3 fill-red-600 text-red-600" />:
        <span className="px-2">{initialBalance}</span>
      </div>
      <div className="px-4 flex items-center justify-center text-xs">
        <ShoppingBasket className="mr-2 size-3 fill-green-600 text-green-600" />
        :<span className="px-2">{totalPurchase}</span>
      </div>
      <div className="px-4 flex items-center justify-center text-xs">
        <Fuel className="mr-2 size-3 fill-blue-600 text-blue-600" />:
        <span className="px-2">{totalFuel}</span>
      </div>
      <div className="px-4 flex items-center justify-center text-xs">
        <Wallet2 className="mr-2 size-3 " />:
        <span className="px-2">{remainingBalance}</span>
      </div>
    </div>
  );
}
