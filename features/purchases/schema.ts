import { z } from "zod";

export const schemaPurchase = z.object({
  date: z.date({ error: "Обязательное поле" }),

  purchase: z.string(),
  fuel: z.string(),
  cleaning: z.string(),
  payment: z.string(),
  photos: z.any().optional(),
});

export type PurchaseType = z.infer<typeof schemaPurchase>;

export const defaultValuesPurchase: PurchaseType = {
  date: new Date(),
  purchase: "",
  fuel: "",
  cleaning: "",
  payment: "",
  photos: undefined,
};
