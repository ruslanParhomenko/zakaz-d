"use client";
import DatePickerInput from "@/components/button/input/DatePickerInput";
import NumericInput from "@/components/button/input/NumericInput";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";

export default function PageForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form>
        <div className="w-full  px-2 pt-12 flex flex-col h-[80vh]">
          <FieldSet className="flex-1">
            <FieldGroup>
              <Field>
                <Label className="text-blue-700">дата</Label>
                <DatePickerInput fieldName="date" />
              </Field>

              <Field>
                <Label className="text-blue-700">рынок</Label>
                <NumericInput fieldName="cash" />
              </Field>
              <Field>
                <FieldLabel className="text-blue-700">чек</FieldLabel>
                <NumericInput fieldName="card" />
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="mt-0 py-2 flex items-center justify-end gap-6">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" variant={"default"}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
