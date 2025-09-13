'use client';

import Link from "next/link";
import { AuthProvider } from "@/hooks/useAuth";
import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Logo />
              <span className="sr-only">Maison Éclat</span>
            </Link>
            <Link
              href="/admin"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Products
            </Link>
          </nav>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}