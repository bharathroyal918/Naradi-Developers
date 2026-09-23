'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2, Calendar, Share2, ArrowRight, MapPin, Shield, SlidersHorizontal, Sparkles } from 'lucide-react';
import { mockProperties } from '@/lib/mock/properties';
import type { Property } from '@/types';
import { formatPrice, formatArea } from '@/lib/utils';
import { ScheduleVisitModal } from '@/components/properties/ScheduleVisitModal';
import { ShareModal } from '@/components/properties/ShareModal';

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'prop-001',
    'prop-004',
    'prop-007',
  ]);
  const [selectedForTour, setSelectedForTour] = useState<Property | null>(null);
  const [selectedForShare, setSelectedForShare] = useState<Property | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('naradi_wishlist');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWishlistIds(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleRemove = (id: string) => {
    const updated = wishlistIds.filter((item) => item !== id);
    setWishlistIds(updated);
    localStorage.setItem('naradi_wishlist', JSON.stringify(updated));
  };

  const wishlistProperties = wishlistIds
    .map((id) => mockProperties.find((p) => p.id === id || p.slug === id))
    .filter(Boolean) as Property[];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 lg:pt-36">
      <div className="container-xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              Buyer Shortlist
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              My Saved Properties ({wishlistProperties.length})
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Track saved verified land deals, price revisions, and priority site inspection slots.
            </p>
          </div>

          {wishlistProperties.length > 1 && (
            <Link
              href="/properties/compare"
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors border border-emerald-200 flex items-center gap-1.5 shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Compare All Saved ({wishlistProperties.length})</span>
            </Link>
          )}
        </div>

        {/* Content */}
        {wishlistProperties.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-white border border-gray-200/80 shadow-sm space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-lg text-gray-900">Your wishlist is currently empty</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Explore verified residential plots, commercial land, and luxury villas and click the heart icon on any card to save it here.
            </p>
            <Link
              href="/properties"
              className="inline-block px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-md"
            >
              Explore Verified Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProperties.map((prop) => (
              <div
                key={prop.id}
                className="group rounded-3xl bg-white border border-gray-200/80 hover:border-emerald-600/40 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-slate-900 overflow-hidden">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {prop.isVerified && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 flex items-center gap-1 shadow-sm">
                          <Shield className="w-3 h-3 text-amber-400" />
                          Verified
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedForShare(prop)}
                        className="w-8 h-8 rounded-full bg-black/70 text-white hover:bg-black/90 flex items-center justify-center transition-colors shadow-sm"
                        aria-label="Share property"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(prop.id)}
                        className="w-8 h-8 rounded-full bg-black/70 text-rose-400 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow-md">
                      <span className="font-display font-black text-xl text-white">
                        {formatPrice(prop.pricing.totalPrice)}
                      </span>
                      <span className="text-xs font-semibold bg-black/60 px-2 py-0.5 rounded">
                        {formatArea(prop.pricing.totalArea, prop.pricing.areaUnit)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <Link href={`/properties/${prop.slug}`}>
                      <h3 className="font-display font-bold text-base text-gray-900 line-clamp-2 hover:text-emerald-700 transition-colors">
                        {prop.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                      {prop.location.address}, {prop.location.city}
                    </p>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed pt-1">
                      {prop.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedForTour(prop)}
                    className="py-2.5 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Site Visit</span>
                  </button>

                  <Link
                    href={`/properties/${prop.slug}`}
                    className="py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedForTour && (
        <ScheduleVisitModal
          property={selectedForTour}
          isOpen={!!selectedForTour}
          onClose={() => setSelectedForTour(null)}
        />
      )}

      {selectedForShare && (
        <ShareModal
          property={selectedForShare}
          isOpen={!!selectedForShare}
          onClose={() => setSelectedForShare(null)}
        />
      )}
    </div>
  );
}
