import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

function DatePickerInput({
  fieldName,
  className,
  id,
  disabled = false,
}: {
  fieldName: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    disabled={disabled}
                    id={id}
                    variant={"outline"}
                    className={cn(
                      "rounded-md bg-border",
                      className,
                      field.value &&
                        "bg-background border-0 shadow-none font-bold tracking-wider",
                    )}
                  >
                    {field.value &&
                      field.value?.getDate() +
                        "." +
                        " " +
                        (Number(field.value?.getMonth()) + 1) +
                        "." +
                        " " +
                        field.value?.getFullYear()}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="center" className="w-65 p-1">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                  weekStartsOn={1}
                  id={id}
                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
export default DatePickerInput;
