"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pagination({ page, totalPages, totalElements, onChange }: { page: number; totalPages: number; totalElements: number; onChange: (page: number) => void }) {
  if (totalPages <= 1 && totalElements <= 0) return null;
  return (
    <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
      <p>
        {totalElements} result{totalElements === 1 ? "" : "s"} · page {page + 1} of {Math.max(totalPages, 1)}
      </p>
      <div className="flex gap-1">
        <Button variant="outline" size="icon-sm" aria-label="Previous page" disabled={page <= 0} onClick={() => onChange(page - 1)}>
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next page" disabled={page + 1 >= totalPages} onClick={() => onChange(page + 1)}>
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
