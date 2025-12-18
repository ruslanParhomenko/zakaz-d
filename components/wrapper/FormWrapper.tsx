"use client";

import { SubmitHandler, UseFormReturn } from "react-hook-form";
import DatePickerInput from "../input/DatePickerInput";
import { RefreshCcw } from "lucide-react";
import { Separator } from "../ui/separator";
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
        className="w-full md:w-1/2  px-4  flex flex-col md:mx-auto h-[80vh]"
      >
        <div className="flex w-full items-center justify-end px-4 py-4">
          <DatePickerInput
            fieldName="date"
            className="text-blue-600  text-md"
            disabled={disabledData}
          />

          <RefreshCcw
            className="w-4 h-4 text-blue-700"
            onClick={() => form.resetField("date")}
          />
        </div>
        <Separator className="bg-blue-800  mb-8" />
        {children}
        <SubmitButton isSubmitting={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}
