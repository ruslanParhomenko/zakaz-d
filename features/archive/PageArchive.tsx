import { PurchasesTypeData } from "@/app/actions/purchases/purchasesAction";
import { BalanceTypeData } from "@/app/actions/balance/balanceAction";
import HeaderInfoArchive from "./HeaderInfoArchive";

import BodyTable from "./BodyTable";
import { calculateBalance } from "./utils";
import { GetAddCashByMonthYearType } from "../add-cash/model/type";

export default function PageArchive({
  dataPurchases,
  dataAddCash,
  dataBalance,
  month,
  year,
}: {
  dataPurchases: PurchasesTypeData;
  dataAddCash: GetAddCashByMonthYearType | null;
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
