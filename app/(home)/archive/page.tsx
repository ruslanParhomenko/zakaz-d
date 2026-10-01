import {
  BalanceTypeData,
  getAddBalanceByMonthYear,
} from "@/app/actions/balance/balanceAction";
import {
  getPurchasesByMonthYear,
  PurchasesTypeData,
} from "@/app/actions/purchases/purchasesAction";
import { getAddCashByMonthYear } from "@/features/add-cash/actions/get-data-add-cash";
import PageArchive from "@/features/archive/PageArchive";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { month, year } = await searchParams;

  if (!month || !year) return null;
  const docId = `${year}-${month}`;

  const [dataPurchases, dataAddCash, dataBalance] = await Promise.all([
    getPurchasesByMonthYear(docId),
    getAddCashByMonthYear(docId),
    getAddBalanceByMonthYear(docId),
  ]);

  return (
    <PageArchive
      dataPurchases={dataPurchases as PurchasesTypeData}
      dataAddCash={dataAddCash}
      dataBalance={dataBalance as BalanceTypeData}
      month={+month}
      year={+year}
    />
  );
}
