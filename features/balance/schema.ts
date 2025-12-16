import * as yup from "yup";

export const schemaBalance = yup.object().shape({
  month: yup.number().required(),
  year: yup.number().required(),

  initialBalance: yup.string().required().default(""),
});

export type BalanceType = yup.InferType<typeof schemaBalance>;
export const defaultValuesBalance = schemaBalance.getDefault();
