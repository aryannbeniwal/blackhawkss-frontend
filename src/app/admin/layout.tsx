import type { Metadata } from "next";
import { Suspense } from "react";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Black Hawk Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="theme-dark min-h-svh bg-background text-foreground">
        <Suspense fallback={null}>{children}</Suspense>
      </div>
    </QueryProvider>
  );
}
