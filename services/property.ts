// services/property.ts — Enterprise API-Ready Property Service Layer

import { mockProperties, mockCategories } from '@/lib/mock/properties';
import type { Property } from '@/types';

export interface PropertyFilter {
  category?: string | string[];
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  isVerified?: boolean;
  isDTCP?: boolean;
  isRERA?: boolean;
  status?: string;
  listingType?: string;
  facing?: string;
  sort?: 'newest' | 'price-low' | 'price-high' | 'most-viewed' | 'verified-first' | 'largest-area';
}

export interface PropertyReview {
  id: string;
  propertyId: string;
  authorName: string;
  authorLocation: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
}

const mockReviewsDatabase: Record<string, PropertyReview[]> = {
  'prop-001': [
    {
      id: 'rev-1',
      propertyId: 'prop-001',
      authorName: 'Col. K.S. Rathore (Retd.)',
      authorLocation: 'Bengaluru',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Superb legal diligence conducted by Naradi team. 40ft road is fully asphalted and BDA approvals verified without hassle.',
      verifiedBuyer: true,
      helpfulCount: 14,
    },
    {
      id: 'rev-2',
      propertyId: 'prop-001',
      authorName: 'Sanjay Deshmukh',
      authorLocation: 'Pune',
      rating: 5,
      date: '1 month ago',
      comment: 'Top-tier location in Judicial Layout, Yelahanka. Peaceful residential neighborhood with excellent tree cover.',
      verifiedBuyer: true,
      helpfulCount: 9,
    },
  ],
};

const defaultReviews: PropertyReview[] = [
  {
    id: 'rev-def-1',
    propertyId: 'default',
    authorName: 'Venkatesh Murthy',
    authorLocation: 'Bengaluru',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Exceptional site visit coordination. 100% transparent documentation with zero broker commission.',
    verifiedBuyer: true,
    helpfulCount: 18,
  },
  {
    id: 'rev-def-2',
    propertyId: 'default',
    authorName: 'Ananya Raghavan',
    authorLocation: 'Chennai',
    rating: 4.8,
    date: '1 month ago',
    comment: 'Legal verification report was delivered within 48 hours. Clear title and smooth registration assistance.',
    verifiedBuyer: true,
    helpfulCount: 11,
  },
];

const simulateDelay = (ms: number = 100) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const propertyService = {
  // 1. Get properties with full filtering and sorting
  async getProperties(filter?: PropertyFilter): Promise<Property[]> {
    await simulateDelay();
    let list = [...mockProperties];

    if (!filter) return list;

    if (filter.category) {
      const cats = Array.isArray(filter.category) ? filter.category : [filter.category];
      if (cats.length > 0 && !cats.includes('all')) {
        list = list.filter((p) => cats.includes(p.category));
      }
    }

    if (filter.city && filter.city !== 'all') {
      const c = filter.city.toLowerCase();
      list = list.filter((p) => p.location.city.toLowerCase() === c || p.location.locality.toLowerCase().includes(c));
    }

    if (filter.minPrice !== undefined && !isNaN(filter.minPrice)) {
      list = list.filter((p) => p.pricing.totalPrice >= filter.minPrice!);
    }

    if (filter.maxPrice !== undefined && !isNaN(filter.maxPrice)) {
      list = list.filter((p) => p.pricing.totalPrice <= filter.maxPrice!);
    }

    if (filter.minArea !== undefined && !isNaN(filter.minArea)) {
      list = list.filter((p) => p.pricing.totalArea >= filter.minArea!);
    }

    if (filter.isVerified) {
      list = list.filter((p) => p.isVerified);
    }

    if (filter.isDTCP) {
      list = list.filter((p) => p.isDTCP);
    }

    if (filter.isRERA) {
      list = list.filter((p) => p.isRERA);
    }

    if (filter.status && filter.status !== 'all') {
      list = list.filter((p) => p.status === filter.status);
    }

    if (filter.facing && filter.facing !== 'all') {
      list = list.filter((p) => p.pricing.facing === filter.facing);
    }

    // Sort
    switch (filter.sort) {
      case 'price-low':
        list.sort((a, b) => a.pricing.totalPrice - b.pricing.totalPrice);
        break;
      case 'price-high':
        list.sort((a, b) => b.pricing.totalPrice - a.pricing.totalPrice);
        break;
      case 'most-viewed':
        list.sort((a, b) => b.views - a.views);
        break;
      case 'verified-first':
        list.sort((a, b) => (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0));
        break;
      case 'largest-area':
        list.sort((a, b) => b.pricing.totalArea - a.pricing.totalArea);
        break;
      case 'newest':
      default:
        list.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
        break;
    }

    return list;
  },

  // 2. Get property by exact slug or id
  async getPropertyBySlug(slug: string): Promise<Property | null> {
    await simulateDelay();
    return mockProperties.find((p) => p.slug === slug || p.id === slug) || null;
  },

  // 3. Search properties by keywords and query
  async searchProperties(query: string, filter?: PropertyFilter): Promise<Property[]> {
    const list = await this.getProperties(filter);
    if (!query || !query.trim()) return list;

    const q = query.toLowerCase().trim();
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.locality.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.location.address.toLowerCase().includes(q)
    );
  },

  // 4. Get similar properties by category or location
  async getSimilarProperties(propertyId: string, limit: number = 4): Promise<Property[]> {
    await simulateDelay();
    const current = mockProperties.find((p) => p.id === propertyId || p.slug === propertyId);
    if (!current) return mockProperties.slice(0, limit);

    const matches = mockProperties.filter(
      (p) => p.id !== current.id && (p.category === current.category || p.location.city === current.location.city)
    );

    return (matches.length > 0 ? matches : mockProperties.filter((p) => p.id !== current.id)).slice(0, limit);
  },

  // 5. Get reviews
  async getReviews(propertyId: string): Promise<PropertyReview[]> {
    await simulateDelay();
    return mockReviewsDatabase[propertyId] || defaultReviews;
  },

  // 6. Get categories
  async getCategories() {
    await simulateDelay();
    return mockCategories;
  },

  // 7. Get sold properties
  async getSoldProperties(): Promise<Property[]> {
    await simulateDelay();
    return mockProperties.filter((p) => p.status === 'sold');
  },

  // 8. Get featured properties
  async getFeaturedProperties(): Promise<Property[]> {
    await simulateDelay();
    return mockProperties.filter((p) => p.isFeatured);
  },
};
