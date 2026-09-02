"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not sign in.");
      router.replace("/admin");
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Could not sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-7 space-y-4">
      <div>
        <label htmlFor="admin-password" className="mb-2 block font-display text-sm font-semibold">Password</label>
        <div className="relative">
          <input
            id="admin-password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            autoFocus
            className="min-h-12 w-full rounded-xl border border-black/15 bg-white px-4 pr-20 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <button type="button" onClick={() => setShow((value) => !value)} className="absolute inset-y-0 right-2 min-w-14 cursor-pointer rounded-lg px-2 text-xs font-semibold text-ink/60 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand">
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}
      <button disabled={loading} className="flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-ink px-5 font-display text-sm font-semibold text-white transition hover:bg-brand disabled:cursor-wait disabled:opacity-60">
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
