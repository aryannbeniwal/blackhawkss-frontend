export type ApiError = { code: string; message: string; fields?: Record<string, string> };
export type ApiEnvelope<T> = { success: boolean; data?: T; error?: ApiError };

export type ServiceCategoryValue =
  | "SECURITY_GUARDS"
  | "BOUNCERS_EVENT_SECURITY"
  | "PERSONAL_SECURITY_OFFICERS"
  | "SECURITY_SUPERVISORS"
  | "MANPOWER_SUPPLY"
  | "GARDENERS_MAIDS"
  | "OTHER";

export type EnquiryRequest = {
  fullName: string;
  phone: string;
  email?: string;
  organisation?: string;
  siteName?: string;
  serviceCategory: ServiceCategoryValue;
  location: string;
  preferredDate: string; // yyyy-mm-dd
  personnelCount: number;
  durationShift: string;
  requirements: string;
  eventVenue?: string;
  expectedCrowd?: number;
  eventStart?: string;
  eventEnd?: string;
  consent: true;
  source?: string;
  /** honeypot — must stay empty */
  website?: string;
};

export type EnquiryResponse = { referenceCode: string; id: number };

export type ContactMessageRequest = { fullName: string; phone: string; email?: string; message: string; website?: string };

export type ApplicationRequest = {
  fullName: string;
  phone: string;
  city: string;
  roleApplied: "SECURITY_GUARD" | "BOUNCER" | "PSO" | "SUPERVISOR" | "MANPOWER" | "GARDENER_MAID";
  experienceYears: number;
  exServiceman: boolean;
  serviceUnit?: string;
  age?: number;
  message?: string;
  website?: string;
};

export type GalleryItem = {
  id: number;
  title: string;
  category: "EVENTS" | "SITES" | "TEAM";
  url: string;
  thumbUrl: string;
  width: number;
  height: number;
  sortOrder: number;
  published?: boolean;
  createdAt?: string;
};

export type Announcement = { id: number; title: string; body: string; startsAt?: string; endsAt?: string; published?: boolean };

export type EnquiryStatus = "NEW" | "CONTACTED" | "REQUIREMENT_CONFIRMED" | "QUOTATION_SENT" | "WON" | "LOST";
export type ApplicationStatus = "NEW" | "CALLED" | "SHORTLISTED" | "JOINED" | "REJECTED";

export type Enquiry = Omit<EnquiryRequest, "consent" | "website" | "source"> & {
  source: "WEB" | "WHATSAPP" | "PHONE" | "OTHER";
  phoneDisplay?: string;
  whatsappUrl?: string;
  id: number;
  referenceCode: string;
  status: EnquiryStatus;
  followUpAt?: string | null;
  notifyFailed: boolean;
  createdAt: string;
  updatedAt: string;
  notes?: EnquiryNote[];
};
export type EnquiryNote = { id: number; authorEmail: string; body: string; createdAt: string };

export type JobApplication = Omit<ApplicationRequest, "website"> & { id: number; status: ApplicationStatus; createdAt: string };

export type Page<T> = { items: T[]; page: number; size: number; totalItems: number; totalPages: number };

export type DashboardSummary = {
  enquiriesByStatus: Record<EnquiryStatus, number>;
  enquiriesThisWeek: number;
  followUpsDueToday: number;
  newApplications: number;
  unreadMessages: number;
  totalEnquiries: number;
};

export type AdminUser = { id: number; email: string; displayName: string; role: "ADMIN" };
export type TokenPair = { accessToken: string; refreshToken: string; expiresIn: number; user?: AdminUser };
