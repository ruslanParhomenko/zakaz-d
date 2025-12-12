"use client";

import { useEffect, useState, useTransition } from "react";

import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";
import { MONTHS } from "./constants";
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

  const [month, setMonth] = useState(MONTHS[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [patch, setPatch] = useState("form");

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const url = `/${mainRoute}/${patch}?month=${month}&year=${year}`;

    startTransition(() => {
      router.push(url);
    });
  }, [patch, month, year]);

  const resetParams = () => {
    setPatch("");

    router.push(`/${mainRoute}`);
  };
  return (
    <div className="py-4 sticky top-0 z-10 flex justify-center md:justify-start  gap-3">
      {navItems.length > 0 && (
        <SelectTabsByPatch
          patch={patch}
          setPatch={setPatch}
          isPending={isPending}
          navItems={navItems}
        />
      )}

      <SelectByMonthYear
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
        isLoading={isPending}
      />

      <button
        onClick={resetParams}
        className="hover:text-black text-blue-700 hover:bg-transparent cursor-pointer md:w-24 md:order-3 order-0 px-2"
      >
        <RefreshCcw className="w-4 h-4" />
      </button>
    </div>
  );
}
