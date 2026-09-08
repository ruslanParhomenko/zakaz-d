"use client";
import TabsOptions from "@/components/ui/tabs-options";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ROUTE_PATCH_TABS } from "@/constants/routes-patch";

export default function TabsRoutes() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const mainRoute = pathname?.split("/").pop();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    startTransition(() => {
      router.replace(`${value}?${params.toString()}`);
    });
  };

  return (
    <div>
      <TabsOptions
        value={mainRoute || ""}
        setValue={handleTabChange}
        isPending={isPending}
        options={ROUTE_PATCH_TABS.map((item) => item.href)}
      />
    </div>
  );
}
