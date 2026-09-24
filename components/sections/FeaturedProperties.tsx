'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  MapPin, Heart, Share2, Eye, Calendar,
  Shield, ArrowRight, ChevronLeft, ChevronRight,
  Sparkles,
} from 'lucide-react';
import { mockProperties } from '@/lib/mock/properties';
import { formatPrice, formatArea, categoryLabels } from '@/lib/utils';

function PropertyCard({ property, index }: { property: typeof mockProperties[0]; index: number }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.origin + `/properties/${property.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.15) }}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
    >
      {/* Top Image Slider & Badges */}
      <div>
        <div className="relative h-60 overflow-hidden bg-gray-100">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('${property.images[imgIndex]}')` }}
          />

          {/* Dark gradient edge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

          {/* Image Nav Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setImgIndex((p) => (p - 1 + property.images.length) % property.images.length);
                }}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/85 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setImgIndex((p) => (p + 1) % property.images.length);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/85 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {property.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      setImgIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      i === imgIndex ? 'bg-white w-4' : 'bg-white/60 w-1.5'
                    }`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Top Left Badges: Verified, DTCP, RERA */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.isVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-900 text-white shadow-sm">
                <Shield className="w-3 h-3 text-amber-300" /> 100% Verified
              </span>
            )}
            {property.isDTCP && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-800 text-white shadow-sm">
                DTCP / BDA
              </span>
            )}
            {property.isRERA && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-800 text-white shadow-sm">
                RERA
              </span>
            )}
          </div>

          {/* Top Right: Type Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-sm"
              style={{
                background: property.listingType === 'sale' ? '#0f5132' : '#c9a227',
              }}
            >
              {property.listingType === 'lease' ? 'For Lease' : 'For Sale'}
            </span>
          </div>

          {/* Bottom Floating Action Icons: Save & Share */}
          <div className="absolute bottom-3 right-3 flex gap-2 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save property'}
              title={isWishlisted ? 'Saved' : 'Save property'}
            >
              <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
            </button>
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform"
              aria-label="Share property link"
              title={copied ? 'Link Copied!' : 'Share property'}
            >
              <Share2 className={`w-4 h-4 transition-colors ${copied ? 'text-emerald-700' : 'text-gray-700'}`} />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Category & Views */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {categoryLabels[property.category] || property.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <Eye className="w-3 h-3" /> {property.views.toLocaleString()} views
            </span>
          </div>

          {/* Property Name */}
          <h3 className="font-display font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-1 group-hover:text-emerald-800 transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
            <span className="truncate">{property.location.address || property.location.locality}, {property.location.city}</span>
          </div>

          {/* Price & Area */}
          <div className="flex items-end justify-between mb-4 pb-3.5 border-b border-gray-100">
            <div>
              <div className="font-display font-bold text-xl text-gray-950 leading-tight">
                {formatPrice(property.pricing.totalPrice)}
                {property.listingType === 'lease' && <span className="text-xs font-normal text-gray-500">/mo</span>}
              </div>
              {property.pricing.pricePerSqFt && (
                <div className="text-[11px] text-gray-400">
                  ₹{property.pricing.pricePerSqFt.toLocaleString()}/sq.ft
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="font-bold text-sm text-emerald-900">
                {formatArea(property.pricing.totalArea, property.pricing.areaUnit)}
              </div>
              {property.pricing.facing && (
                <div className="text-[11px] text-gray-400 capitalize">{property.pricing.facing} facing</div>
              )}
            </div>
          </div>

          {/* Amenities Chips */}
          {property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {property.amenities.slice(0, 3).map((amenity) => (
                <span key={amenity.id} className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                  {amenity.name}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-[10px] text-gray-400">+{property.amenities.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Buttons (View Details + Schedule Visit) */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <Link
          href={`/properties/${property.slug}`}
          className="text-center py-2.5 rounded-xl font-bold text-xs text-white shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1"
          style={{ background: 'linear-gradient(135deg, #0F5132, #166534)' }}
        >
          <span>View Details</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
        <Link
          href={`/properties/${property.slug}#visit`}
          className="text-center py-2.5 rounded-xl font-semibold text-xs text-emerald-900 bg-emerald-50 hover:bg-emerald-100 active:scale-95 transition-colors flex items-center justify-center gap-1.5 border border-emerald-200"
        >
          <Calendar className="w-3.5 h-3.5 text-emerald-700" />
          <span>Schedule Visit</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function FeaturedProperties() {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '300px' });

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      id="featured-properties"
      aria-label="Featured luxury land and properties"
      className="py-20 lg:py-28 bg-[#fafaf9]"
    >
      <div className="container-xl max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Carousel Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(201,162,39,0.12)', color: '#C9A227' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Opportunities</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Featured Verified Properties
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mt-2 max-w-2xl">
              Prime residential plots, highway commercial land, and scenic farm retreats with verified clear titles.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-5 md:mt-0">
            {/* Carousel Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-600 hover:text-emerald-800 transition-colors shadow-sm"
                aria-label="Previous properties"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-600 hover:text-emerald-800 transition-colors shadow-sm"
                aria-label="Next properties"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              href="/properties"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-950"
              style={{ background: '#C9A227' }}
            >
              <span>Explore All (12,500+)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Carousel / Grid Container */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {mockProperties.slice(0, 8).map((prop, idx) => (
            <div
              key={prop.id}
              className="w-[320px] sm:w-[360px] lg:w-[380px] flex-shrink-0 snap-start"
            >
              <PropertyCard property={prop} index={idx} />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="text-center mt-6 sm:hidden">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-gray-950"
            style={{ background: '#C9A227' }}
          >
            <span>Explore All 12,500+ Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
