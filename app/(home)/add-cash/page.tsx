import { AddCashForm } from "@/features/add-cash";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { month, year } = await searchParams;
  if (!month || !year) return null;
  return <AddCashForm month={+month} year={+year} />;
}
