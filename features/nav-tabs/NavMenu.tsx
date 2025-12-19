"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import SelectTabsByPatch from "./SelectTabsByPatch";
import SelectByMonthYear from "./SelectByMonthYear";

export type PageNavType = {
  title: string;
  href: string;
};

export default function NavMenuHeader({
  navItems,
}: {
  navItems: PageNavType[];
}) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [patch, setPatch] = useState("archive");
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());

  useEffect(() => {
    const url = `/${patch}?month=${month}&year=${year}`;

    startTransition(() => {
      router.push(url);
    });
  }, [patch, month, year]);

  return (
    <div className="py-2 sticky top-0 z-10 flex justify-center  gap-4 md:px-4 md:gap-10">
      <SelectByMonthYear
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
        isLoading={isPending}
      />

      <SelectTabsByPatch
        patch={patch}
        setPatch={setPatch}
        isPending={isPending}
        navItems={navItems}
        className="w-26"
      />
    </div>
  );
}
