"use client";

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ApiError } from "@/lib/api/http";

function redirectToLogin(): void {
  if (window.location.pathname !== "/admin/login") {
    const next = window.location.pathname + window.location.search;
    // Full navigation on purpose: drops all in-memory query state after a session expiry.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = `/admin/login?next=${encodeURIComponent(next)}`;
  }
}

function isAuthFailure(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: (failureCount, error) => error instanceof ApiError && error.status >= 500 && failureCount < 2,
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            if (isAuthFailure(error)) redirectToLogin();
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            if (isAuthFailure(error)) {
              redirectToLogin();
              return;
            }
            if (mutation.meta?.suppressGlobalError) return;
            toast.error(error instanceof ApiError ? error.message : "Something went wrong");
          },
        }),
      }),
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
