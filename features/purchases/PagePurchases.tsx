"use client";
import DatePickerInput from "@/components/button/input/DatePickerInput";
import NumericInput from "@/components/button/input/NumericInput";
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

import { FieldPath, SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { createPurchaseByDay } from "@/app/actions/purchases/purchasesAction";
import { toast } from "sonner";
import { defaultValuesPurchase, PurchaseType, schemaPurchase } from "./schema";

export default function PagePurchases() {
  const form = useForm<PurchaseType>({
    resolver: yupResolver(schemaPurchase),
    defaultValues: defaultValuesPurchase,
  });

  const value = form.watch();

  const resetField = (nameField: FieldPath<PurchaseType>) => {
    form.resetField(nameField);
  };

  const onSubmit: SubmitHandler<PurchaseType> = async (data) => {
    try {
      await createPurchaseByDay(data);
      toast.success("Данные сохранены");
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
      toast.error("Не удалось сохранить данные. Повторите попытку.");
    }
  };

  const classNameDate = "text-blue-600  text-md";
  const classNameField = "grid grid-cols-[45%_40%_10%]";
  const classNameIcon = "text-red-600 w-4 h-4";
  const classNameInput = "text-md w-30";
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full md:w-1/2  px-4 pt-12 flex flex-col md:mx-auto h-[85vh]">
          <div className="flex-1 flex items-center">
            <FieldSet className="w-full">
              <FieldGroup>
                <Field orientation="horizontal" className={classNameField}>
                  <FieldLabel className={classNameDate}>дата</FieldLabel>
                  <DatePickerInput fieldName="date" className={classNameDate} />

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
                  {value.purchase > 0 && (
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
                  {value.fuel > 0 && (
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
                  {value.cleaning > 0 && (
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
                  {value.payment > 0 && (
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
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" variant={"default"}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
