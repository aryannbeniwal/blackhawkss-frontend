export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: "EVENTS" | "SITES" | "TEAM";
  width: number;
  height: number;
};

/** Authorised photographs supplied by the owners (October 2026). Backend uploads are shown alongside these. */
export const galleryPhotos: GalleryPhoto[] = [
  { id: "prisma-day-1", src: "/images/prisma-team-day-1.jpg", alt: "Black Hawk bouncer team at PRISMA Fest 2026, SRM University", title: "Bouncer team, PRISMA Fest 2026 — SRM University, Sonipat", category: "EVENTS", width: 960, height: 1280 },
  { id: "prisma-day-2", src: "/images/prisma-team-day-2.jpg", alt: "Black Hawk event security line-up on the ground at PRISMA Fest 2026", title: "Ground team briefing, PRISMA Fest 2026", category: "EVENTS", width: 1600, height: 1200 },
  { id: "prisma-night-1", src: "/images/prisma-team-night-1.jpg", alt: "Black Hawk night deployment at PRISMA Fest 2026", title: "Night shift, PRISMA Fest 2026", category: "EVENTS", width: 1600, height: 1200 },
  { id: "prisma-night-2", src: "/images/prisma-team-night-2.jpg", alt: "Black Hawk bouncers with the event team at PRISMA Fest 2026", title: "Stage-front and crowd team, PRISMA Fest 2026", category: "EVENTS", width: 1600, height: 1200 },
  { id: "industrial-gate", src: "/images/guards-industrial-gate.jpg", alt: "Black Hawk guards on night duty at an industrial site gate", title: "Night duty at an industrial site gate", category: "SITES", width: 960, height: 1280 },
  { id: "uniform-gate", src: "/images/guard-uniform-gate.jpg", alt: "Black Hawk security guard in uniform at a residential gate", title: "Gate post, residential site", category: "SITES", width: 960, height: 1280 },
  { id: "founders", src: "/images/founders-prisma-2026.jpg", alt: "Sandeep Beniwal and Aryan Beniwal at PRISMA Fest 2026", title: "The founders on site, PRISMA Fest 2026", category: "TEAM", width: 960, height: 1280 },
];
