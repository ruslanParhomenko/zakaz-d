import { z } from "zod";

export const schemaAddCash = z.object({
  date: z.date({ error: "Обязательное поле" }),
  addCash: z.string().min(1, "Обязательное поле"),
});

export type AddCashType = z.infer<typeof schemaAddCash>;

export const defaultValuesAddCash: AddCashType = {
  date: new Date(),
  addCash: "",
};
