import { PurchasesTypeData } from "@/app/actions/purchases/purchasesAction";
import { AddCashTypeData } from "@/app/actions/add-cash/addCashAction";
import { BalanceTypeData } from "@/app/actions/balance/balanceAction";
import HeaderInfoArchive from "./HeaderInfoArchive";

import BodyTable from "./BodyTable";
import { calculateBalance } from "./utils";

export default function PageArchive({
  dataPurchases,
  dataAddCash,
  dataBalance,
  month,
  year,
}: {
  dataPurchases: PurchasesTypeData;
  dataAddCash: AddCashTypeData;
  dataBalance: BalanceTypeData;
  month: number;
  year: number;
}) {
  const { initialBalance, remainingBalance } = calculateBalance(
    dataPurchases,
    dataAddCash,
    dataBalance,
  );

  return (
    <div>
      <HeaderInfoArchive
        initialBalance={initialBalance}
        remainingBalance={remainingBalance}
        dataPurchases={dataPurchases}
        dataAddCash={dataAddCash}
      />

      <BodyTable
        month={month}
        year={year}
        dataAddCash={dataAddCash}
        dataPurchases={dataPurchases}
      />
    </div>
  );
}
