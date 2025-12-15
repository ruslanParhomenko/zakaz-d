import {
  AddCashTypeData,
  getAddCashByMonthYear,
} from "@/app/actions/add-cash/addCashAction";
import {
  getPurchasesByMonthYear,
  PurchasesTypeData,
} from "@/app/actions/purchases/purchasesAction";
import PageArchive from "@/features/archive/PageArchive";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { month, year } = await searchParams;

  if (!month || !year) return null;
  const docId = `${year}-${month}`;

  const dataPurchases = await getPurchasesByMonthYear(docId);
  const dataAddCash = await getAddCashByMonthYear(docId);

  return (
    <PageArchive
      dataPurchases={dataPurchases as PurchasesTypeData}
      dataAddCash={dataAddCash as AddCashTypeData}
      month={+month}
      year={+year}
    />
  );
}
