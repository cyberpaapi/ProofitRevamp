import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getAdminStore, getEnquiries, listPublicImages } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const [store, enquiries, images] = await Promise.all([getAdminStore(), getEnquiries(), listPublicImages()]);
  return <AdminDashboard initialStore={store} initialEnquiries={enquiries} initialImages={images} />;
}
