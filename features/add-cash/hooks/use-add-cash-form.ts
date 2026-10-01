import { SubmitHandler, useForm } from "react-hook-form";
import {
  AddCashType,
  defaultValuesAddCash,
  schemaAddCash,
} from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveAddCashByDay } from "../actions/save-add-cash";
import { toast } from "sonner";

export function useAddCashForm({
  valuesByData,
}: {
  valuesByData: AddCashType | undefined;
}) {
  const form = useForm<AddCashType>({
    resolver: zodResolver(schemaAddCash),
    defaultValues: defaultValuesAddCash,
    values: valuesByData,
  });

  const onSubmit: SubmitHandler<AddCashType> = async (values) => {
    const valuesDate = values.date;
    const day = valuesDate.getDate();
    const month = valuesDate.getMonth() + 1;
    const year = valuesDate.getFullYear();
    const stringDate = day + "." + month + "." + year;
    try {
      await saveAddCashByDay({
        day: day,
        month: month,
        year: year,
        addCash: values.addCash,
      });
      toast.success("Данные сохранены", {
        description: stringDate + " = " + values.addCash,
      });
    } catch (error) {
      toast.error("Не удалось сохранить данные. Повторите попытку.");
    }

    form.reset();
  };

  return {
    form,
    onSubmit,
  };
}
