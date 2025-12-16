import * as yup from "yup";

export const schemaPurchase = yup.object().shape({
  date: yup.date().required().default(new Date()),

  purchase: yup.string().default(""),
  fuel: yup.string().default(""),
  cleaning: yup.string().default(""),
  payment: yup.string().default(""),
});

export type PurchaseType = yup.InferType<typeof schemaPurchase>;
export const defaultValuesPurchase = schemaPurchase.getDefault();
