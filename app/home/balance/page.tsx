import PageBalance from "@/features/balance/PageBalance";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { month, year } = await searchParams;
  if (!month || !year) return null;
  return <PageBalance month={+month} year={+year} />;
}
