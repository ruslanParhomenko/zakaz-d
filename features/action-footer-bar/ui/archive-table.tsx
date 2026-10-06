import { PurchasesTypeData } from "@/app/actions/purchases/purchasesAction";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { GetAddCashByMonthYearType } from "@/features/add-cash/model/type";
import { cn, getMonthDays } from "@/lib/utils";

export default function ArchiveTable({
  month,
  year,
  dataPurchases,
  dataAddCash,
}: {
  month: number;
  year: number;
  dataPurchases: PurchasesTypeData | null;
  dataAddCash: GetAddCashByMonthYearType | null;
}) {
  const days = getMonthDays({ month, year });

  return (
    <>
      <Table className="table-fixed w-full border-separate border-spacing-y-0.5">
        <TableBody>
          {days.map((row) => {
            const purchaseByDay = dataPurchases?.days?.[row.day];
            const addCashByDay = dataAddCash?.days?.[row.day];

            if (!purchaseByDay && !addCashByDay) return null;

            const income = addCashByDay ? +addCashByDay.addCash : 0;
            const expense = purchaseByDay
              ? +purchaseByDay.purchase +
                +purchaseByDay.fuel +
                +purchaseByDay.cleaning +
                +purchaseByDay.payment
              : 0;

            return (
              <TableRow
                key={row.day}
                className="cursor-pointer border-0  [&>td]:border-0 [&>td]:py-0.5"
              >
                <TableCell
                  className={cn(
                    "w-1/4",
                    income && "text-blue-800 bg-border rounded-md",
                  )}
                >
                  {income > 0 && String(row.day).padStart(2, "0")}
                </TableCell>
                <TableCell
                  className={cn(
                    "w-1/4",
                    expense && "text-red-800 bg-border rounded-md",
                  )}
                >
                  {expense > 0 && String(row.day).padStart(2, "0")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
