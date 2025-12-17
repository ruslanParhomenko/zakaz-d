"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SelectTabsByPatch from "./SelectTabsByPatch";
import SelectByMonthYear from "./SelectByMonthYear";

export type PageNavType = {
  title: string;
  href: string;
};

export default function NavMenuHeader({
  navItems,
  mainRoute,
}: {
  navItems: PageNavType[];
  mainRoute: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [patch, setPatch] = useState("");
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());

  /**
   * 1. СИНХРОНИЗАЦИЯ STATE ИЗ URL
   */
  useEffect(() => {
    const urlPatch = pathname?.split("/")[2] ?? "";

    const urlMonth = searchParams.get("month");
    const urlYear = searchParams.get("year");

    if (urlPatch !== patch) setPatch(urlPatch);
    if (urlMonth && Number(urlMonth) !== month) setMonth(Number(urlMonth));
    if (urlYear && urlYear !== year) setYear(urlYear);
  }, [pathname, searchParams]);

  /**
   * 2. НАВИГАЦИЯ ПО ДЕЙСТВИЯМ ПОЛЬЗОВАТЕЛЯ
   */
  const pushUrl = ({
    nextPatch = patch,
    nextMonth = month,
    nextYear = year,
  }: {
    nextPatch?: string;
    nextMonth?: number;
    nextYear?: string;
  }) => {
    const params = new URLSearchParams({
      month: String(nextMonth),
      year: String(nextYear),
    });

    startTransition(() => {
      router.push(`/${mainRoute}/${nextPatch}?${params.toString()}`);
    });
  };

  return (
    <div className="py-6 sticky top-0 z-10 flex justify-center md:justify-end gap-1 md:px-4 md:gap-10">
      <SelectByMonthYear
        month={month}
        year={year}
        setMonth={(m) => {
          setMonth(m);
          pushUrl({ nextMonth: m });
        }}
        setYear={(y) => {
          setYear(y);
          pushUrl({ nextYear: y });
        }}
        isLoading={isPending}
      />

      <SelectTabsByPatch
        patch={patch}
        setPatch={(p) => {
          setPatch(p);
          pushUrl({ nextPatch: p });
        }}
        isPending={isPending}
        navItems={navItems}
      />
    </div>
  );
}
