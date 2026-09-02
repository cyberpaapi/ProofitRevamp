import { redirect } from "next/navigation";
import Image from "next/image";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");
  return (
    <div className="min-h-dvh bg-[#111214] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-md items-center">
        <section className="w-full overflow-hidden rounded-[28px] border border-white/10 bg-white text-ink shadow-[0_30px_90px_rgba(0,0,0,.35)]">
          <div className="border-b border-black/10 bg-[#f6f2ec] px-7 py-6">
            <Image src="/images/logo.svg" alt="Proofit" width={647} height={218} className="h-auto w-40" priority />
          </div>
          <div className="p-7 sm:p-9">
            <p className="font-display text-xs font-semibold uppercase tracking-[.18em] text-brand">Private workspace</p>
            <h1 className="mt-3 font-display text-3xl font-semibold">Admin sign in</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">Enter the administrator password to manage Proofit content and operations.</p>
            <AdminLoginForm />
            {process.env.NODE_ENV !== "production" && !process.env.ADMIN_PASSWORD && (
              <p className="mt-5 rounded-xl border border-brand/20 bg-brand/[.07] p-3 text-xs leading-relaxed text-ink/70">
                Local default password: <strong className="text-ink">proofit-admin</strong>
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
