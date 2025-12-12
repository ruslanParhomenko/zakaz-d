// components/AuthGuard.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  const role = session.user.role;
  if (role !== "ADMIN") redirect("/403");

  return <>{children}</>;
}
