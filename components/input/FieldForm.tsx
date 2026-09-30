import { ReactNode } from "react";
import { Field, FieldSeparator } from "../ui/field";
import NumericInput from "./NumericInput";

export default function FieldForm({
  icon,
  label,
  fieldName,
}: {
  icon: ReactNode;
  label: string;
  fieldName: string;
}) {
  return (
    <>
      <Field
        orientation="horizontal"
        className="flex flex-row items-center justify-between px-3"
      >
        <span
          title={label}
          aria-label={label}
          className="shrink-0 text-blue-700"
        >
          {icon}
        </span>
        <NumericInput fieldName={fieldName} className="w-64" />
      </Field>
      <FieldSeparator />
    </>
  );
}
