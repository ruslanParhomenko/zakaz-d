"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Field, FieldLabel, FieldSeparator } from "../ui/field";
import NumericInput from "./NumericInput";
import { Trash2Icon } from "lucide-react";

export default function FieldForm({
  fieldLabel,
  fieldName,
}: {
  fieldLabel: string;
  fieldName: string;
}) {
  const form = useFormContext();
  const value = useWatch({ control: form.control, name: fieldName });
  return (
    <>
      <Field
        orientation="horizontal"
        className="grid grid-cols-[45%_40%_10%] w-full max-w-xl h-8"
      >
        <FieldLabel>{fieldLabel}</FieldLabel>

        <NumericInput fieldName={fieldName} />

        {value && (
          <Trash2Icon
            className="text-red-600 w-4 h-4 cursor-pointer"
            onClick={() => form.resetField(fieldName)}
          />
        )}
      </Field>
      <FieldSeparator />
    </>
  );
}
