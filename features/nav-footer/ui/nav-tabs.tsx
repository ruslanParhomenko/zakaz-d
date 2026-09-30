"use client";
import TabsOptions from "@/components/ui/tabs-options";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ROUTE_PATCH_TABS } from "@/constants/routes-patch";
import { useSession } from "next-auth/react";

export default function NavTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data } = useSession();
  const isAdmin = data?.user.role === "ADMIN";
  const [isPending, startTransition] = useTransition();

  const mainRoute = pathname?.split("/").pop();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    startTransition(() => {
      router.replace(`${value}?${params.toString()}`);
    });
  };

  if (!isAdmin) return null;

  return (
    <TabsOptions
      value={mainRoute || ""}
      setValue={handleTabChange}
      isPending={isPending}
      options={ROUTE_PATCH_TABS}
    />
  );
}
