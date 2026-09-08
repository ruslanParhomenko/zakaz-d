import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function TabsOptions({
  value,
  setValue,
  isPending,
  options,
  className,
}: {
  value: string;
  setValue: (value: string) => void;
  isPending: boolean;
  options: string[];
  className?: string;
}) {
  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList
        className={cn(
          "flex h-7!  gap-4 items-center justify-center",
          className,
        )}
      >
        {options.map((item, idx) => {
          const isSelected = item === value;
          return (
            <TabsTrigger
              key={`${item}-${idx}`}
              value={item}
              disabled={isPending}
              className={cn(
                "w-18 cursor-pointer hover:text-green-600 md:w-24 h-6 border-0! border-b shadow-none",
                isPending && "opacity-50",
                isSelected && "font-bold text-green-600!",
              )}
            >
              <span className="md:text-md block w-full truncate text-xs tracking-widest">
                {item}
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
