"use client";

import { useFormContext } from "react-hook-form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type NumericInputProps = {
  fieldName: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

function NumericInput({
  fieldName,
  id,
  placeholder,
  disabled,
  className,
}: NumericInputProps) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Input
                  id={id}
                  value={value ? value : (placeholder ?? "")}
                  disabled={disabled}
                  onClick={() => setOpen(true)}
                  className={cn(
                    "text-center bg-border rounded-md",
                    className,
                    value &&
                      "bg-background border-0 shadow-none font-bold text-blue-600",
                  )}
                />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className={cn("w-64 p-3 grid grid-cols-3 gap-3 bg-border mt-1")}
            >
              {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  className="h-12 text-xl bg-background"
                  onClick={() => onChange((value ?? "") + num)}
                >
                  {num}
                </Button>
              ))}
              <Button
                variant="outline"
                className="h-12 text-xl bg-background"
                onClick={() => {
                  if (!(value ?? "").includes(".")) {
                    onChange("-" + (value ?? ""));
                  }
                }}
              >
                -
              </Button>

              <Button
                variant="outline"
                className="h-12 text-xl bg-background"
                onClick={() => onChange((value ?? "") + "0")}
              >
                0
              </Button>
              <Button
                variant="outline"
                className="h-12 text-xl bg-background"
                onClick={() => {
                  if (!(value ?? "").includes(".")) {
                    onChange((value ?? "") + ".");
                  }
                }}
              >
                .
              </Button>
              <Button
                variant="outline"
                className="h-12 text-xl text-rd bg-background"
                onClick={() => onChange((value ?? "").slice(0, -1))}
              >
                x
              </Button>

              <Button
                variant="outline"
                className="h-12 text-xl col-span-2  bg-background"
                onClick={() => setOpen(false)}
              >
                ok
              </Button>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default NumericInput;
