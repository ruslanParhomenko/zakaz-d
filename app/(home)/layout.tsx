import { NavHeaderBar } from "@/features/nav-header-bar";
import { Suspense } from "react";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NavHeaderBar />
      </Suspense>
      {children}
    </>
  );
}
