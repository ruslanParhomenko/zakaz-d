"use client";
import FormWrapperWithDate from "@/components/wrapper/FormWrapper";
import FieldForm from "@/components/input/FieldForm";
import { FieldSet } from "@/components/ui/field";
import { Coins } from "lucide-react";
import { GetAddCashByMonthYearType } from "../model/type";
import { useAddCashForm } from "../hooks/use-add-cash-form";

export function AddCashForm({
  data,
  day,
  month,
  year,
}: {
  data?: GetAddCashByMonthYearType["days"][number];
  day?: number;
  month: number;
  year: number;
}) {
  const valuesByData =
    data && day
      ? { date: new Date(year, month - 1, day), addCash: data.addCash }
      : undefined;

  const { form, onSubmit } = useAddCashForm({ valuesByData });

  return (
    <FormWrapperWithDate onSubmit={onSubmit} form={form} disabledData={!!data}>
      <FieldSet className="flex flex-1 items-center justify-center pb-20">
        <FieldForm
          icon={<Coins className="w-5 h-5" />}
          label="Деньги"
          fieldName="addCash"
        />
      </FieldSet>
    </FormWrapperWithDate>
  );
}
