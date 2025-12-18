import {
  getPurchasesByMonthYear,
  PurchasesTypeData,
} from "@/app/actions/purchases/purchasesAction";
import PagePurchases from "@/features/purchases/PagePurchases";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ day: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { day } = await params;
  const { month, year } = await searchParams;
  if (!month || !year || !day) return null;

  const docId = `${year}-${month}`;
  const dataPurchases = (await getPurchasesByMonthYear(
    docId
  )) as PurchasesTypeData;

  const dataByDay = dataPurchases?.days?.[+day];

  return (
    <PagePurchases data={dataByDay} day={+day} month={+month} year={+year} />
  );
}
