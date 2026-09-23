'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search, SlidersHorizontal, Grid3X3, List, Map as MapIcon, X,
  Shield, MapPin, Heart, Eye,
  Phone, MessageCircle, ChevronLeft, ChevronRight,
  Filter, Calendar, Share2, Scale, ExternalLink, Compass, Navigation
} from 'lucide-react';
import { mockProperties } from '@/lib/mock/properties';
import type { Property } from '@/types';
import { formatPrice, formatArea, categoryLabels } from '@/lib/utils';
import { ScheduleVisitModal } from '@/components/properties/ScheduleVisitModal';
import { ShareModal } from '@/components/properties/ShareModal';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'most-viewed', label: 'Most Viewed' },
  { value: 'verified-first', label: 'Verified First' },
];

const propertyTypes = [
  { value: 'plots', label: 'Residential Plots' },
  { value: 'commercial-land', label: 'Commercial Land' },
  { value: 'agricultural-land', label: 'Agricultural Land' },
  { value: 'farm-house', label: 'Farm House' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'industrial-building', label: 'Industrial Building' },
  { value: 'individual-houses', label: 'Individual Houses' },
  { value: 'apartments', label: 'Apartments' },
  { value: 'villas', label: 'Villas' },
];

const cities = ['Bengaluru', 'Yelahanka', 'Hosur', 'Chennai', 'Coimbatore', 'Krishnagiri', 'Ooty', 'Mysore', 'Salem', 'Trichy', 'Madurai'];

interface FilterSidebarProps {
  filters: {
    city: string;
    category: string[];
    minPrice: string;
    maxPrice: string;
    minArea: string;
    isVerified: boolean;
    isDTCP: boolean;
    isRERA: boolean;
    listingType: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    city: string;
    category: string[];
    minPrice: string;
    maxPrice: string;
    minArea: string;
    isVerified: boolean;
    isDTCP: boolean;
    isRERA: boolean;
    listingType: string;
  }>>;
  resetFilters: () => void;
  toggleCategory: (val: string) => void;
  filteredCount: number;
  onClose?: () => void;
}

function FilterSidebar({
  filters,
  setFilters,
  resetFilters,
  toggleCategory,
  filteredCount,
  onClose,
}: FilterSidebarProps) {
  return (
    <aside className="w-full space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-700" /> Filters
        </h2>
        <button onClick={resetFilters} className="text-xs text-emerald-700 font-semibold hover:underline">Reset All</button>
      </div>

      {/* City */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Location</label>
        <select
          className="input-base select-base text-sm w-full py-2 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white"
          value={filters.city}
          onChange={(e) => setFilters((p) => ({ ...p, city: e.target.value }))}
        >
          <option value="">All Cities / Regions</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Listing Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Listing Type</label>
        <div className="grid grid-cols-3 gap-2">
          {[{ v: '', l: 'All' }, { v: 'sale', l: 'Sale' }, { v: 'lease', l: 'Lease' }].map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setFilters((p) => ({ ...p, listingType: o.v }))}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                filters.listingType === o.v
                  ? 'border-emerald-600 text-white'
                  : 'border-gray-200 text-gray-600 hover:border-emerald-300'
              }`}
              style={filters.listingType === o.v ? { background: 'linear-gradient(135deg, #0F5132, #16a34a)' } : {}}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Property Category</label>
        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
          {propertyTypes.map((type) => (
            <label key={type.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.category.includes(type.value)}
                onChange={() => toggleCategory(type.value)}
                className="w-4 h-4 rounded border-gray-300 accent-emerald-700"
              />
              <span className="text-xs text-gray-600 group-hover:text-emerald-700 transition-colors">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Budget Range (₹)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            className="input-base text-xs py-2 px-3 border border-gray-200 rounded-xl"
            placeholder="Min ₹"
            value={filters.minPrice}
            onChange={(e) => setFilters((p) => ({ ...p, minPrice: e.target.value }))}
          />
          <input
            type="number"
            className="input-base text-xs py-2 px-3 border border-gray-200 rounded-xl"
            placeholder="Max ₹"
            value={filters.maxPrice}
            onChange={(e) => setFilters((p) => ({ ...p, maxPrice: e.target.value }))}
          />
        </div>
      </div>

      {/* Certifications */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Approvals & Verification</label>
        <div className="space-y-2">
          {[
            { key: 'isVerified', label: '100% Naradi Verified' },
            { key: 'isDTCP', label: 'DTCP Approved' },
            { key: 'isRERA', label: 'RERA Certified' },
          ].map((opt) => (
            <label key={opt.key} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters[opt.key as keyof typeof filters] as boolean}
                onChange={(e) => setFilters((p) => ({ ...p, [opt.key]: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 accent-emerald-700"
              />
              <span className="text-xs text-gray-600 group-hover:text-emerald-700 transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Btn */}
      <button
        onClick={() => onClose && onClose()}
        className="w-full py-3 rounded-xl font-bold text-white text-xs shadow-md shadow-emerald-900/10 hover:brightness-110 transition-all"
        style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)', border: 'none', cursor: 'pointer' }}
      >
        Show {filteredCount} Results
      </button>
    </aside>
  );
}

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMapProp, setSelectedMapProp] = useState<Property | null>(null);

  // Modals state
  const [visitModalProp, setVisitModalProp] = useState<Property | null>(null);
  const [shareModalProp, setShareModalProp] = useState<Property | null>(null);

  const [filters, setFilters] = useState({
    city: '',
    category: [] as string[],
    minPrice: '',
    maxPrice: '',
    minArea: '',
    isVerified: false,
    isDTCP: false,
    isRERA: false,
    listingType: '',
  });

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const toggleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 4) {
        alert('You can compare up to 4 properties at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const toggleCategory = (val: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(val)
        ? prev.category.filter((c) => c !== val)
        : [...prev.category, val],
    }));
  };

  const resetFilters = () => {
    setFilters({ city: '', category: [], minPrice: '', maxPrice: '', minArea: '', isVerified: false, isDTCP: false, isRERA: false, listingType: '' });
    setSearchQuery('');
  };

  // Filter logic
  let filtered = mockProperties.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchLoc = p.location.locality.toLowerCase().includes(q) || p.location.city.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchCat) return false;
    }
    if (filters.city && p.location.city !== filters.city) return false;
    if (filters.category.length && !filters.category.includes(p.category)) return false;
    if (filters.isVerified && !p.isVerified) return false;
    if (filters.isDTCP && !p.isDTCP) return false;
    if (filters.isRERA && !p.isRERA) return false;
    if (filters.listingType && p.listingType !== filters.listingType) return false;
    if (filters.minPrice && p.pricing.totalPrice < Number(filters.minPrice)) return false;
    if (filters.maxPrice && p.pricing.totalPrice > Number(filters.maxPrice)) return false;
    return true;
  });

  if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.pricing.totalPrice - b.pricing.totalPrice);
  if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.pricing.totalPrice - a.pricing.totalPrice);
  if (sortBy === 'most-viewed') filtered = [...filtered].sort((a, b) => b.views - a.views);
  if (sortBy === 'verified-first') filtered = [...filtered].sort((a, b) => (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 pt-24 pb-12">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-emerald-300 text-xs mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Marketplace</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold mb-3">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                100% Title Checked & Legally Verified Portfolio
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
                Explore Verified Properties
              </h1>
              <p className="text-emerald-200 text-sm max-w-xl">
                Browse premium residential plots, commercial investments, modern villas, agricultural retreats, and industrial land.
              </p>
            </div>

            {/* Quick Navigation to Compare & Wishlist */}
            <div className="flex items-center gap-3">
              <Link
                href="/buyer/wishlist"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-all"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist.length > 0 ? 'fill-red-400 text-red-400' : ''}`} />
                Saved ({wishlist.length})
              </Link>
              <Link
                href={compareList.length > 0 ? `/properties/compare?ids=${compareList.join(',')}` : '/properties/compare'}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-emerald-950 text-xs font-bold hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20"
              >
                <Scale className="w-3.5 h-3.5" />
                Compare ({compareList.length})
              </Link>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setFilters((p) => ({ ...p, category: [] }))}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filters.category.length === 0
                  ? 'bg-amber-400 text-emerald-950 font-bold'
                  : 'bg-white/10 text-emerald-100 hover:bg-white/20'
              }`}
            >
              All Categories
            </button>
            {propertyTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => toggleCategory(t.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  filters.category.includes(t.value)
                    ? 'bg-amber-400 text-emerald-950 font-bold'
                    : 'bg-white/10 text-emerald-100 hover:bg-white/20'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mt-6 flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-sm rounded-xl border-none outline-none shadow-lg text-gray-800"
                placeholder="Search by locality, city (Bengaluru, Hosur...), or keyword..."
                aria-label="Search properties"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => {}}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-emerald-950 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)', border: 'none', cursor: 'pointer' }}
            >
              <Search className="w-4 h-4" /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-xl py-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar (hidden in Map View to maximize canvas) */}
          {viewMode !== 'map' && (
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24 shadow-sm">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  resetFilters={resetFilters}
                  toggleCategory={toggleCategory}
                  filteredCount={filtered.length}
                  onClose={() => setIsSidebarOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Main Area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                {/* Mobile Filter */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 text-emerald-700" /> Filters
                </button>

                <span className="text-xs text-gray-500 font-medium">
                  Showing <span className="text-gray-900 font-bold">{filtered.length}</span> verified listings
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Sort */}
                <div className="relative">
                  <select
                    className="text-xs py-2 pr-8 pl-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-semibold text-gray-700 focus:bg-white"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort properties"
                  >
                    {sortOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* View Toggle: Grid, List, Map */}
                <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-gray-50 p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-emerald-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                    aria-label="Grid view"
                    title="Grid View"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-emerald-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                    aria-label="List view"
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-emerald-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                    aria-label="Interactive map view"
                    title="Interactive Map View"
                  >
                    <MapIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Tags */}
            {(filters.isVerified || filters.isDTCP || filters.isRERA || filters.city || filters.category.length > 0 || filters.listingType || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs text-gray-400 font-medium">Active:</span>
                {searchQuery && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    &quot;{searchQuery}&quot;
                    <button onClick={() => setSearchQuery('')} aria-label="Clear search"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filters.city && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <MapPin className="w-3 h-3" /> {filters.city}
                    <button onClick={() => setFilters((p) => ({ ...p, city: '' }))} aria-label="Remove city filter"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filters.isVerified && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <Shield className="w-3 h-3" /> Verified Only
                    <button onClick={() => setFilters((p) => ({ ...p, isVerified: false }))} aria-label="Remove verified filter"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filters.isDTCP && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                    DTCP
                    <button onClick={() => setFilters((p) => ({ ...p, isDTCP: false }))} aria-label="Remove DTCP filter"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filters.listingType && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 uppercase">
                    For {filters.listingType}
                    <button onClick={() => setFilters((p) => ({ ...p, listingType: '' }))} aria-label="Remove listing type"><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button onClick={resetFilters} className="text-xs text-gray-500 hover:text-emerald-700 underline font-semibold ml-1">
                  Clear all
                </button>
              </div>
            )}

            {/* Empty State */}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">No properties match your criteria</h3>
                <p className="text-gray-500 text-sm mb-5 max-w-sm mx-auto">
                  Try widening your price range, choosing another city, or resetting active filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md"
                  style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)' }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'map' ? (
              /* Map Split View */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[750px] bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl">
                {/* Left Listing Scrollpane */}
                <div className="lg:col-span-5 h-full overflow-y-auto p-4 space-y-3 border-r border-gray-100">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {filtered.length} Locations on Map
                    </p>
                    <span className="text-[11px] text-emerald-700 font-semibold">Click card or pin to locate</span>
                  </div>

                  {filtered.map((property) => {
                    const isSelected = selectedMapProp?.id === property.id;
                    return (
                      <div
                        key={property.id}
                        onClick={() => setSelectedMapProp(property)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                            : 'border-gray-100 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0 relative overflow-hidden"
                          style={{ backgroundImage: `url('${property.images[0]}')` }}
                        >
                          {property.isVerified && (
                            <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-800 text-white">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                                {categoryLabels[property.category]}
                              </span>
                              <span className="text-xs font-black text-gray-900">
                                {formatPrice(property.pricing.totalPrice)}
                              </span>
                            </div>
                            <h4 className="font-bold text-gray-900 text-xs line-clamp-1">{property.title}</h4>
                            <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-emerald-600" />
                              {property.location.locality}, {property.location.city}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
                            <span className="text-gray-500">{formatArea(property.pricing.totalArea, property.pricing.areaUnit)}</span>
                            <Link
                              href={`/properties/${property.slug}`}
                              className="font-bold text-emerald-800 hover:underline flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Explore <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Interactive Mock Map Canvas */}
                <div className="lg:col-span-7 h-full relative bg-slate-900 overflow-hidden flex flex-col items-center justify-center">
                  {/* Subtle Grid / Map Canvas Graphic */}
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201, 162, 39, 0.4) 1px, transparent 0)`,
                      backgroundSize: '36px 36px',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950/80 pointer-events-none" />

                  {/* Mock Map Roads & Waterways SVGs */}
                  <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-50,200 Q200,100 450,300 T900,150" fill="none" stroke="#C9A227" strokeWidth="4" />
                    <path d="M100,-20 Q300,300 500,500 T800,900" fill="none" stroke="#10b981" strokeWidth="6" />
                    <path d="M-20,400 Q400,350 700,600" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="6,6" />
                  </svg>

                  {/* Compass & Controls Floating Overlay */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    <button className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-700 hover:text-emerald-700">
                      <Compass className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-700 hover:text-emerald-700 font-bold text-sm">
                      +
                    </button>
                    <button className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-700 hover:text-emerald-700 font-bold text-sm">
                      −
                    </button>
                  </div>

                  {/* Satellite / Terrain Selector Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-gray-200 text-xs font-bold text-gray-800 shadow-md">
                    <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                    South India High-Precision GIS Overlay
                  </div>

                  {/* Mock Property Pins on Map */}
                  <div className="relative w-full h-full p-8 z-10 flex flex-wrap items-center justify-around">
                    {filtered.map((p, idx) => {
                      const isSelected = selectedMapProp?.id === p.id;
                      // Simulated coordinates distribution
                      const positions = [
                        { top: '22%', left: '30%' },
                        { top: '35%', left: '60%' },
                        { top: '55%', left: '25%' },
                        { top: '65%', left: '70%' },
                        { top: '40%', left: '42%' },
                        { top: '78%', left: '48%' },
                        { top: '20%', left: '75%' },
                        { top: '50%', left: '80%' },
                        { top: '30%', left: '18%' },
                        { top: '70%', left: '15%' },
                        { top: '15%', left: '50%' },
                      ];
                      const pos = positions[idx % positions.length];

                      return (
                        <div
                          key={p.id}
                          style={{ position: 'absolute', top: pos.top, left: pos.left }}
                          className="transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                          onClick={() => setSelectedMapProp(p)}
                        >
                          <div
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold shadow-2xl transition-all duration-300 ${
                              isSelected
                                ? 'bg-amber-400 text-emerald-950 scale-125 ring-4 ring-amber-400/40 z-30'
                                : 'bg-emerald-800 text-white hover:scale-110 border border-emerald-500'
                            }`}
                          >
                            <MapPin className="w-3 h-3" />
                            <span>{formatPrice(p.pricing.totalPrice)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Pin Popover Preview */}
                  <AnimatePresence>
                    {selectedMapProp && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-6 left-6 right-6 max-w-md mx-auto z-30 bg-white rounded-3xl p-4 shadow-2xl border border-gray-100"
                      >
                        <div className="flex gap-4">
                          <div
                            className="w-28 h-28 rounded-2xl bg-cover bg-center flex-shrink-0"
                            style={{ backgroundImage: `url('${selectedMapProp.images[0]}')` }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                                {categoryLabels[selectedMapProp.category]}
                              </span>
                              <button
                                onClick={() => setSelectedMapProp(null)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{selectedMapProp.title}</h4>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 mb-2">
                              <MapPin className="w-3 h-3 text-emerald-600" />
                              {selectedMapProp.location.locality}, {selectedMapProp.location.city}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="font-black text-gray-900 text-sm">
                                {formatPrice(selectedMapProp.pricing.totalPrice)}
                              </div>
                              <Link
                                href={`/properties/${selectedMapProp.slug}`}
                                className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              /* Grid & List Views */
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                : 'space-y-4'
              }>
                {filtered.map((property, index) => (
                  viewMode === 'grid' ? (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                    >
                      {/* Image Top */}
                      <div className="relative h-52 overflow-hidden bg-gray-200">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url('${property.images[0]}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          {property.isVerified && (
                            <span className="badge-verified shadow-md">✓ Verified</span>
                          )}
                          {property.isDTCP && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow" style={{ background: '#2563eb' }}>
                              DTCP
                            </span>
                          )}
                          {property.isRERA && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow" style={{ background: '#7c3aed' }}>
                              RERA
                            </span>
                          )}
                        </div>

                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <button
                            onClick={() => toggleCompare(property.id)}
                            className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                              compareList.includes(property.id)
                                ? 'bg-amber-400 text-emerald-950 font-bold'
                                : 'bg-white/80 text-gray-700 hover:bg-white'
                            }`}
                            title="Compare property"
                            aria-label="Compare property"
                          >
                            <Scale className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleWishlist(property.id)}
                            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all"
                            aria-label="Wishlist"
                          >
                            <Heart className={`w-3.5 h-3.5 ${wishlist.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                          </button>
                          <button
                            onClick={() => setShareModalProp(property)}
                            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all text-gray-700"
                            aria-label="Share property"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Bottom Tag */}
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white shadow backdrop-blur-md" style={{ background: property.listingType === 'sale' ? 'rgba(15,81,50,0.85)' : 'rgba(201,162,39,0.9)' }}>
                            {property.listingType === 'lease' ? 'For Lease' : 'For Sale'}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                              {categoryLabels[property.category]}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />{property.views.toLocaleString()}
                            </span>
                          </div>

                          <h3 className="font-bold text-gray-900 text-base mb-1.5 line-clamp-2 leading-snug">
                            {property.title}
                          </h3>

                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="truncate">{property.location.locality}, {property.location.city}</span>
                          </div>

                          <div className="flex justify-between items-end mb-4 pb-3 border-b border-gray-100">
                            <div>
                              <div className="font-display font-black text-xl text-gray-900">
                                {formatPrice(property.pricing.totalPrice)}
                              </div>
                              {property.pricing.pricePerSqFt && (
                                <div className="text-[11px] text-gray-400">₹{property.pricing.pricePerSqFt.toLocaleString()}/sq.ft</div>
                              )}
                            </div>
                            <div className="text-right text-xs font-semibold text-gray-700 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                              {formatArea(property.pricing.totalArea, property.pricing.areaUnit)}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2 pt-1">
                          <Link
                            href={`/properties/${property.slug}`}
                            className="text-center py-2.5 rounded-xl font-bold text-xs text-white shadow-md shadow-emerald-900/10 hover:brightness-110 transition-all block"
                            style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)', textDecoration: 'none' }}
                          >
                            Explore Property & Legal Docs
                          </Link>
                          <div className="grid grid-cols-3 gap-1.5">
                            <button
                              onClick={() => setVisitModalProp(property)}
                              className="flex items-center justify-center gap-1 py-2 rounded-xl text-[11px] font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
                            >
                              <Calendar className="w-3 h-3 text-emerald-700" /> Visit
                            </button>
                            <a
                              href="tel:+919876543210"
                              className="flex items-center justify-center gap-1 py-2 rounded-xl text-[11px] font-semibold bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Phone className="w-3 h-3" /> Call
                            </a>
                            <a
                              href="https://wa.me/919876543210"
                              className="flex items-center justify-center gap-1 py-2 rounded-xl text-[11px] font-bold text-white shadow-sm"
                              style={{ background: '#25D366' }}
                            >
                              <MessageCircle className="w-3 h-3" /> Chat
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // List View Item
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="bg-white rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all overflow-hidden p-4"
                    >
                      <div className="flex flex-col sm:flex-row gap-5">
                        <div
                          className="sm:w-64 h-48 sm:h-auto rounded-2xl bg-cover bg-center flex-shrink-0 relative overflow-hidden"
                          style={{ backgroundImage: `url('${property.images[0]}')` }}
                        >
                          <div className="absolute top-2.5 left-2.5 flex gap-1">
                            {property.isVerified && <span className="badge-verified">✓ Verified</span>}
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                                    {categoryLabels[property.category]}
                                  </span>
                                  {property.isDTCP && <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">DTCP</span>}
                                  {property.isRERA && <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">RERA</span>}
                                </div>
                                <h3 className="font-bold text-gray-900 text-base">{property.title}</h3>
                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                                  {property.location.locality}, {property.location.city}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-black text-xl text-gray-900">{formatPrice(property.pricing.totalPrice)}</div>
                                <div className="text-xs text-gray-500">{formatArea(property.pricing.totalArea, property.pricing.areaUnit)}</div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2 mt-1 mb-4">
                              {property.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setVisitModalProp(property)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                              >
                                <Calendar className="w-3 h-3 inline mr-1" /> Visit
                              </button>
                              <button
                                onClick={() => toggleCompare(property.id)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${compareList.includes(property.id) ? 'bg-amber-100 border-amber-300 text-amber-900' : 'border-gray-200 text-gray-700'}`}
                              >
                                <Scale className="w-3 h-3 inline mr-1" /> Compare
                              </button>
                              <button
                                onClick={() => toggleWishlist(property.id)}
                                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:text-red-500"
                              >
                                <Heart className={`w-3.5 h-3.5 ${wishlist.includes(property.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              </button>
                              <button
                                onClick={() => setShareModalProp(property)}
                                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:text-emerald-700"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <Link
                              href={`/properties/${property.slug}`}
                              className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm"
                              style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)', textDecoration: 'none' }}
                            >
                              View Full Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && viewMode !== 'map' && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-emerald-300 hover:text-emerald-700 transition-colors bg-white">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                      page === 1 ? 'text-white shadow-md shadow-emerald-900/10' : 'border border-gray-200 text-gray-600 hover:border-emerald-300 bg-white'
                    }`}
                    style={page === 1 ? { background: 'linear-gradient(135deg, #0F5132, #16a34a)', border: 'none' } : {}}
                  >
                    {page}
                  </button>
                ))}
                <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-emerald-300 hover:text-emerald-700 transition-colors bg-white">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsSidebarOpen(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg text-gray-900">Filters</h2>
              <button onClick={() => setIsSidebarOpen(false)} aria-label="Close filters">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              toggleCategory={toggleCategory}
              filteredCount={filtered.length}
              onClose={() => setIsSidebarOpen(false)}
            />
          </motion.div>
        </div>
      )}

      {/* Schedule Visit Modal */}
      {visitModalProp && (
        <ScheduleVisitModal
          propertyTitle={visitModalProp.title}
          propertyLocation={`${visitModalProp.location.locality}, ${visitModalProp.location.city}`}
          onClose={() => setVisitModalProp(null)}
        />
      )}

      {/* Share Modal */}
      {shareModalProp && (
        <ShareModal
          title={shareModalProp.title}
          url={typeof window !== 'undefined' ? `${window.location.origin}/properties/${shareModalProp.slug}` : `https://naradidevelopers.com/properties/${shareModalProp.slug}`}
          onClose={() => setShareModalProp(null)}
        />
      )}
    </div>
  );
}

