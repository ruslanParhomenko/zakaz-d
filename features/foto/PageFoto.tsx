import { getMonthDays } from "@/lib/utils";
import { UrlsTypeData } from "@/app/actions/url-photo/urlAction";
import TableFoto from "./TableFoto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function PageFoto({
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
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.email === "parhomenkogm@gmail.com";
  if (!dataUrls)
    return (
      <div className="w-full h-[70vh] flex justify-center items-center md:w-1/2 md:mx-auto">
        данные не найдены
      </div>
    );
  return (
    <div className="w-full flex justify-center items-center md:w-1/2 md:mx-auto">
      <TableFoto
        days={days}
        dataUrls={dataUrls}
        month={month}
        year={year}
        isAdmin={isAdmin}
      />
    </div>
  );
}
