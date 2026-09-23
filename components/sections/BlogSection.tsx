'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

const featuredPost = {
  title: 'The Ultimate Guide to Buying Land in Karnataka & South India (2025–2026)',
  slug: 'ultimate-guide-buying-land-karnataka',
  excerpt: 'A comprehensive legal roadmap detailing 30-year Encumbrance Certificates, BDA/DTCP sanctions, conversion from agricultural (DC conversion) to residential use, and sub-registrar stamp duty breakdowns.',
  date: 'March 18, 2026',
  readTime: '8 min read',
  category: 'Legal Due Diligence',
  author: 'Naradi Legal Research Desk',
  image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&q=80',
};

const smallPosts = [
  {
    title: 'DTCP vs BDA vs RERA: What Approvals Actually Matter for Plot Buyers?',
    slug: 'dtcp-bda-rera-approvals-difference',
    excerpt: 'Demystifying planning authorities across Bengaluru, Hosur, and Chennai. How to verify layout sanction numbers online.',
    date: 'March 10, 2026',
    readTime: '5 min read',
    category: 'Regulatory',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    title: 'NRI Guide: How to Buy and Register Agricultural Land in India Legally',
    slug: 'nri-guide-agricultural-land-purchase',
    excerpt: 'Understanding FEMA regulations, RBI guidelines, and ancestral inheritance rules regarding non-residential farmland acquisitions.',
    date: 'Feb 28, 2026',
    readTime: '6 min read',
    category: 'NRI Advisory',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
  },
  {
    title: 'Top 5 High-Appreciation Growth Corridors in North Bengaluru & Yelahanka',
    slug: 'north-bengaluru-yelahanka-growth-corridors',
    excerpt: 'Airport expansion, peripheral ring roads, and institutional tech campuses driving unprecedented 18%+ annual land appreciation.',
    date: 'Feb 15, 2026',
    readTime: '4 min read',
    category: 'Market Trends',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  },
];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="blog"
      aria-label="Property insights, articles and real estate market guides"
      className="py-20 lg:py-28 bg-[#fafaf9]"
    >
      <div className="container-xl max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14"
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(15,81,50,0.08)', color: '#0F5132' }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Knowledge Center</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Latest Property Insights
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mt-2 max-w-2xl">
              Expert articles, legal guides, and market analysis written by our in-house property advocates and land analysts.
            </p>
          </div>

          <Link
            href="/buyers"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>Explore All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Blog Grid (1 Large Featured + 3 Smaller Cards) */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Large Featured Article (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-72 sm:h-88 overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-950 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-md">
                  {featuredPost.category}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featuredPost.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-emerald-800 transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <Link
                href="/buyers"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 group-hover:text-emerald-950 transition-colors"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* 3 Smaller Article Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            {smallPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all flex flex-col sm:flex-row gap-5 group"
              >
                <div className="sm:w-36 sm:h-32 h-44 rounded-2xl overflow-hidden flex-shrink-0 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-[9px] font-bold text-white">
                    {post.category}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-1">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-gray-900 line-clamp-2 leading-snug group-hover:text-emerald-800 transition-colors mb-1.5">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-light">
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    href="/buyers"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 mt-2.5 hover:text-emerald-950"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
