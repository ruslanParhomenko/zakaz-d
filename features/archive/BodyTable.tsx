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
  TableFooter,
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
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4 text-left"></TableHead>
            <TableHead className="w-1/4 text-center text-blue-700 border-r">
              приход
            </TableHead>
            <TableHead className="w-1/4 text-center text-red-700">
              расход
            </TableHead>
            <TableHead className="w-1/4 text-center"></TableHead>
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
              <TableRow key={row.day}>
                <TableCell className="w-1/4 text-left py-1">
                  {row.day} - {row.weekday}
                </TableCell>
                <TableCell className="w-1/4 text-center text-blue-700 font-bold border-r py-1">
                  {income || ""}
                </TableCell>
                <TableCell className="w-1/4 text-center text-red-700 font-bold py-1">
                  {expense || ""}
                </TableCell>
                <TableCell className="w-1/4 text-center py-1">
                  <div className="w-full flex flex-row justify-between items-center h-full px-2">
                    <PenBox
                      className="w-5 h-4 cursor-pointer text-blue-800"
                      onClick={() =>
                        handleEditClick({
                          addCashId: addCashByDay ? row.day : undefined,
                          purchaseId: purchaseByDay ? row.day : undefined,
                        })
                      }
                    />

                    <Trash2Icon
                      className="w-5 h-4 cursor-pointer text-red-800"
                      onClick={() =>
                        handleDeleteClick({
                          addCashId: addCashByDay ? row.day : undefined,
                          purchaseId: purchaseByDay ? row.day : undefined,
                        })
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="w-1/4"></TableCell>
            <TableCell className="w-1/4 text-center text-blue-700 font-bold p-1">
              {totalIncome}
            </TableCell>
            <TableCell className="w-1/4 text-center text-red-700 font-bold p-1">
              {totalExpense}
            </TableCell>
            <TableCell className="w-1/4"></TableCell>
          </TableRow>
        </TableFooter>
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
