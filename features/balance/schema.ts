import * as yup from "yup";

export const schemaBalance = yup.object().shape({
  date: yup.date().required().default(new Date()),

  initialBalance: yup.string().required().default(""),
});

export type BalanceType = yup.InferType<typeof schemaBalance>;
export const defaultValuesBalance = schemaBalance.getDefault();
