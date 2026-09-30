import { NavFooter } from "@/features/nav-footer";
import { NavHeader } from "@/features/nav-header";
import { Suspense } from "react";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-dvh flex-col">
      <Suspense fallback={null}>
        <NavHeader />
      </Suspense>
      <main className="flex  flex-1 flex-col overflow-y-auto items-center p-3">
        {children}
      </main>
      <Suspense fallback={null}>
        <NavFooter />
      </Suspense>
    </div>
  );
}
