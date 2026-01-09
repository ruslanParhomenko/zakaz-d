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

type ModalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hasPurchase: boolean;
  hasAddCash: boolean;
  onPurchaseAction: () => void;
  onAddCashAction: () => void;
};

export default function ModalDialog({
  open,
  onOpenChange,
  hasPurchase,
  hasAddCash,
  onPurchaseAction,
  onAddCashAction,
}: ModalDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>"Что вы хотите удалить?"</AlertDialogTitle>
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
