import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMonthDays = ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  if (!month) return [];

  if (month < 1 || month > 12) return [];
  const jsMonth = month - 1;

  const daysInMonth = new Date(year, jsMonth + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, jsMonth, i + 1);
    console.log("date", date);
    return {
      day: i + 1,
      weekday: date
        .toLocaleDateString("ru-RU", { weekday: "short" })
        .replace(".", ""),
    };
  });
};

export const MONTHS_STRING = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
