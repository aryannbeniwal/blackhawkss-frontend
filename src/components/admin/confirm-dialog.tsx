"use client";

import { AlertTriangle, Info, Loader2 } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel = "Confirm", destructive = false, pending = false, onConfirm, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; description: React.ReactNode; confirmLabel?: string; destructive?: boolean; pending?: boolean; onConfirm: () => void; children?: React.ReactNode }) {
  const Icon = destructive ? AlertTriangle : Info;
  return (
    <Dialog open={open} onOpenChange={(next) => !pending && onOpenChange(next)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex-row items-start gap-3 text-left">
          <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", destructive ? "bg-destructive/10 text-destructive" : "bg-brand-gold/15 text-brand-gold")}>
            <Icon className="size-5" />
          </span>
          <div className="space-y-1">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="leading-relaxed">{description}</DialogDescription>
          </div>
        </DialogHeader>
        {children && <div>{children}</div>}
        <DialogFooter>
          <Button variant="outline" disabled={pending} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={pending} onClick={onConfirm} className={cn(destructive ? "bg-brand-red text-white hover:bg-brand-red-deep" : "bg-brand-gold text-brand-black hover:bg-brand-gold-soft")}>
            {pending && <Loader2 className="size-4 animate-spin" />}
            {pending ? "Working…" : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
