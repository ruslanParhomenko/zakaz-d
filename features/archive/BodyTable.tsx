"use client";
import {
  AddCashTypeData,
  deleteAddCashByDay,
} from "@/app/actions/add-cash/addCashAction";
import {
  deletePurchaseByDay,
  PurchasesTypeData,
} from "@/app/actions/purchases/purchasesAction";
import ModalDialog from "@/components/modal-dialog/ModalDialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getMonthDays } from "@/lib/utils";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { calculateBalance } from "./utils";

export default function BodyTable({
  month,
  year,
  dataPurchases,
  dataAddCash,
  isAdmin,
}: {
  month: number;
  year: number;
  dataPurchases: PurchasesTypeData;
  dataAddCash: AddCashTypeData;
  isAdmin: boolean;
}) {
  const days = getMonthDays({ month, year });

  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState<{
    addCashId?: number;
    purchaseId?: number;
  } | null>(null);

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedIds(null);
  };

  const handlePurchaseAction = () => {
    if (!selectedIds?.purchaseId) return;
    deletePurchaseByDay({
      day: selectedIds.purchaseId,
      month,
      year,
    });

    closeDialog();
  };

  const handleAddCashAction = () => {
    if (!selectedIds?.addCashId) return;
    deleteAddCashByDay({
      day: selectedIds.addCashId,
      month,
      year,
    });
    closeDialog();
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

  const { totalIncome, totalExpense } = calculateBalance(
    dataPurchases,
    dataAddCash
  );
  return (
    <>
      <Table className="table-fixed w-full border-collapse">
        <TableBody>
          <TableRow className="border-b border-black">
            <TableCell className="w-1/4" />
            <TableCell className="w-1/4 text-center text-blue-700 p-1">
              {totalIncome}
            </TableCell>
            <TableCell className="w-1/4 text-center text-red-700 p-1">
              {totalExpense}
            </TableCell>
            <TableCell className="w-1/4" />
          </TableRow>
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
              <TableRow key={row.day} className="cursor-pointer border-b">
                <TableCell className="w-1/4 text-left py-0">
                  <div className="w-full flex flex-row justify-start gap-4 items-center h-full">
                    <span>{String(row.day).padStart(2, "0")}</span>
                    <span>{row.weekday}</span>
                  </div>
                </TableCell>

                <TableCell
                  className="w-1/4 text-center text-blue-700 py-0"
                  onClick={() => {
                    addCashByDay &&
                      router.push(
                        `/add-cash/${row.day}?month=${month}&year=${year}`
                      );
                  }}
                >
                  {income || ""}
                </TableCell>
                <TableCell
                  className="w-1/4 text-center text-red-700 py-1"
                  onClick={() => {
                    purchaseByDay &&
                      router.push(
                        `/purchases/${row.day}?month=${month}&year=${year}`
                      );
                  }}
                >
                  {expense || ""}
                </TableCell>
                <TableCell className="w-1/4 text-center py-0">
                  <div className="w-full flex flex-row justify-end items-center h-full">
                    {isAdmin && (
                      <TrashIcon
                        className="w-4 h-4 cursor-pointer text-red-700"
                        onClick={() =>
                          handleDeleteClick({
                            addCashId: addCashByDay ? row.day : undefined,
                            purchaseId: purchaseByDay ? row.day : undefined,
                          })
                        }
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <ModalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        hasPurchase={!!selectedIds?.purchaseId}
        hasAddCash={!!selectedIds?.addCashId}
        onPurchaseAction={handlePurchaseAction}
        onAddCashAction={handleAddCashAction}
      />
    </>
  );
}
