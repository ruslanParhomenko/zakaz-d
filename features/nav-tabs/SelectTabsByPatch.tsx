import { cn } from "@/lib/utils";

import { PageNavType } from "./NavMenu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SelectTabsByPatch({
  patch,
  setPatch,
  isPending,
  navItems,
}: {
  patch: string;
  setPatch: (value: string) => void;
  isPending: boolean;
  navItems: PageNavType[];
}) {
  return (
    <Tabs value={patch} onValueChange={(value) => setPatch(value)}>
      <TabsList className="flex md:gap-2 h-8">
        {navItems.map((page) => (
          <TabsTrigger
            key={page.title}
            value={page.href}
            disabled={isPending}
            className={cn(
              "w-20 text-white font-bold cursor-pointer p-0",
              isPending && "opacity-50"
            )}
          >
            <span className="truncate block w-full text-sm md:text-md text-bl">
              {page.title}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
