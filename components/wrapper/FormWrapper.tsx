"use client";

import { SubmitHandler, UseFormReturn } from "react-hook-form";
import DatePickerInput from "../input/DatePickerInput";
import { Form } from "../ui/form";
import SubmitButton from "../button/SubmitButton";

export default function FormWrapperWithDate({
  onSubmit,
  children,
  form,
  disabledData,
}: {
  children: React.ReactNode;
  onSubmit: SubmitHandler<any>;
  form: UseFormReturn<any>;
  disabledData?: boolean;
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit as SubmitHandler<any>)}
        className="w-full flex flex-col h-full"
      >
        <div className="flex w-full items-center justify-center px-4 py-2">
          <DatePickerInput fieldName="date" disabled={disabledData} />
        </div>

        {children}
        <SubmitButton isSubmitting={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}
