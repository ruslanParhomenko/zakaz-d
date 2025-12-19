import { getMonthDays } from "@/lib/utils";
import { UrlsTypeData } from "@/app/actions/url-photo/urlAction";
import TableFoto from "./TableFoto";

export default function PageFoto({
  dataUrls,
  days,
}: {
  dataUrls: UrlsTypeData;
  days: ReturnType<typeof getMonthDays>;
}) {
  if (!dataUrls)
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        данные не найдены
      </div>
    );
  return (
    <div className="p-4">
      <TableFoto days={days} dataUrls={dataUrls} />
    </div>
  );
}
