import * as yup from "yup";

export const schemaPurchase = yup.object().shape({
  date: yup.date().required().default(new Date()),

  purchase: yup.number().default(0),
  fuel: yup.number().default(0),
  cleaning: yup.number().default(0),
  payment: yup.number().default(0),
});

export type PurchaseType = yup.InferType<typeof schemaPurchase>;
export const defaultValuesPurchase = schemaPurchase.getDefault();
