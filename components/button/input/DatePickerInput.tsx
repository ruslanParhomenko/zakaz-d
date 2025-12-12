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

function DatePickerInput({
  fieldName,
  className,
  id,
}: {
  fieldName: string;
  className?: string;
  id?: string;
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    id={id}
                    variant={"outline"}
                    className={cn(
                      "justify-end bg-gray-100 border-0 text-blue-700 rounded-md hover:bg-gray-700 text-md h-12",
                      className
                    )}
                  >
                    {field.value &&
                      field.value?.getDate() +
                        "." +
                        (Number(field.value?.getMonth()) + 1) +
                        "." +
                        field.value?.getFullYear()}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="center">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
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
