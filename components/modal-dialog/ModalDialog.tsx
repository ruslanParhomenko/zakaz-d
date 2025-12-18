// components/modal-dialog/ModalDialog.tsx
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type DialogMode = "edit" | "delete";

type ModalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: DialogMode;
  hasPurchase: boolean;
  hasAddCash: boolean;
  onPurchaseAction: () => void;
  onAddCashAction: () => void;
};

export default function ModalDialog({
  open,
  onOpenChange,
  mode,
  hasPurchase,
  hasAddCash,
  onPurchaseAction,
  onAddCashAction,
}: ModalDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {mode === "edit"
              ? "Что вы хотите открыть?"
              : "Что вы хотите удалить?"}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>

          {hasPurchase && (
            <AlertDialogAction onClick={onPurchaseAction}>
              Расход
            </AlertDialogAction>
          )}

          {hasAddCash && (
            <AlertDialogAction onClick={onAddCashAction}>
              Поступление
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
