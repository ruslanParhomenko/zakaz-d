"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMonthDays } from "@/lib/utils";
import { PurchasesTypeData } from "@/app/actions/purchases/purchasesAction";
import { AddCashTypeData } from "@/app/actions/add-cash/addCashAction";
import { PenBox } from "lucide-react";

export default function PageArchive({
  dataPurchases,
  dataAddCash,
  month,
  year,
}: {
  dataPurchases: PurchasesTypeData;
  dataAddCash: AddCashTypeData;
  month: number;
  year: number;
}) {
  if (!dataPurchases || !dataAddCash) return null;

  const days = getMonthDays({ month, year });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8 text-xs"></TableHead>
          <TableHead className="text-center">остаток</TableHead>
          <TableHead className="text-center">поступление</TableHead>
          <TableHead className="text-center">расход</TableHead>
          <TableHead className="w-10"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {days.map((row: any) => {
          const dataPurchaseByDay = dataPurchases?.days?.find(
            (d) => d.day === row.day
          );
          const dataAddCashByDay = dataAddCash?.days?.find(
            (d) => d.day === row.day
          );
          const cost =
            dataPurchaseByDay &&
            dataPurchaseByDay?.payment +
              dataPurchaseByDay?.fuel +
              dataPurchaseByDay?.cleaning +
              dataPurchaseByDay?.purchase;
          return (
            <TableRow key={row.day}>
              <TableCell className="font-medium text-xs  p-1">
                {row.day}
              </TableCell>
              <TableCell></TableCell>
              <TableCell className="text-xs text-blue-700 font-bold text-center p-1">
                {dataAddCashByDay && dataAddCashByDay.addCash.toString()}
              </TableCell>

              <TableCell className="text-xs text-red-700 font-bold text-center  p-1">
                {cost && cost.toString()}
              </TableCell>
              <TableCell>
                <PenBox className="text-blue-800 w-4 h-4" />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
