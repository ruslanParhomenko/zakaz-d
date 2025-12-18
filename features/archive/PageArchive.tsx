import { PurchasesTypeData } from "@/app/actions/purchases/purchasesAction";
import { AddCashTypeData } from "@/app/actions/add-cash/addCashAction";
import { BalanceTypeData } from "@/app/actions/balance/balanceAction";
import NavMenuFooter from "../nav-tabs/NavMenuFooter";
import HeaderInfoArchive from "./HeaderInfoArchive";

import BodyTable from "./BodyTable";
import { calculateBalance } from "./utils";

export default function PageArchive({
  dataPurchases,
  dataAddCash,
  dataBalance,
  month,
  year,
  isAdmin = false,
}: {
  dataPurchases: PurchasesTypeData;
  dataAddCash: AddCashTypeData;
  dataBalance: BalanceTypeData;
  month: number;
  year: number;
  isAdmin: boolean;
}) {
  const { initialBalance, remainingBalance } = calculateBalance(
    dataPurchases,
    dataAddCash,
    dataBalance
  );

  return (
    <div className="flex flex-col h-[80vh] justify-start">
      <HeaderInfoArchive
        month={month}
        year={year}
        initialBalance={initialBalance}
        remainingBalance={remainingBalance}
      />

      <BodyTable
        month={month}
        year={year}
        dataAddCash={dataAddCash}
        dataPurchases={dataPurchases}
        isAdmin={isAdmin}
      />

      <NavMenuFooter />
    </div>
  );
}
