import { getPurchasesByMonthYear } from "@/app/actions/purchases/purchasesAction";
import { ActionFooterBar } from "@/features/action-footer-bar";
import { getAddCashByMonthYear } from "@/features/add-cash/actions/get-data-add-cash";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { month, year } = await searchParams;

  if (!month || !year) return null;
  const docId = `${year}-${month}`;
  const [dataPurchases, dataAddCash] = await Promise.all([
    getPurchasesByMonthYear(docId),
    getAddCashByMonthYear(docId),
  ]);
  return (
    <Suspense fallback={null}>
      <ActionFooterBar
        dataPurchases={dataPurchases}
        dataAddCash={dataAddCash}
      />
    </Suspense>
  );
}
