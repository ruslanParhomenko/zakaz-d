import PageAddCash from "@/features/add-cash/PageAddCash";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { month, year } = await searchParams;
  if (!month || !year) return null;
  return <PageAddCash month={+month} year={+year} />;
}
