import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proofit Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
