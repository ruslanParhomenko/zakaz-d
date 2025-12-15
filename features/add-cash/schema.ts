import * as yup from "yup";

export const schemaAddCash = yup.object().shape({
  date: yup.date().required().default(new Date()),

  addCash: yup.number().required().default(0),
});

export type AddCashType = yup.InferType<typeof schemaAddCash>;
export const defaultValuesAddCash = schemaAddCash.getDefault();
