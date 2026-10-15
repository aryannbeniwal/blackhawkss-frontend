"use client";

import { AlertCircle, Inbox, RotateCcw, type LucideIcon } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api/http";

export function EmptyState({ title, description, icon: Icon = Inbox, action, compact = false, className }: { title: string; description?: string; icon?: LucideIcon; action?: React.ReactNode; compact?: boolean; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 text-center", compact ? "py-8" : "py-16", className)}>
      <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground ring-1 ring-border">
        <Icon className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function ErrorState({ error, onRetry, className }: { error: unknown; onRetry?: () => void; className?: string }) {
  const message = error instanceof ApiError ? error.message : "Something went wrong loading this data.";
  const code = error instanceof ApiError ? error.code : null;
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-16 text-center", className)}>
      <span className="flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertCircle className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-medium">Could not load this</p>
        <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
        {code && code !== "INTERNAL_ERROR" && <p className="font-mono text-[11px] text-muted-foreground/60">{code}</p>}
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RotateCcw className="size-3.5" /> Try again
        </Button>
      )}
    </div>
  );
}
