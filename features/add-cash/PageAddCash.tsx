"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddCashType, defaultValuesAddCash, schemaAddCash } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  AddCashTypeData,
  createAddCashByDay,
} from "@/app/actions/add-cash/addCashAction";

import { useEffect } from "react";

import FormWrapperWithDate from "@/components/wrapper/FormWrapper";
import FieldForm from "@/components/input/FieldForm";
import { FieldSet } from "@/components/ui/field";

export default function PageAddCash({
  data,
  day,
  month,
  year,
}: {
  data?: AddCashTypeData["days"][number];
  day?: number;
  month: number;
  year: number;
}) {
  const form = useForm<AddCashType>({
    resolver: yupResolver(schemaAddCash),
    defaultValues: defaultValuesAddCash,
  });

  const onSubmit: SubmitHandler<AddCashType> = async (data) => {
    try {
      await createAddCashByDay({
        day: data.date.getDate(),
        month: data.date.getMonth() + 1,
        year: data.date.getFullYear(),
        addCash: data.addCash,
      });
      toast.success("Данные сохранены");
    } catch (error) {
      toast.error("Не удалось сохранить данные. Повторите попытку.");
    }
  };

  useEffect(() => {
    if (!data || !day || !month || !year) return;

    form.reset({
      date: new Date(year, month - 1, day),
      addCash: data.addCash,
    });
  }, [data, day, month, year]);
  return (
    <FormWrapperWithDate onSubmit={onSubmit} form={form} disabledData={!!data}>
      <FieldSet className="flex flex-1 items-center justify-center pb-20">
        <FieldForm fieldLabel="поступление" fieldName="addCash" />
      </FieldSet>
    </FormWrapperWithDate>
  );
}
