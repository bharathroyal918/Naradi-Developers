// ============================================================
// types/index.ts — All TypeScript interfaces for Naradi Developers
// ============================================================

// ===== PROPERTY =====
export type PropertyCategory =
  | 'plots'
  | 'commercial-land'
  | 'agricultural-land'
  | 'farm-house'
  | 'warehouse'
  | 'industrial-building'
  | 'individual-houses'
  | 'apartments'
  | 'villas';

export type PropertyStatus =
  | 'available'
  | 'sold'
  | 'under-negotiation'
  | 'coming-soon';

export type ListingType = 'sale' | 'lease' | 'both';

export type FacingDirection = 'north' | 'south' | 'east' | 'west' | 'north-east' | 'north-west' | 'south-east' | 'south-west';

export interface PropertyAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface PropertyDocument {
  id: string;
  name: string;
  type: 'title-deed' | 'encumbrance' | 'patta' | 'dtcp' | 'rera' | 'survey' | 'other';
  verified: boolean;
  uploadedAt: string;
}

export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  locality: string;
  district: string;
}

export interface PropertyPricing {
  totalPrice: number;
  pricePerSqFt?: number;
  pricePerGround?: number;
  currency: 'INR';
  isNegotiable: boolean;
  leaseRent?: number;
  maintenanceCharges?: number;
}

export interface PropertySpecifications {
  totalArea: number;
  areaUnit: 'sqft' | 'acres' | 'grounds' | 'cents' | 'sqm';
  plotLength?: number;
  plotWidth?: number;
  floorCount?: number;
  bedrooms?: number;
  bathrooms?: number;
  carParking?: number;
  powerLoad?: string;
  ceilingHeight?: number;
  loadingDock?: boolean;
  fireNOC?: boolean;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: PropertyCategory;
  status: PropertyStatus;
  listingType: ListingType;
  images: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  location: PropertyLocation;
  pricing: PropertySpecifications & PropertyPricing & { facing?: FacingDirection };
  amenities: PropertyAmenity[];
  documents: PropertyDocument[];
  isVerified: boolean;
  isFeatured: boolean;
  isDTCP: boolean;
  isRERA: boolean;
  views: number;
  enquiries: number;
  postedAt: string;
  updatedAt: string;
  sellerId: string;
  roadWidth?: string;
  nearbyPlaces?: NearbyPlace[];
}

export interface NearbyPlace {
  name: string;
  category: 'school' | 'hospital' | 'market' | 'transport' | 'bank' | 'restaurant';
  distance: string;
}

// ===== USER =====
export type UserRole = 'buyer' | 'seller' | 'nri' | 'admin' | 'verification' | 'support';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  isNRI: boolean;
  country?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface BuyerProfile extends User {
  role: 'buyer';
  wishlist: string[];
  savedSearches: SavedSearch[];
  enquiries: Enquiry[];
  siteVisits: SiteVisit[];
}

export interface SellerProfile extends User {
  role: 'seller';
  listings: string[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  businessName?: string;
  gstin?: string;
  leads: Lead[];
}

// ===== SEARCH & FILTER =====
export interface PropertyFilter {
  query?: string;
  city?: string;
  locality?: string;
  category?: PropertyCategory[];
  listingType?: ListingType;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  areaUnit?: string;
  isVerified?: boolean;
  isDTCP?: boolean;
  isRERA?: boolean;
  facing?: FacingDirection[];
  status?: PropertyStatus;
  roadWidth?: string;
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'most-viewed' | 'verified-first';
  page?: number;
  limit?: number;
}

export interface SavedSearch {
  id: string;
  name: string;
  filter: PropertyFilter;
  alertEnabled: boolean;
  createdAt: string;
}

export interface SearchSuggestion {
  type: 'location' | 'property' | 'category';
  label: string;
  subLabel?: string;
  icon?: string;
  slug?: string;
}

// ===== ENQUIRY & LEADS =====
export interface Enquiry {
  id: string;
  propertyId: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  type: 'general' | 'site-visit' | 'loan' | 'legal';
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
}

export interface Lead extends Enquiry {
  assignedTo?: string;
  notes?: string;
  followUpDate?: string;
}

export interface SiteVisit {
  id: string;
  propertyId: string;
  userId: string;
  scheduledAt: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

// ===== TESTIMONIAL =====
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  review: string;
  propertyType: string;
  date: string;
  isVerified: boolean;
}

// ===== NOTIFICATION =====
export type NotificationType =
  | 'enquiry'
  | 'verification'
  | 'visit'
  | 'promotion'
  | 'system'
  | 'price-drop'
  | 'new-listing';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  createdAt: string;
}

// ===== CMS =====
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  ctaUrl?: string;
  isActive: boolean;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  icon: string;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
}

export interface Award {
  id: string;
  title: string;
  year: string;
  issuer: string;
  imageUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  linkedin?: string;
  experience: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

// ===== API RESPONSE =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ===== ANALYTICS =====
export interface AnalyticsStat {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  period: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  date?: string;
}

// ===== VERIFICATION =====
export interface VerificationTask {
  id: string;
  propertyId: string;
  propertyTitle: string;
  sellerId: string;
  sellerName: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  documents: PropertyDocument[];
  assignedTo?: string;
  submittedAt: string;
  reviewedAt?: string;
  comments?: string;
  history: VerificationHistoryEntry[];
}

export interface VerificationHistoryEntry {
  action: string;
  by: string;
  at: string;
  comment?: string;
}

// ===== SUPPORT =====
export interface SupportTicket {
  id: string;
  subject: string;
  category: 'enquiry' | 'complaint' | 'callback' | 'visit' | 'technical' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  userId: string;
  userName: string;
  userPhone: string;
  messages: TicketMessage[];
  createdAt: string;
  resolvedAt?: string;
}

export interface TicketMessage {
  id: string;
  content: string;
  sender: 'user' | 'support';
  sentAt: string;
}

// ===== CAREER =====
export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  experience: string;
  description: string;
  requirements: string[];
  postedAt: string;
  isActive: boolean;
}

// ===== FORMS =====
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: Enquiry['type'];
  preferredDate?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}
