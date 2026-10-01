export type GetAddCashByMonthYearType = {
  initialBalance: string;
  id: string;
  year: number;
  month: number;
  days: Record<number, { addCash: string }>;
};
