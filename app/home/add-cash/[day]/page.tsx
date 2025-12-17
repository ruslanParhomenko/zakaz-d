import {
  AddCashTypeData,
  getAddCashByMonthYear,
} from "@/app/actions/add-cash/addCashAction";
import PageAddCash from "@/features/add-cash/PageAddCash";

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
  const dataPurchases = (await getAddCashByMonthYear(docId)) as AddCashTypeData;

  const dataByDay = dataPurchases?.days?.[+day];

  return (
    <PageAddCash data={dataByDay} day={+day} month={+month} year={+year} />
  );
}
