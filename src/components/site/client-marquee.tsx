import { clients } from "@/content/clients";

/** Pure-CSS marquee of organisation names. Pauses on hover; static under reduced motion. */
export function ClientMarquee() {
  const row = [...clients, ...clients];
  return (
    <div className="group relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <ul className="flex w-max gap-3 motion-safe:animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused]" aria-label="Organisations we have served">
        {row.map((c, i) => (
          <li
            key={`${c.name}-${i}`}
            aria-hidden={i >= clients.length}
            className="whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/85"
          >
            {c.name}
            <span className="ml-2 text-xs text-muted-foreground">{c.city}</span>
          </li>
        ))}
      </ul>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
