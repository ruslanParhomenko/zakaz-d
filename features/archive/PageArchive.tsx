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
import { getMonthDays, MONTHS_STRING } from "@/lib/utils";
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
import { Separator } from "@radix-ui/react-select";

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

  type DialogMode = "edit" | "delete";

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>("edit");

  const [selectedIds, setSelectedIds] = useState<{
    addCashId?: number;
    purchaseId?: number;
  } | null>(null);

  const days = getMonthDays({ month, year });

  const initialBalance = Number(dataBalance?.initialBalance || 0);

  // ✅ totals
  const totalIncome = Object.values(dataAddCash?.days || {}).reduce(
    (acc, d) => acc + Number(d.addCash || 0),
    0
  );

  const totalExpense =
    Object.values(dataPurchases?.days || {}).reduce(
      (acc, d) =>
        acc +
        Number(d.purchase || 0) +
        Number(d.fuel || 0) +
        Number(d.cleaning || 0) +
        Number(d.payment || 0),
      0
    ) || 0;

  const handleEditClick = ({
    addCashId,
    purchaseId,
  }: {
    addCashId?: number;
    purchaseId?: number;
  }) => {
    if (addCashId && purchaseId) {
      setSelectedIds({ addCashId, purchaseId });
      setDialogMode("edit");
      setDialogOpen(true);
      return;
    }

    if (addCashId) {
      router.push(`/home/add-cash/${addCashId}?month=${month}&year=${year}`);
      return;
    }

    if (purchaseId) {
      router.push(`/home/purchases/${purchaseId}?month=${month}&year=${year}`);
    }
  };

  const handleDeleteClick = ({
    addCashId,
    purchaseId,
  }: {
    addCashId?: number;
    purchaseId?: number;
  }) => {
    if (!isAdmin) return;

    if (addCashId && purchaseId) {
      setSelectedIds({ addCashId, purchaseId });
      setDialogMode("delete");
      setDialogOpen(true);
      return;
    }

    if (addCashId) {
      deleteAddCashByDay({ day: addCashId, month, year });
    }

    if (purchaseId) {
      deletePurchaseByDay({ day: purchaseId, month, year });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center pt-4 pb-4">
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
          <span className="font-bold">остаток:</span>{" "}
          {initialBalance + totalIncome - totalExpense}
        </Label>
      </div>
      <Separator className="bg-black h-0.5 mb-8" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8"></TableHead>
            <TableHead className="text-center text-blue-700 w-20 border-r">
              приход
            </TableHead>
            <TableHead className="text-center text-red-700 w-20">
              закупка
            </TableHead>
            <TableHead className="w-20"></TableHead>
          </TableRow>
        </TableHeader>

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
              <TableRow key={row.day} className="h-12">
                <TableCell className="text-md font-medium">
                  {row.day} - {row.weekday}
                </TableCell>

                <TableCell className="text-md text-blue-700 font-bold text-center border-r">
                  {income || ""}
                </TableCell>

                <TableCell className="text-md text-red-700 font-bold text-center">
                  {expense || ""}
                </TableCell>

                <TableCell className="text-center flex justify-between items-center h-12 px-4">
                  <PenBox
                    className="w-5 h-5 cursor-pointer text-blue-800"
                    onClick={() =>
                      handleEditClick({
                        addCashId: addCashByDay ? row.day : undefined,
                        purchaseId: purchaseByDay ? row.day : undefined,
                      })
                    }
                  />

                  <Trash2Icon
                    className="w-5 h-5 cursor-pointer text-red-800"
                    onClick={() =>
                      handleDeleteClick({
                        addCashId: addCashByDay ? row.day : undefined,
                        purchaseId: purchaseByDay ? row.day : undefined,
                      })
                    }
                  />
                </TableCell>
              </TableRow>
            );
          })}

          <TableRow className="h-14">
            <TableCell></TableCell>

            <TableCell className="text-md text-blue-700 font-bold text-center">
              {totalIncome}
            </TableCell>

            <TableCell className="text-md text-red-700 font-bold text-center">
              {totalExpense}
            </TableCell>

            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogMode === "edit"
                ? "Что вы хотите открыть?"
                : "Что вы хотите удалить?"}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>

            {selectedIds?.purchaseId && (
              <AlertDialogAction
                onClick={() => {
                  if (dialogMode === "edit") {
                    router.push(
                      `/home/purchases/${selectedIds.purchaseId}?month=${month}&year=${year}`
                    );
                  } else {
                    deletePurchaseByDay({
                      day: selectedIds.purchaseId!,
                      month,
                      year,
                    });
                  }
                  setDialogOpen(false);
                }}
              >
                Расход
              </AlertDialogAction>
            )}

            {selectedIds?.addCashId && (
              <AlertDialogAction
                onClick={() => {
                  if (dialogMode === "edit") {
                    router.push(
                      `/home/add-cash/${selectedIds.addCashId}?month=${month}&year=${year}`
                    );
                  } else {
                    deleteAddCashByDay({
                      day: selectedIds.addCashId!,
                      month,
                      year,
                    });
                  }
                  setDialogOpen(false);
                }}
              >
                Поступление
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
