import {
  getAddUrlsByMonthYear,
  UrlsTypeData,
} from "@/app/actions/url-photo/urlAction";
import PageFoto from "@/features/foto/PageFoto";
import { getMonthDays } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { month, year } = await searchParams;
  if (!month || !year) return null;
  const docId = `${year}-${month}`;
  const dataUrls = await getAddUrlsByMonthYear(docId);

  const days = getMonthDays({ month: +month, year: +year });

  return (
    <PageFoto
      dataUrls={dataUrls as UrlsTypeData}
      days={days}
      month={+month}
      year={+year}
    />
  );
}
