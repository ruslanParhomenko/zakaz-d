import {
  AddCashTypeData,
  getAddCashByMonthYear,
} from "@/app/actions/add-cash/addCashAction";
import {
  BalanceTypeData,
  getAddBalanceByMonthYear,
} from "@/app/actions/balance/balanceAction";
import {
  getPurchasesByMonthYear,
  PurchasesTypeData,
} from "@/app/actions/purchases/purchasesAction";
import PageArchive from "@/features/archive/PageArchive";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.email === "parhomenkogm@gmail.com";
  const { month, year } = await searchParams;

  if (!month || !year) return null;
  const docId = `${year}-${month}`;

  // Параллельная загрузка всех данных
  const [dataPurchases, dataAddCash, dataBalance] = await Promise.all([
    getPurchasesByMonthYear(docId),
    getAddCashByMonthYear(docId),
    getAddBalanceByMonthYear(docId),
  ]);

  return (
    <PageArchive
      dataPurchases={dataPurchases as PurchasesTypeData}
      dataAddCash={dataAddCash as AddCashTypeData}
      dataBalance={dataBalance as BalanceTypeData}
      month={+month}
      year={+year}
      isAdmin={isAdmin}
    />
  );
}
