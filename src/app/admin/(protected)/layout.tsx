import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-4 lg:p-0 pt-20 lg:pt-0">{children}</main>
    </div>
  );
}
