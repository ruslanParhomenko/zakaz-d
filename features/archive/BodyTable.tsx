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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMonthDays } from "@/lib/utils";
import { PenBox, Trash2Icon } from "lucide-react";
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

  type DialogMode = "edit" | "delete";

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>("edit");

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

    if (dialogMode === "edit") {
      router.push(
        `/purchases/${selectedIds.purchaseId}?month=${month}&year=${year}`
      );
    } else {
      deletePurchaseByDay({
        day: selectedIds.purchaseId,
        month,
        year,
      });
    }

    closeDialog();
  };

  const handleAddCashAction = () => {
    if (!selectedIds?.addCashId) return;

    if (dialogMode === "edit") {
      router.push(
        `/add-cash/${selectedIds.addCashId}?month=${month}&year=${year}`
      );
    } else {
      deleteAddCashByDay({
        day: selectedIds.addCashId,
        month,
        year,
      });
    }

    closeDialog();
  };

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
      router.push(`/add-cash/${addCashId}?month=${month}&year=${year}`);
      return;
    }

    if (purchaseId) {
      router.push(`/purchases/${purchaseId}?month=${month}&year=${year}`);
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

  const { totalIncome, totalExpense } = calculateBalance(
    dataPurchases,
    dataAddCash
  );
  return (
    <>
      <Table className="table-fixed w-full border-collapse">
        <TableHeader>
          <TableRow className="border-b border-black">
            <TableHead className="w-1/4 text-center text-blue-800">
              {" "}
              {totalIncome}{" "}
            </TableHead>
            <TableHead className="w-1/4 text-center text-blue-700">
              {" "}
              приход{" "}
            </TableHead>
            <TableHead className="w-1/4 text-center text-red-700">
              {" "}
              расход{" "}
            </TableHead>
            <TableHead className="w-1/4 text-center text-red-800">
              {" "}
              {totalExpense}{" "}
            </TableHead>
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
              <TableRow key={row.day} className="cursor-pointer border-b">
                <TableCell className="w-1/4 text-left py-1">
                  {String(row.day).padStart(2, "0")} - {row.weekday}
                </TableCell>

                <TableCell className="w-1/4 text-center text-blue-700">
                  {income || ""}
                </TableCell>
                <TableCell className="w-1/4 text-center text-red-700">
                  {expense || ""}
                </TableCell>
                <TableCell className="w-1/4 text-center py-1">
                  <div className="w-full flex flex-row justify-end items-center h-full px-2 gap-8">
                    <PenBox
                      className="w-5 h-4 cursor-pointer"
                      onClick={() =>
                        handleEditClick({
                          addCashId: addCashByDay ? row.day : undefined,
                          purchaseId: purchaseByDay ? row.day : undefined,
                        })
                      }
                    />
                    {isAdmin && (
                      <Trash2Icon
                        className="w-5 h-4 cursor-pointer"
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
        mode={dialogMode}
        hasPurchase={!!selectedIds?.purchaseId}
        hasAddCash={!!selectedIds?.addCashId}
        onPurchaseAction={handlePurchaseAction}
        onAddCashAction={handleAddCashAction}
      />
    </>
  );
}
