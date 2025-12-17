import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MONTHS, YEAR } from "./constants";

export default function SelectByMonthYear({
  month,
  setMonth,
  year,
  setYear,
  isLoading,
}: {
  month: number;
  setMonth: (value: number) => void;
  year: string;
  setYear: (value: string) => void;
  isLoading?: boolean;
}) {
  const classNameSelect =
    "w-12  h-10! bg-black font-bold  p-1 rounded-md text-white text-sm  [&>svg]:hidden justify-center";
  return (
    <div className="flex justify-center items-center md:gap-4 gap-1">
      <Select
        value={month.toString()}
        onValueChange={(value) => setMonth(+value)}
        disabled={isLoading}
      >
        <SelectTrigger className={classNameSelect}>
          <SelectValue placeholder="month" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((month) => (
            <SelectItem key={month} value={month.toString()}>
              {MONTHS.indexOf(month) + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={year}
        onValueChange={(value) => setYear(value)}
        disabled={isLoading}
      >
        <SelectTrigger className={classNameSelect}>
          <SelectValue placeholder="year" />
        </SelectTrigger>
        <SelectContent>
          {YEAR.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
