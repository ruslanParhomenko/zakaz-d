import { NavHeaderBar } from "@/features/nav-header-bar";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavHeaderBar />
      {children}
    </>
  );
}
