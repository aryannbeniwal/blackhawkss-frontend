"use client";

import { Loader2, LockKeyhole } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/api/endpoints/auth";
import { ApiError } from "@/lib/api/http";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      await authApi.login(email.trim(), password);
      const next = params.get("next");
      router.replace(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not sign in");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@blackhawkss.in" />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
      </FieldGroup>
      <Button type="submit" size="lg" disabled={pending} className="w-full bg-brand-red font-semibold uppercase tracking-wider text-white hover:bg-brand-red-deep">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <LockKeyhole className="size-4" />}
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-brand-black bg-brick p-6">
      <div className="bg-red-glow absolute inset-0" aria-hidden />
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-2xl shadow-black/60">
        <Logo size={48} href="/" />
        <h1 className="mt-6 font-display text-2xl font-semibold uppercase tracking-wide">Owner panel</h1>
        <p className="mt-1 text-sm text-muted-foreground">Restricted to Black Hawk Security Solution partners.</p>
        <div className="mt-6">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
