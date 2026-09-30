"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MONTHS, YEAR } from "../model/constants";
import SelectOptions from "@/components/ui/select-options";
import { useTransition } from "react";
import { useSession } from "next-auth/react";

export default function MonthYearPicker() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useSession();
  const isAdmin = data?.user.role === "ADMIN";

  const [isPending, startTransition] = useTransition();

  const monthUrl = searchParams.get("month");
  const yearUrl = searchParams.get("year");
  const handleSelectChange = (paramsName: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(paramsName, value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const selectClassName =
    "w-16 h-6! px-1 md:w-18 rounded-md text-xs font-bold tracking-wider text-green-900 border-b";

  if (!isAdmin) return null;
  return (
    <div className="flex justify-center items-center md:gap-4 gap-4">
      <SelectOptions
        options={MONTHS.map((month, index) => ({
          value: month,
          label: String(index + 1),
        }))}
        value={monthUrl!}
        onChange={(value) => handleSelectChange("month", value)}
        className={selectClassName}
        isLoading={isPending}
      />

      <SelectOptions
        options={YEAR.map((year) => ({ value: year, label: year }))}
        value={yearUrl!}
        onChange={(value) => handleSelectChange("year", value)}
        className={selectClassName}
        isLoading={isPending}
      />
    </div>
  );
}
