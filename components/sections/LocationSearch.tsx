'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { MapPin, ArrowRight, TrendingUp, Compass, CheckCircle } from 'lucide-react';

const stateLocations = [
  {
    state: 'Karnataka',
    capital: 'Bengaluru (Headquarters)',
    hubCity: 'Bengaluru, Yelahanka, Mysore, Hoskote',
    count: '4,850+ Verified Lands',
    trending: 'Top Growth Corridor',
    description: 'Home to North Bengaluru tech corridors, Judicial Layout, Devanahalli airport plots, and lush Mysore outskirts.',
    slug: 'bengaluru',
    popularLocalities: ['Yelahanka', 'Judicial Layout', 'Devanahalli', 'Sarjapur', 'Mysore Road'],
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80',
  },
  {
    state: 'Telangana',
    capital: 'Hyderabad',
    hubCity: 'Hyderabad, Cyberabad, Shamshabad',
    count: '2,320+ Verified Lands',
    trending: 'High Appreciation',
    description: 'Pharma City growth belt, Outer Ring Road (ORR) investment plots, and luxury weekend farm properties.',
    slug: 'hyderabad',
    popularLocalities: ['Mokila', 'Shadnagar', 'Shamshabad', 'Kollur', 'Maheshwaram'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    state: 'Maharashtra',
    capital: 'Mumbai / Pune',
    hubCity: 'Pune, Navi Mumbai, Alibaug',
    count: '1,980+ Verified Lands',
    trending: 'Industrial & Villa Plots',
    description: 'Pune IT belt expansions, coastal villa plots in Alibaug, and industrial warehousing near JNPT corridor.',
    slug: 'pune',
    popularLocalities: ['Wakad', 'Hinjewadi', 'Alibaug', 'Lonavala', 'Chakan'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  },
  {
    state: 'Tamil Nadu',
    capital: 'Chennai / Coimbatore',
    hubCity: 'Chennai, Hosur, Coimbatore',
    count: '3,100+ Verified Lands',
    trending: 'Manufacturing Corridor',
    description: 'Hosur electronics hub, ECR scenic coastal plots, and Coimbatore textile-industrial agricultural zones.',
    slug: 'chennai',
    popularLocalities: ['Hosur', 'ECR Road', 'OMR Corridor', 'Coimbatore', 'Krishnagiri'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  },
  {
    state: 'Andhra Pradesh',
    capital: 'Amaravati / Vizag',
    hubCity: 'Visakhapatnam, Vijayawada, Tirupati',
    count: '1,420+ Verified Lands',
    trending: 'Port & Tech Expansion',
    description: 'Coastal industrial corridors, port-adjacent commercial holdings, and high-yielding fertile farm belts.',
    slug: 'visakhapatnam',
    popularLocalities: ['Bhimili', 'Anandapuram', 'Gannavaram', 'Tirupati Highway'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    state: 'Kerala',
    capital: 'Kochi / Wayanad',
    hubCity: 'Kochi, Thrissur, Wayanad',
    count: '980+ Verified Lands',
    trending: 'Plantation & Tourism',
    description: 'Eco-tourism retreat estates, spices plantations, and premium Kochi backwater residential parcels.',
    slug: 'kochi',
    popularLocalities: ['Wayanad Estates', 'Kochi Infopark', 'Munnar Belt', 'Aluva'],
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
  },
];

export default function LocationSearch() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '300px' });
  const [activeState, setActiveState] = useState(stateLocations[0]);

  return (
    <section
      ref={ref}
      id="location-search"
      aria-label="Property search by location across India"
      className="py-20 lg:py-28 bg-[#fafaf9]"
    >
      <div className="container-xl max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(15,81,50,0.08)', color: '#0F5132' }}
          >
            <Compass className="w-3.5 h-3.5 text-emerald-800" />
            <span>Pan-India Presence</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Property Search by Location
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Discover verified plots and prime land holdings across India&apos;s highest growth states and development corridors.
          </p>
          <div className="w-16 h-1 rounded-full mx-auto mt-5" style={{ background: '#C9A227' }} />
        </motion.div>

        {/* State Selection Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {stateLocations.map((loc) => (
            <button
              key={loc.state}
              type="button"
              onClick={() => setActiveState(loc)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeState.state === loc.state
                  ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-900/20 scale-105'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-700 hover:text-emerald-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{loc.state}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeState.state === loc.state ? 'bg-emerald-950/50 text-amber-300' : 'bg-gray-100 text-gray-500'
              }`}>
                {loc.count.split('+')[0]}+
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Feature Showcase for Selected State */}
        <motion.div
          key={activeState.state}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-xl mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: State details & Localities */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold text-amber-800 bg-amber-100/70 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> {activeState.trending}
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  {activeState.count}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {activeState.state} Real Estate &amp; Land
              </h3>
              <p className="text-sm text-emerald-700 font-semibold mb-3">
                Key Hub: {activeState.hubCity}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {activeState.description}
              </p>

              {/* Popular Localities */}
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                  Top Investment Micro-Markets:
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeState.popularLocalities.map((loc) => (
                    <Link
                      key={loc}
                      href={`/properties?city=${encodeURIComponent(loc)}`}
                      className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 hover:bg-emerald-50 hover:border-emerald-600 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>{loc}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Explore Button */}
              <Link
                href={`/properties?city=${encodeURIComponent(activeState.slug)}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                style={{ background: 'linear-gradient(135deg, #0F5132, #15803d)' }}
              >
                <span>Explore All {activeState.state} Properties</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: State Landscape Photo */}
            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={activeState.image}
                  alt={`${activeState.state} land developments`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase tracking-widest text-amber-300 font-bold">100% Legal Due Diligence</p>
                  <p className="text-lg font-bold font-display">{activeState.capital}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6 Quick State Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {stateLocations.map((item, i) => (
            <motion.div
              key={item.state}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25, delay: i * 0.03 }}
            >
              <button
                type="button"
                onClick={() => setActiveState(item)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                  activeState.state === item.state
                    ? 'bg-emerald-950 text-white border-emerald-800 shadow-md'
                    : 'bg-white text-gray-800 border-gray-100 hover:border-emerald-200 hover:shadow'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold uppercase ${
                    activeState.state === item.state ? 'text-amber-400' : 'text-emerald-700'
                  }`}>
                    {item.state}
                  </span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                </div>
                <p className="text-xs font-bold truncate mb-0.5">{item.capital.split(' ')[0]}</p>
                <p className={`text-[10px] ${
                  activeState.state === item.state ? 'text-gray-300' : 'text-gray-400'
                }`}>
                  {item.count}
                </p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
