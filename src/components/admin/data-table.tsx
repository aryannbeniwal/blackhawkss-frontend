"use client";

import { cn } from "cn";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState, ErrorState } from "@/components/admin/states";

export type Column<T> = {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
  /** hide below md */
  hideOnMobile?: boolean;
};

/** Simple generic table with loading skeleton, error and empty states. */
export function DataTable<T>({ columns, rows, rowKey, loading, error, onRetry, onRowClick, emptyTitle = "Nothing here yet", emptyDescription, className }: { columns: Column<T>[]; rows: T[] | undefined; rowKey: (row: T) => string | number; loading?: boolean; error?: unknown; onRetry?: () => void; onRowClick?: (row: T) => void; emptyTitle?: string; emptyDescription?: string; className?: string }) {
  if (error) return <ErrorState error={error} onRetry={onRetry} />;
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-border bg-card", className)}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((c) => (
              <TableHead key={c.key} className={cn("text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground", c.hideOnMobile && "hidden md:table-cell", c.className)}>
                {c.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={`s-${i}`}>
                {columns.map((c) => (
                  <TableCell key={c.key} className={cn(c.hideOnMobile && "hidden md:table-cell")}>
                    <Skeleton className="h-4 w-full max-w-32" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!loading && rows && rows.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length}>
                <EmptyState title={emptyTitle} description={emptyDescription} compact />
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            rows?.map((row) => (
              <TableRow
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(onRowClick && "cursor-pointer")}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={onRowClick ? (e) => e.key === "Enter" && onRowClick(row) : undefined}
              >
                {columns.map((c) => (
                  <TableCell key={c.key} className={cn("align-middle", c.hideOnMobile && "hidden md:table-cell", c.className)}>
                    {c.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
