'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid3X3, List, Filter, Shield, MapPin, Sparkles,
  Search, SlidersHorizontal, ArrowUpDown, ChevronRight, CheckCircle2,
  Calendar, Phone, MessageCircle, Heart, Share2, Eye
} from 'lucide-react';
import type { Property, PropertyCategory } from '@/types';
import { formatPrice, formatArea } from '@/lib/utils';
import { ScheduleVisitModal } from '@/components/properties/ScheduleVisitModal';
import { ShareModal } from '@/components/properties/ShareModal';

export interface CategoryPill {
  id: string;
  label: string;
}

interface CategoryMarketplaceViewProps {
  category: PropertyCategory;
  categoryTitle: string;
  categorySubtitle: string;
  heroImage: string;
  badge: string;
  specialPills: CategoryPill[];
  properties: Property[];
  faqs?: { q: string; a: string }[];
}

export function CategoryMarketplaceView({
  category,
  categoryTitle,
  categorySubtitle,
  heroImage,
  badge,
  specialPills,
  properties,
  faqs,
}: CategoryMarketplaceViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPill, setSelectedPill] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'area'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPropertyForTour, setSelectedPropertyForTour] = useState<Property | null>(null);
  const [selectedPropertyForShare, setSelectedPropertyForShare] = useState<Property | null>(null);

  // Filter properties
  const filteredProperties = useMemo(() => {
    let list = properties.filter((p) => p.category === category && p.status !== 'sold');

    if (selectedPill) {
      if (selectedPill === 'verified') {
        list = list.filter((p) => p.isVerified);
      } else if (selectedPill === 'dtcp') {
        list = list.filter((p) => p.isDTCP);
      } else if (selectedPill === 'rera') {
        list = list.filter((p) => p.isRERA);
      } else if (selectedPill === 'clear-title' || selectedPill === 'patta') {
        list = list.filter((p) => p.isVerified || p.documents.some((d) => d.name.toLowerCase().includes('patta') || d.name.toLowerCase().includes('title')));
      } else if (selectedPill === 'water' || selectedPill === 'borewell') {
        list = list.filter((p) => p.amenities.some((a) => a.name.toLowerCase().includes('water') || a.name.toLowerCase().includes('borewell')));
      } else if (selectedPill === 'highway' || selectedPill === 'corner') {
        list = list.filter((p) => (p.roadWidth && parseInt(p.roadWidth) >= 40) || p.amenities.some((a) => a.name.toLowerCase().includes('highway') || a.name.toLowerCase().includes('road')));
      } else if (selectedPill === 'clubhouse' || selectedPill === 'pool') {
        list = list.filter((p) => p.amenities.some((a) => a.name.toLowerCase().includes('clubhouse') || a.name.toLowerCase().includes('gym') || a.name.toLowerCase().includes('pool')));
      } else if (selectedPill === '3bhk' || selectedPill === '4bhk') {
        list = list.filter((p) => p.pricing.bedrooms && p.pricing.bedrooms >= 3);
      } else if (selectedPill === 'dock' || selectedPill === 'power' || selectedPill === 'crane' || selectedPill === 'heavy') {
        list = list.filter((p) => p.amenities.some((a) => a.name.toLowerCase().includes('power') || a.name.toLowerCase().includes('dock') || a.name.toLowerCase().includes('crane') || a.name.toLowerCase().includes('industrial')));
      } else {
        list = list.filter((p) =>
          p.title.toLowerCase().includes(selectedPill.toLowerCase()) ||
          p.amenities.some((a) => a.name.toLowerCase().includes(selectedPill.toLowerCase()))
        );
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.locality.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.pricing.totalPrice - b.pricing.totalPrice);
        break;
      case 'price-high':
        list.sort((a, b) => b.pricing.totalPrice - a.pricing.totalPrice);
        break;
      case 'area':
        list.sort((a, b) => b.pricing.totalArea - a.pricing.totalArea);
        break;
      case 'newest':
      default:
        list.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
        break;
    }

    return list;
  }, [properties, category, selectedPill, specialPills, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Category Hero Banner */}
      <div className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022019] text-white">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={categoryTitle}
            className="w-full h-full object-cover object-center opacity-25 mix-blend-overlay scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-transparent to-black/30" />
        </div>

        <div className="container-xl relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {badge}
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
              {categoryTitle}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl font-normal">
              {categorySubtitle}
            </p>

            {/* Quick Stats Banner */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                100% Legally Clear Titles
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                Zero Brokerage Direct Deals
              </span>
              <span>•</span>
              <span>{filteredProperties.length} Listings Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container-xl py-8 space-y-6">
        {/* Filters and Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by locality, area, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
              />
            </div>

            {/* Right Controls: Sort + View Mode */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 outline-none focus:border-emerald-600 bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="area">Largest Area</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center p-1 bg-gray-100 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
                  aria-label="Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Special Category Filter Pills */}
          {specialPills.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedPill(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedPill === null
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({properties.filter((p) => p.category === category).length})
              </button>

              {specialPills.map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedPill(selectedPill === pill.id ? null : pill.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedPill === pill.id
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Listings Grid / List */}
        {filteredProperties.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-gray-200/80 space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No properties found matching criteria</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Try resetting your search keywords or switching filters to see more verified listings in this category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedPill(null);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="group rounded-3xl bg-white border border-gray-200/80 hover:border-emerald-600/40 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Carousel */}
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {prop.isVerified && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-900/90 backdrop-blur-md text-emerald-300 flex items-center gap-1">
                          <Shield className="w-3 h-3 text-amber-400" />
                          Verified
                        </span>
                      )}
                      {prop.isDTCP && (
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-black/60 backdrop-blur-md text-white">
                          DTCP / BDA
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedPropertyForShare(prop)}
                        className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                        aria-label="Share property"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow-md">
                      <span className="font-display font-black text-xl text-white">
                        {formatPrice(prop.pricing.totalPrice)}
                      </span>
                      <span className="text-xs font-semibold bg-black/50 backdrop-blur-md px-2 py-0.5 rounded">
                        {formatArea(prop.pricing.totalArea, prop.pricing.areaUnit)}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <Link href={`/properties/${prop.slug}`}>
                      <h3 className="font-display font-bold text-base text-gray-900 line-clamp-2 hover:text-emerald-700 transition-colors">
                        {prop.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-500 flex items-center gap-1 line-clamp-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                      {prop.location.address}, {prop.location.city}
                    </p>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>

                    {/* Quick Amenities */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {prop.amenities.slice(0, 3).map((a) => (
                        <span
                          key={a.id}
                          className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-medium text-gray-600"
                        >
                          {a.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPropertyForTour(prop)}
                    className="py-2.5 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-800 hover:bg-emerald-100/80 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Site Visit</span>
                  </button>

                  <Link
                    href={`/properties/${prop.slug}`}
                    className="py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="group rounded-3xl bg-white border border-gray-200/80 hover:border-emerald-600/40 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row items-stretch"
              >
                <div className="relative w-full sm:w-72 h-52 sm:h-auto flex-shrink-0 bg-slate-900">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {prop.isVerified && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-900/90 backdrop-blur-md text-emerald-300 flex items-center gap-1">
                      <Shield className="w-3 h-3 text-amber-400" /> Verified
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/properties/${prop.slug}`}>
                          <h3 className="font-display font-bold text-lg text-gray-900 hover:text-emerald-700 transition-colors">
                            {prop.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                          {prop.location.address}, {prop.location.city}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="font-display font-black text-xl text-emerald-800">
                          {formatPrice(prop.pricing.totalPrice)}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {formatArea(prop.pricing.totalArea, prop.pricing.areaUnit)}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {prop.amenities.map((a) => (
                        <span
                          key={a.id}
                          className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[11px] font-medium text-gray-600"
                        >
                          {a.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedPropertyForShare(prop)}
                        className="text-xs font-semibold text-gray-500 hover:text-emerald-700 flex items-center gap-1"
                      >
                        <Share2 className="w-3.5 h-3.5" /> Share
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPropertyForTour(prop)}
                        className="px-4 py-2 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Schedule Visit</span>
                      </button>

                      <Link
                        href={`/properties/${prop.slug}`}
                        className="px-4 py-2 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FAQs if provided */}
        {faqs && faqs.length > 0 && (
          <div className="mt-12 p-8 rounded-3xl bg-white border border-gray-200/80 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Helpful Information</span>
              <h2 className="font-display text-2xl font-bold text-gray-900 mt-1">Frequently Asked Questions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                  <h4 className="font-bold text-sm text-gray-900">{faq.q}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedPropertyForTour && (
        <ScheduleVisitModal
          property={selectedPropertyForTour}
          isOpen={!!selectedPropertyForTour}
          onClose={() => setSelectedPropertyForTour(null)}
        />
      )}

      {selectedPropertyForShare && (
        <ShareModal
          property={selectedPropertyForShare}
          isOpen={!!selectedPropertyForShare}
          onClose={() => setSelectedPropertyForShare(null)}
        />
      )}
    </div>
  );
}

export default CategoryMarketplaceView;
