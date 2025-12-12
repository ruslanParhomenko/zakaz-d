"use client";
import NumericInput from "@/components/button/input/NumericInput";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

export default function PageForm() {
  const form = useForm();
  return (
    <div className="w-full max-w-md p-4">
      <Form {...form}>
        <form>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    рынок
                  </FieldLabel>
                  <NumericInput
                    fieldName="cash"
                    id="checkout-7j9-card-name-43j"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                    чек
                  </FieldLabel>
                  <NumericInput
                    fieldName="card"
                    id="checkout-7j9-card-number-uw1"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />

            <Field orientation="horizontal">
              <Button type="submit">Submit</Button>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Form>
    </div>
  );
}
