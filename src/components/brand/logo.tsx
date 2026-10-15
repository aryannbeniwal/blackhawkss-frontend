import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import { site } from "@/content/site";

type Props = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
  href?: string | null;
  priority?: boolean;
};

/** The supplied Black Hawk shield logo with an optional two-line wordmark. */
export function Logo({ size = 44, withWordmark = true, className, href = "/", priority }: Props) {
  const inner = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/brand/black-hawk-logo-512.png"
        alt={`${site.name} logo`}
        width={size}
        height={Math.round(size * 1.19)}
        priority={priority}
        className="h-auto shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        style={{ width: size }}
      />
      {withWordmark && (
        <span className="flex flex-col whitespace-nowrap leading-none">
          <span className="font-display text-[1.15rem] font-bold uppercase tracking-[0.08em] text-brand-gold sm:text-xl">
            Black Hawk
          </span>
          <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-foreground/80">
            Security Solution
          </span>
        </span>
      )}
    </span>
  );
  if (!href) return inner;
  return (
    <Link href={href} className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand-gold">
      {inner}
    </Link>
  );
}
