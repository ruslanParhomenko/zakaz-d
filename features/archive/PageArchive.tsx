"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMonthDays } from "@/lib/utils";
import {
  deletePurchaseByDay,
  PurchasesTypeData,
} from "@/app/actions/purchases/purchasesAction";
import {
  AddCashTypeData,
  deleteAddCashByDay,
} from "@/app/actions/add-cash/addCashAction";
import { BalanceTypeData } from "@/app/actions/balance/balanceAction";
import { PenBox, Trash2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function PageArchive({
  dataPurchases,
  dataAddCash,
  dataBalance,
  month,
  year,
  isAdmin = false,
}: {
  dataPurchases: PurchasesTypeData;
  dataAddCash: AddCashTypeData;
  dataBalance: BalanceTypeData;
  month: number;
  year: number;
  isAdmin: boolean;
}) {
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<{
    addCashId?: string | number;
    purchaseId?: string | number;
  } | null>(null);

  if (!dataPurchases || !dataAddCash) return null;

  const days = getMonthDays({ month, year });

  const initialBalance = Number(dataBalance.initialBalance || 0);

  const totalIncome = dataAddCash.days.reduce(
    (acc, day) => acc + Number(day.addCash || 0),
    0
  );

  const totalExpense = dataPurchases.days.reduce(
    (acc, day) =>
      acc +
      Number(day.purchase || 0) +
      Number(day.fuel || 0) +
      Number(day.cleaning || 0) +
      Number(day.payment || 0),
    0
  );

  const handleEditClick = ({
    addCashId,
    purchaseId,
  }: {
    addCashId?: string | number;
    purchaseId?: string | number;
  }) => {
    // есть оба — открываем диалог
    if (addCashId && purchaseId) {
      setSelectedIds({ addCashId, purchaseId });
      setDialogOpen(true);
      return;
    }

    // только add-cash
    if (addCashId) {
      router.push(`/home/add-cash/${addCashId}?month=${month}&year=${year}`);
      return;
    }

    // только purchases
    if (purchaseId) {
      router.push(`/home/purchases/${purchaseId}?month=${month}&year=${year}`);
    }
  };

  const deleteDayPurchase = ({
    addCashId,
    purchaseId,
  }: {
    addCashId?: string | number;
    purchaseId?: string | number;
  }) => {
    if (!isAdmin) return;
    if (addCashId && purchaseId) {
      setSelectedIds({ addCashId, purchaseId });
      setDialogOpen(true);
      return;
    }
    if (addCashId) {
      deleteAddCashByDay({ day: +addCashId, month, year });
    }

    // только purchases
    if (purchaseId) {
      deletePurchaseByDay({ day: +purchaseId, month, year });
    }
  };

  return (
    <>
      {/* Верхняя панель */}
      <div className="flex justify-between items-center py-6">
        <Label className="px-4 text-blue-700">
          <span className="font-bold">сальдо:</span> {initialBalance}
          <PenBox
            className="inline ml-3 w-4 h-4 cursor-pointer text-blue-800"
            onClick={() =>
              router.push(`/home/balance?month=${month}&year=${year}`)
            }
          />
        </Label>

        <Label className="px-4 text-blue-700">
          <span className="font-bold">остаток:</span>{" "}
          {initialBalance + totalIncome - totalExpense}
        </Label>
      </div>

      {/* Таблица */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20 text-xs"></TableHead>
            <TableHead className="text-center">поступление</TableHead>
            <TableHead className="text-center">расход</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {days.map((row: any) => {
            const purchaseByDay = dataPurchases.days.find(
              (d) => d.day === row.day
            );
            const addCashByDay = dataAddCash.days.find(
              (d) => d.day === row.day
            );

            if (!purchaseByDay && !addCashByDay) return null;

            const income = addCashByDay ? +addCashByDay.addCash : 0;

            const expense = purchaseByDay
              ? +purchaseByDay.purchase +
                +purchaseByDay.fuel +
                +purchaseByDay.cleaning +
                +purchaseByDay.payment
              : 0;

            return (
              <TableRow key={row.day}>
                <TableCell className="text-xs font-medium p-1">
                  {row.day} - {row.weekday}
                </TableCell>

                <TableCell className="text-xs text-blue-700 font-bold text-center p-1">
                  {income || ""}
                </TableCell>

                <TableCell className="text-xs text-red-700 font-bold text-center p-1">
                  {expense || ""}
                </TableCell>

                <TableCell className="text-center flex gap-6">
                  <PenBox
                    className="w-4 h-4 cursor-pointer text-blue-800"
                    onClick={() =>
                      handleEditClick({
                        addCashId: addCashByDay?.day,
                        purchaseId: purchaseByDay?.day,
                      })
                    }
                  />
                  <Trash2Icon
                    className="w-4 h-4 cursor-pointer text-red-800"
                    onClick={() =>
                      deleteDayPurchase({
                        addCashId: addCashByDay?.day,
                        purchaseId: purchaseByDay?.day,
                      })
                    }
                  />
                </TableCell>
              </TableRow>
            );
          })}

          {/* Итоговая строка */}
          <TableRow className="h-12">
            <TableCell></TableCell>

            <TableCell className="text-xs text-blue-700 font-bold text-center">
              {totalIncome}
            </TableCell>

            <TableCell className="text-xs text-red-700 font-bold text-center">
              {totalExpense}
            </TableCell>

            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Диалог выбора */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Что вы хотите открыть?</AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                if (!selectedIds?.purchaseId) return;
                router.push(
                  `/home/purchases/${selectedIds.purchaseId}?month=${month}&year=${year}`
                );
              }}
            >
              Расход
            </AlertDialogAction>

            <AlertDialogAction
              onClick={() => {
                if (!selectedIds?.addCashId) return;
                router.push(
                  `/home/add-cash/${selectedIds.addCashId}?month=${month}&year=${year}`
                );
              }}
            >
              Поступление
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
