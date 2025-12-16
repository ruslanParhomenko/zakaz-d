"use client";
import { FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { BalanceType, defaultValuesBalance, schemaBalance } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import NumericInput from "@/components/input/NumericInput";
import { Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { createBalanceByMonth } from "@/app/actions/balance/balanceAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PageBalance({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  const router = useRouter();
  const form = useForm<BalanceType>({
    resolver: yupResolver(schemaBalance),
    defaultValues: defaultValuesBalance,
  });
  const value = form.watch();

  const resetField = (nameField: FieldPath<BalanceType>) => {
    form.resetField(nameField);
  };

  const onSubmit: SubmitHandler<BalanceType> = async (data) => {
    try {
      await createBalanceByMonth(data);
      toast.success("Данные сохранены");
    } catch (error) {
      toast.error("Не удалось сохранить данные. Повторите попытку.");
    }
    router.back();
  };

  const classNameDate = "text-blue-600  text-md border-0 shadow-none";
  const classNameField = "grid grid-cols-[45%_40%_10%]";
  const classNameIcon = "text-red-600 w-4 h-4";
  const classNameInput = "text-md w-30";
  useEffect(() => {
    if (!month || !year) return;
    form.setValue("month", month);
    form.setValue("year", year);
  }, [month, year]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full md:w-1/2  px-4 pt-12 flex flex-col md:mx-auto h-[85vh]">
          <div className="flex-1 flex items-center">
            <FieldSet className="w-full">
              <FieldGroup>
                <Field orientation="horizontal" className={classNameField}>
                  <Input
                    {...form.register("month")}
                    className={classNameDate}
                    readOnly
                  />
                  <Input
                    {...form.register("year")}
                    className={classNameDate}
                    readOnly
                  />
                </Field>
                <Separator className="bg-blue-800  mb-8" />

                <Field orientation="horizontal" className={classNameField}>
                  <FieldLabel className={classNameInput}>баланс</FieldLabel>
                  <NumericInput
                    fieldName="initialBalance"
                    className={classNameInput}
                  />
                  {value.initialBalance && (
                    <Trash2Icon
                      className={classNameIcon}
                      onClick={() => resetField("initialBalance")}
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
