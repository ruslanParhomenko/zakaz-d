"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { BalanceType, defaultValuesBalance, schemaBalance } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldSet } from "@/components/ui/field";

import { useEffect } from "react";
import { createBalanceByMonth } from "@/app/actions/balance/balanceAction";
import { toast } from "sonner";
import FormWrapperWithDate from "@/components/wrapper/FormWrapper";
import FieldForm from "@/components/input/FieldForm";

export default function PageBalance({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  const form = useForm<BalanceType>({
    resolver: yupResolver(schemaBalance),
    defaultValues: defaultValuesBalance,
  });
  const onSubmit: SubmitHandler<BalanceType> = async (data) => {
    try {
      await createBalanceByMonth({
        month: data.date.getMonth() + 1,
        year: data.date.getFullYear(),
        initialBalance: data.initialBalance,
      });
      toast.success("Данные сохранены");
    } catch (error) {
      toast.error("Не удалось сохранить данные. Повторите попытку.");
    }
  };

  useEffect(() => {
    if (!month || !year) return;

    form.reset({
      date: new Date(year, month - 1, 1),
      initialBalance: "",
    });
  }, [month, year]);
  return (
    <FormWrapperWithDate onSubmit={onSubmit} form={form} disabledData={true}>
      <FieldSet className="flex flex-1 items-center justify-center">
        <FieldForm fieldLabel="баланс" fieldName="initialBalance" />
      </FieldSet>
    </FormWrapperWithDate>
  );
}
