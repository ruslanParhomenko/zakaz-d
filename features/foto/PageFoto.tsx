import { getMonthDays } from "@/lib/utils";
import { UrlsTypeData } from "@/app/actions/url-photo/urlAction";
import TableFoto from "./TableFoto";

export default function PageFoto({
  dataUrls,
  days,
  month,
  year,
}: {
  dataUrls: UrlsTypeData;
  days: ReturnType<typeof getMonthDays>;
  month: number;
  year: number;
}) {
  if (!dataUrls)
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        данные не найдены
      </div>
    );
  return (
    <div className="p-4">
      <TableFoto days={days} dataUrls={dataUrls} month={month} year={year} />
    </div>
  );
}
