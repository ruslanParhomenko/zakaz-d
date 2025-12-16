import PagePurchases from "@/features/purchases/PagePurchases";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { month, year } = await searchParams;
  if (!month || !year) return null;
  return <PagePurchases month={+month} year={+year} />;
}
