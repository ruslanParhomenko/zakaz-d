"use client";
import { FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { AddCashType, defaultValuesAddCash, schemaAddCash } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { createAddCashByDay } from "@/app/actions/add-cash/addCashAction";
import { Form } from "@/components/ui/form";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import DatePickerInput from "@/components/button/input/DatePickerInput";
import { RefreshCcw, Trash2Icon } from "lucide-react";
import NumericInput from "@/components/button/input/NumericInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PageAddCash() {
  const form = useForm<AddCashType>({
    resolver: yupResolver(schemaAddCash),
    defaultValues: defaultValuesAddCash,
  });

  const value = form.watch();

  const resetField = (nameField: FieldPath<AddCashType>) => {
    form.resetField(nameField);
  };

  const onSubmit: SubmitHandler<AddCashType> = async (data) => {
    try {
      await createAddCashByDay(data);
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
                  <FieldLabel className={classNameInput}>
                    поступление
                  </FieldLabel>
                  <NumericInput
                    fieldName="addCash"
                    className={classNameInput}
                  />
                  {value.addCash > 0 && (
                    <Trash2Icon
                      className={classNameIcon}
                      onClick={() => resetField("addCash")}
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
