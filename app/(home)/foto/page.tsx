import {
  getAddUrlsByMonthYear,
  UrlsTypeData,
} from "@/app/actions/url-photo/urlAction";
import PageFoto from "@/features/foto/PageFoto";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { month, year } = await searchParams;
  if (!month || !year) return null;
  const docId = `${year}-${month}`;
  const dataUrls = await getAddUrlsByMonthYear(docId);
  return (
    <PageFoto dataUrls={dataUrls as UrlsTypeData} month={+month} year={+year} />
  );
}
