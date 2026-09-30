import { z } from "zod";

export const schemaBalance = z.object({
  date: z.date({ error: "Обязательное поле" }),
  initialBalance: z.string().min(1, "Обязательное поле"),
});

export type BalanceType = z.infer<typeof schemaBalance>;

export const defaultValuesBalance: BalanceType = {
  date: new Date(),
  initialBalance: "",
};
