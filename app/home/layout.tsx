import AuthGuard from "@/components/wrapper/AuthGuard";
import NavMenuHeader from "@/features/nav-tabs/NavMenu";

const navItems = [
  {
    title: "фото",
    href: "foto",
  },
  {
    title: "архив",
    href: "archive",
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
