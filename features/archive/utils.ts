import { PurchasesTypeData } from "@/app/actions/purchases/purchasesAction";
import { AddCashTypeData } from "@/app/actions/add-cash/addCashAction";
import { BalanceTypeData } from "@/app/actions/balance/balanceAction";

export function calculateBalance(
  dataPurchases: PurchasesTypeData,
  dataAddCash: AddCashTypeData,
  dataBalance?: BalanceTypeData
) {
  const initialBalance = Number(dataBalance?.initialBalance || 0);

  const totalIncome = Object.values(dataAddCash?.days || {}).reduce(
    (acc, d) => acc + Number(d.addCash || 0),
    0
  );

  const totalExpense = Object.values(dataPurchases?.days || {}).reduce(
    (acc, d) =>
      acc +
      Number(d.purchase || 0) +
      Number(d.fuel || 0) +
      Number(d.cleaning || 0) +
      Number(d.payment || 0),
    0
  );

  const remainingBalance = initialBalance + totalIncome - totalExpense;

  return {
    initialBalance,
    totalIncome,
    totalExpense,
    remainingBalance,
  };
}
