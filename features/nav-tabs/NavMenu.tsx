"use client";

import { useEffect, useState, useTransition } from "react";

import { usePathname, useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";
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
  const key = `patch_${mainRoute}`;
  const router = useRouter();
  const patchName = usePathname();
  const patchTabs = patchName?.split("/")[2];

  console.log(patchName);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [patch, setPatch] = useState("");

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const url = `/${mainRoute}/${patch}?month=${month}&year=${year}`;

    startTransition(() => {
      router.push(url);
    });
  }, [patch, month, year]);

  // const resetParams = () => {
  //   setPatch("");

  //   router.push(`/${mainRoute}`);
  // };

  return (
    <div className="py-4 sticky top-0 z-10 flex justify-center md:justify-end  gap-2 md:px-4 md:gap-10">
      {/* <button
        onClick={resetParams}
        className="hover:text-black text-blue-700 hover:bg-transparent cursor-pointer  px-1"
      >
        <RefreshCcw className="w-4 h-4" />
      </button> */}
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
      />
    </div>
  );
}
