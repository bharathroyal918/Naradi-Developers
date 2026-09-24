'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const landCategories = [
  {
    title: 'Residential Plots',
    slug: 'plots',
    count: '3,840+ Listings',
    desc: 'Approved residential layout sites ready for construction',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    featured: true,
  },
  {
    title: 'Commercial Plots',
    slug: 'commercial-land',
    count: '1,220+ Listings',
    desc: 'Prime highway frontage & business corridor land',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    featured: false,
  },
  {
    title: 'Agricultural Land',
    slug: 'agricultural-land',
    count: '2,450+ Listings',
    desc: 'High-yield fertile acreage with reliable borewell & water rights',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    featured: false,
  },
  {
    title: 'Farm Land',
    slug: 'farm-house',
    count: '890+ Listings',
    desc: 'Tranquil countryside retreats for weekend farm houses & orchards',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80',
    featured: false,
  },
  {
    title: 'Industrial Land',
    slug: 'industrial-building',
    count: '640+ Listings',
    desc: 'Heavy power, logistics hubs & manufacturing zoning plots',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    featured: false,
  },
  {
    title: 'DTCP / RERA Plots',
    slug: 'plots',
    count: '4,100+ Listings',
    desc: '100% government sanctioned with clear non-agricultural conversion',
    image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=800&q=80',
    featured: false,
  },
  {
    title: 'Gated Community Plots',
    slug: 'plots',
    count: '1,530+ Listings',
    desc: 'Clubhouse, 24/7 security, underground cabling & paved avenues',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    featured: true,
  },
];

export default function TopCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '300px' });

  return (
    <section
      ref={ref}
      id="featured-categories"
      aria-label="Featured land categories"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="container-xl max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14"
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(15,81,50,0.08)', color: '#0F5132' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Asset Classes</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Featured Land Categories
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mt-2 max-w-2xl">
              Specialized land investments tailored for end-users, institutions, developers, and generational wealth creation.
            </p>
          </div>
          <Link
            href="/properties"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* 7 Category Cards in a Dynamic Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
          {landCategories.map((cat, idx) => {
            // Give cards responsive column spans:
            // Item 0 & 6 take 6 columns (large cards), others take 4 columns for balanced 12-column layout
            const colSpan = idx === 0 || idx === 6 ? 'lg:col-span-6' : 'lg:col-span-4';

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                className={colSpan}
              >
                <Link
                  href={`/properties/${cat.slug}`}
                  className="group relative block h-72 sm:h-80 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                >
                  {/* Large Landscape Background Image with Hover Zoom */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${cat.image})` }}
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Top Badge (Listing Count) */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/75 border border-white/20 text-xs font-semibold text-white">
                      {cat.count}
                    </span>
                  </div>

                  {/* Bottom Content: Title, Description, Explore Button */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
                    <h3 className="font-display text-2xl font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2 max-w-md mb-4 font-light">
                      {cat.desc}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/15">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-amber-300 transition-colors"
                      >
                        <span>Explore Properties</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-[11px] font-mono text-white/50">0{idx + 1}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
