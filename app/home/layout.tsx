import AuthGuard from "@/components/wrapper/AuthGuard";
import NavMenuHeader from "@/features/nav-tabs/NavMenu";

const navItems = [
  {
    title: "архив",
    href: "archive",
  },
  {
    title: "форма",
    href: "form",
  },
];

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <NavMenuHeader navItems={navItems} mainRoute="home" />
      {children}
    </AuthGuard>
  );
}
