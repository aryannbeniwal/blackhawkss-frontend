import { cn } from "cn";
import type { CitySlug } from "@/content/types";

/**
 * Schematic (not to scale) map of the Haryana + Delhi NCR service area.
 * Points are relative positions, enough to show coverage and highlight a city.
 */
const points: { slug: CitySlug | "office"; name: string; x: number; y: number }[] = [
  { slug: "kurukshetra", name: "Kurukshetra", x: 46, y: 12 },
  { slug: "karnal", name: "Karnal", x: 52, y: 26 },
  { slug: "panipat", name: "Panipat", x: 55, y: 40 },
  { slug: "office", name: "Samalkha (office)", x: 59, y: 47 },
  { slug: "sonipat", name: "Sonipat", x: 60, y: 60 },
  { slug: "delhi", name: "Delhi", x: 66, y: 74 },
  { slug: "noida", name: "Noida", x: 80, y: 78 },
  { slug: "gurugram", name: "Gurugram", x: 58, y: 86 },
  { slug: "faridabad", name: "Faridabad", x: 73, y: 90 },
];

export function ServiceAreaMap({ highlight, className }: { highlight?: CitySlug; className?: string }) {
  return (
    <figure className={cn("relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-brand-charcoal bg-brick", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="glow" cx="59" cy="47" r="40" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#e02020" stopOpacity="0.35" />
            <stop offset="1" stopColor="#e02020" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#glow)" />
        {/* GT Road spine */}
        <path d="M44 6 C 50 22, 56 34, 59 47 S 64 68, 68 76" fill="none" stroke="#f5b400" strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="2 1.5" />
        <path d="M68 76 L 80 78 M 66 74 L 58 86 M 66 74 L 73 90" fill="none" stroke="#f5b400" strokeOpacity="0.25" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
        {points.map((p) => {
          const isOffice = p.slug === "office";
          const hot = highlight === p.slug;
          return (
            <g key={p.slug}>
              {(hot || isOffice) && <circle cx={p.x} cy={p.y} r={hot ? 5 : 3.5} fill={hot ? "#f5b400" : "#e02020"} opacity="0.25" />}
              <circle cx={p.x} cy={p.y} r={isOffice ? 1.8 : 1.4} fill={isOffice ? "#e02020" : hot ? "#f5b400" : "#ffffff"} />
              <text x={p.x + 2.6} y={p.y + 0.9} fontSize="3.1" fill={hot ? "#f5b400" : "#e4e4e7"} fontWeight={hot || isOffice ? 700 : 500}>
                {p.name}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="absolute bottom-3 left-4 text-[0.65rem] uppercase tracking-widest text-muted-foreground">Schematic service area · Haryana & Delhi NCR</figcaption>
    </figure>
  );
}
