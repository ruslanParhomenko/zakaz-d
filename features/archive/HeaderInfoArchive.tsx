"use client";
import { Label } from "@/components/ui/label";
import { MONTHS_STRING } from "@/lib/utils";
import { PenBox } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeaderInfoArchive({
  month,
  year,
  initialBalance,
  remainingBalance,
}: {
  month: number;
  year: number;
  initialBalance: number;
  remainingBalance: number;
}) {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center pt-2 pb-6">
      <Label className="px-4">
        <span className="font-bold">сальдо:</span> {initialBalance}
        <PenBox
          className="inline ml-3 w-4 h-4 cursor-pointer "
          onClick={() =>
            router.push(`/home/balance?month=${month}&year=${year}`)
          }
        />
      </Label>
      <Label>{MONTHS_STRING[month - 1]}</Label>

      <Label className="px-4">
        <span className="font-bold">остаток:</span> {remainingBalance}
      </Label>
    </div>
  );
}
