"use client";
import DatePickerInput from "@/components/input/DatePickerInput";
import NumericInput from "@/components/input/NumericInput";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { RefreshCcw, Trash2Icon } from "lucide-react";

import { FieldPath, SubmitHandler, useForm, useWatch } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  createPurchaseByDay,
  PurchasesTypeData,
} from "@/app/actions/purchases/purchasesAction";
import { toast } from "sonner";
import { defaultValuesPurchase, PurchaseType, schemaPurchase } from "./schema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

export default function PagePurchases({
  data,
  day,
  month,
  year,
}: {
  data?: PurchasesTypeData["days"][number];
  day?: number;
  month: number;
  year: number;
}) {
  const router = useRouter();

  const form = useForm<PurchaseType>({
    resolver: yupResolver(schemaPurchase),
    defaultValues: defaultValuesPurchase,
  });

  const purchase = useWatch({ control: form.control, name: "purchase" });
  const fuel = useWatch({ control: form.control, name: "fuel" });
  const cleaning = useWatch({ control: form.control, name: "cleaning" });
  const payment = useWatch({ control: form.control, name: "payment" });
  const total = +purchase + +fuel + +cleaning + +payment;

  const resetField = (nameField: FieldPath<PurchaseType>) => {
    form.resetField(nameField);
  };

  const onSubmit: SubmitHandler<PurchaseType> = async (data) => {
    try {
      await createPurchaseByDay({
        day: data.date.getDate(),
        month: data.date.getMonth() + 1,
        year: data.date.getFullYear(),
        purchase: data.purchase,
        fuel: data.fuel,
        cleaning: data.cleaning,
        payment: data.payment,
      });
      toast.success("Данные сохранены");
      router.push(`/home/archive?month=${month}&year=${year}`);
    } catch (error) {
      toast.error("Не удалось сохранить данные. Повторите попытку.");
    }
  };

  const classNameDate = "text-blue-600  text-md";
  const classNameField = "grid grid-cols-[45%_40%_10%]";
  const classNameIcon = "text-red-600 w-4 h-4";
  const classNameInput = "text-md w-30";

  useEffect(() => {
    if (!data || !day || !month || !year) return;

    form.reset({
      date: new Date(year, month - 1, day),
      purchase: data.purchase,
      fuel: data.fuel,
      cleaning: data.cleaning,
      payment: data.payment,
    });
  }, [data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full md:w-1/2  px-4  flex flex-col md:mx-auto h-[80vh]">
          <Label>
            <span className="mr-4">всего:</span>
            {total}
          </Label>
          <div className="flex-1 flex items-center">
            <FieldSet className="w-full">
              <FieldGroup>
                <Field orientation="horizontal" className={classNameField}>
                  <FieldLabel className={classNameDate}>дата</FieldLabel>
                  <DatePickerInput
                    fieldName="date"
                    className={classNameDate}
                    disabled={!!data}
                  />

                  <RefreshCcw
                    className="w-4 h-4 text-blue-700"
                    onClick={() => resetField("date")}
                  />
                </Field>

                <Separator className="bg-blue-800  mb-8" />

                <Field orientation="horizontal" className={classNameField}>
                  <FieldLabel className={classNameInput}>закупка</FieldLabel>
                  <NumericInput
                    fieldName="purchase"
                    className={classNameInput}
                  />
                  {purchase && (
                    <Trash2Icon
                      className={classNameIcon}
                      onClick={() => resetField("purchase")}
                    />
                  )}
                </Field>

                <FieldSeparator />

                <Field orientation="horizontal" className={classNameField}>
                  <FieldLabel className={classNameInput}>топливо</FieldLabel>
                  <NumericInput fieldName="fuel" className={classNameInput} />
                  {fuel && (
                    <Trash2Icon
                      className={classNameIcon}
                      onClick={() => resetField("fuel")}
                    />
                  )}
                </Field>

                <FieldSeparator />

                <Field orientation="horizontal" className={classNameField}>
                  <FieldLabel className={classNameInput}>химчистка</FieldLabel>
                  <NumericInput
                    fieldName="cleaning"
                    className={classNameInput}
                  />
                  {cleaning && (
                    <Trash2Icon
                      className={classNameIcon}
                      onClick={() => resetField("cleaning")}
                    />
                  )}
                </Field>

                <FieldSeparator />

                <Field orientation="horizontal" className={classNameField}>
                  <FieldLabel className={classNameInput}>
                    оплата по счету
                  </FieldLabel>
                  <NumericInput
                    fieldName="payment"
                    className={classNameInput}
                  />
                  {payment && (
                    <Trash2Icon
                      className={classNameIcon}
                      onClick={() => resetField("payment")}
                    />
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>

          <div className="mt-0 py-2 flex items-center justify-end gap-6">
            {data && (
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Выйти
              </Button>
            )}
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
