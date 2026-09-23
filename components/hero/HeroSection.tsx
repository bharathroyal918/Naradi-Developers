'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search, MapPin, ChevronDown, Shield, CheckCircle,
  ArrowRight, Map, IndianRupee, Layers,
} from 'lucide-react';

const quickFilters = [
  { label: 'Verified Only', value: 'verified' },
  { label: 'For Sale', value: 'sale' },
  { label: 'For Lease', value: 'lease' },
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Land', value: 'land' },
];

const popularLocations = [
  'Bengaluru', 'Yelahanka', 'Judicial Layout', 'Hosur', 'Chennai', 'Coimbatore', 'Mysore', 'Hyderabad',
];

const categories = [
  { label: 'All Land & Properties', slug: '' },
  { label: 'Residential Plots', slug: 'plots' },
  { label: 'Commercial Land', slug: 'commercial-land' },
  { label: 'Agricultural Land', slug: 'agricultural-land' },
  { label: 'Farm House', slug: 'farm-house' },
  { label: 'Warehouse / Logistics', slug: 'warehouse' },
  { label: 'Industrial Building', slug: 'industrial-building' },
  { label: 'Luxury Villas', slug: 'villas' },
  { label: 'Apartments', slug: 'apartments' },
];

const budgetRanges = [
  { label: 'Any Budget', value: '' },
  { label: 'Under ₹50 Lakhs', value: '5000000' },
  { label: '₹50 Lakhs – ₹1 Crore', value: '10000000' },
  { label: '₹1 Crore – ₹3 Crores', value: '30000000' },
  { label: '₹3 Crores – ₹10 Crores', value: '100000000' },
  { label: '₹10+ Crores (Ultra Luxury / Industrial)', value: '500000000' },
];

const areaRanges = [
  { label: 'Any Area', value: '' },
  { label: '1,200 – 2,400 sq.ft (Standard Plot)', value: 'plot' },
  { label: '2,400 – 5,000 sq.ft (Villa Plot)', value: 'large-plot' },
  { label: '1 – 5 Acres (Farmland / Estate)', value: 'farmland' },
  { label: '5 – 25+ Acres (Commercial / Industrial)', value: 'commercial' },
];

const trustChips = [
  { label: '100% Verified Listings', icon: Shield },
  { label: 'Legal Documentation Checked', icon: CheckCircle },
  { label: 'Zero Brokerage Marketplace', icon: IndianRupee },
  { label: 'Google Maps Enabled', icon: Map },
];

export default function HeroSection() {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState<string[]>(['verified', 'sale']);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [area, setArea] = useState('');

  const toggleFilter = (value: string) => {
    setActiveFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('city', location);
    if (category) params.set('category', category);
    if (budget) params.set('maxPrice', budget);
    if (area) params.set('areaRange', area);
    activeFilters.forEach((f) => params.set(f, 'true'));
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section
      id="hero"
      aria-label="Property search hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 lg:py-28"
    >
      {/* Background with Cinematic Drone Video & Fallback Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Drone Fallback Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=85')`,
          }}
        />

        {/* Luxury Emerald & Charcoal Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/85 to-gray-950/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-black/50" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-xl max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Small Badge */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 backdrop-blur-md border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Land Marketplace</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Large Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white max-w-5xl leading-[1.15] tracking-tight mb-5 drop-shadow-sm"
        >
          India&apos;s Trusted Broker-Free Marketplace for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
            Verified Lands
          </span>{' '}
          &amp; Premium Properties
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-200 text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed mb-8 font-light"
        >
          Buy, sell, and invest in verified land, residential, commercial, warehouse, and NRI-friendly properties across India with complete legal transparency.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-10"
        >
          {/* Primary (Gold) */}
          <Link
            href="/properties"
            className="px-6 py-3.5 rounded-2xl text-sm font-bold text-emerald-950 flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
            style={{
              background: 'linear-gradient(135deg, #C9A227, #e0c068)',
              boxShadow: '0 8px 24px rgba(201, 162, 39, 0.4)',
            }}
          >
            <span>Explore Lands</span>
            <ArrowRight className="w-4 h-4 text-emerald-950" />
          </Link>

          {/* Secondary (Outline) */}
          <Link
            href="/seller-portal"
            className="px-6 py-3.5 rounded-2xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10 hover:border-white/60 active:scale-95 transition-all backdrop-blur-md"
          >
            List Your Property (Free)
          </Link>
        </motion.div>

        {/* Floating Glass Search Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/40 text-left mb-8"
        >
          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 pb-4 mb-4 border-b border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">Quick Filters:</span>
            {quickFilters.map((qf) => {
              const isActive = activeFilters.includes(qf.value);
              return (
                <button
                  key={qf.value}
                  type="button"
                  onClick={() => toggleFilter(qf.value)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {qf.label}
                </button>
              );
            })}
          </div>

          {/* Search Inputs (4 Fields + Search Button) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
            {/* Field 1: Location */}
            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-700" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Yelahanka, Bengaluru"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Field 2: Property Category */}
            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Property Category</label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-700" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-9 pr-7 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:bg-white focus:border-emerald-600 outline-none appearance-none cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Field 3: Budget */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Budget</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-700" />
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-9 pr-6 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:bg-white focus:border-emerald-600 outline-none appearance-none cursor-pointer"
                >
                  {budgetRanges.map((b) => (
                    <option key={b.value} value={b.value}>{b.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Field 4: Area */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Area Range</label>
              <div className="relative">
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:bg-white focus:border-emerald-600 outline-none appearance-none cursor-pointer"
                >
                  {areaRanges.map((a) => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Field 5: Search Button */}
            <div className="lg:col-span-2 flex items-end">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all"
                style={{ background: 'linear-gradient(135deg, #0F5132, #166534)' }}
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Popular Location Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-gray-100/80 text-xs">
            <span className="text-[11px] text-gray-400 font-medium">Popular:</span>
            {popularLocations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocation(loc)}
                className="px-2 py-0.5 rounded-md bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 text-[11px] text-gray-600 transition-colors"
              >
                {loc}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Trust Chips (Staggered Animation) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-5"
        >
          {trustChips.map((chip) => (
            <div
              key={chip.label}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/15 text-xs text-gray-200"
            >
              <chip.icon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>{chip.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
