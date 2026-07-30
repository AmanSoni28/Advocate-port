import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/dal";
import AdminShell from "@/components/Admin/AdminShell";

export default async function AdminDashboardLayout({ children }) {
  const session = await verifySession();

  if (!session.isAuth) {
    redirect("/admin/login");
  }

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
