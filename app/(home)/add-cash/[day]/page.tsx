import { AddCashForm } from "@/features/add-cash";
import { getAddCashByMonthYear } from "@/features/add-cash/actions/get-data-add-cash";

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
  const dataPurchases = await getAddCashByMonthYear(docId);

  const dataByDay = dataPurchases?.days?.[+day];

  return (
    <AddCashForm data={dataByDay} day={+day} month={+month} year={+year} />
  );
}
