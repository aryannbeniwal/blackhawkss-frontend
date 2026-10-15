import { apiFetch, query } from "@/lib/api/http";
import type {
  Announcement,
  ApplicationStatus,
  DashboardSummary,
  Enquiry,
  EnquiryNote,
  EnquiryStatus,
  GalleryItem,
  JobApplication,
  Page,
} from "@/lib/api/types";

export type AdminClientOrg = {
  id: number;
  name: string;
  area: string;
  city: string;
  sector: string;
  highlight?: string | null;
  published: boolean;
  sortOrder: number;
};
export type ClientOrgInput = Omit<AdminClientOrg, "id">;
export type AnnouncementInput = Omit<Announcement, "id">;

export type EnquiryListParams = { page?: number; size?: number; status?: EnquiryStatus | ""; q?: string; from?: string; to?: string };
export type ApplicationListParams = { page?: number; size?: number; status?: ApplicationStatus | ""; q?: string };

const A = "api/v1/admin";

export const adminApi = {
  dashboard: () => apiFetch<DashboardSummary>(`${A}/dashboard`),

  enquiries: {
    list: (params: EnquiryListParams) => apiFetch<Page<Enquiry>>(`${A}/enquiries${query(params)}`),
    get: (id: number) => apiFetch<Enquiry>(`${A}/enquiries/${id}`),
    patch: (id: number, body: { status?: EnquiryStatus; followUpAt?: string | null }) =>
      apiFetch<Enquiry>(`${A}/enquiries/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    addNote: (id: number, body: string) =>
      apiFetch<Enquiry>(`${A}/enquiries/${id}/notes`, { method: "POST", body: JSON.stringify({ body }) }),
  },

  applications: {
    list: (params: ApplicationListParams) => apiFetch<Page<JobApplication>>(`${A}/applications${query(params)}`),
    get: (id: number) => apiFetch<JobApplication>(`${A}/applications/${id}`),
    patch: (id: number, body: { status: ApplicationStatus }) =>
      apiFetch<JobApplication>(`${A}/applications/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  },

  gallery: {
    list: () => apiFetch<GalleryItem[]>(`${A}/gallery`),
    upload: (form: FormData) => apiFetch<GalleryItem>(`${A}/gallery`, { method: "POST", body: form }),
    patch: (id: number, body: Partial<Pick<GalleryItem, "title" | "category" | "published" | "sortOrder">>) =>
      apiFetch<GalleryItem>(`${A}/gallery/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    remove: (id: number) => apiFetch<null>(`${A}/gallery/${id}`, { method: "DELETE" }),
  },

  clients: {
    list: () => apiFetch<AdminClientOrg[]>(`${A}/clients`),
    create: (body: ClientOrgInput) => apiFetch<AdminClientOrg>(`${A}/clients`, { method: "POST", body: JSON.stringify(body) }),
    patch: (id: number, body: Partial<ClientOrgInput>) =>
      apiFetch<AdminClientOrg>(`${A}/clients/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    remove: (id: number) => apiFetch<null>(`${A}/clients/${id}`, { method: "DELETE" }),
  },

  announcements: {
    list: () => apiFetch<Announcement[]>(`${A}/announcements`),
    create: (body: AnnouncementInput) => apiFetch<Announcement>(`${A}/announcements`, { method: "POST", body: JSON.stringify(body) }),
    patch: (id: number, body: Partial<AnnouncementInput>) =>
      apiFetch<Announcement>(`${A}/announcements/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    remove: (id: number) => apiFetch<null>(`${A}/announcements/${id}`, { method: "DELETE" }),
  },
};
