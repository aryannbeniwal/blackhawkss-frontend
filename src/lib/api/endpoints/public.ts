import { apiFetch, query } from "@/lib/api/http";
import type { Announcement, ApplicationRequest, ContactMessageRequest, EnquiryRequest, EnquiryResponse, GalleryItem } from "@/lib/api/types";

export const publicApi = {
  submitEnquiry: (body: EnquiryRequest) =>
    apiFetch<EnquiryResponse>("api/v1/public/enquiries", { method: "POST", body: JSON.stringify(body) }),
  submitContact: (body: ContactMessageRequest) =>
    apiFetch<{ id: number }>("api/v1/public/contact-messages", { method: "POST", body: JSON.stringify(body) }),
  submitApplication: (body: ApplicationRequest) =>
    apiFetch<{ id: number }>("api/v1/public/applications", { method: "POST", body: JSON.stringify(body) }),
  gallery: (category?: GalleryItem["category"]) => apiFetch<GalleryItem[]>(`api/v1/public/gallery${query({ category })}`),
  announcements: () => apiFetch<Announcement[]>("api/v1/public/announcements"),
};
