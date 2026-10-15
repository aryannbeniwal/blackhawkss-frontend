/** Query-key factories — the single source of truth for cache identity. */
export const keys = {
  session: () => ["session"] as const,
  dashboard: () => ["dashboard"] as const,
  enquiries: {
    all: ["enquiries"] as const,
    list: (params: object) => ["enquiries", "list", params] as const,
    detail: (id: number) => ["enquiries", "detail", id] as const,
  },
  applications: {
    all: ["applications"] as const,
    list: (params: object) => ["applications", "list", params] as const,
    detail: (id: number) => ["applications", "detail", id] as const,
  },
  gallery: { all: ["gallery"] as const },
  clients: { all: ["clients"] as const },
  announcements: { all: ["announcements"] as const },
} as const;
