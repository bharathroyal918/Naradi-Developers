'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ShieldCheck, Banknote, Users, CheckCircle2,
  FileSearch, Calendar, ArrowRight, Award,
} from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Verified Legal Documents',
    desc: 'Full 30-year mother deed review, non-encumbrance assurance, and municipal zoning validation.',
  },
  {
    icon: Banknote,
    title: 'Transparent Pricing',
    desc: 'Fair market-indexed pricing with no artificially inflated broker markups or commission cuts.',
  },
  {
    icon: Award,
    title: 'Zero Brokerage',
    desc: 'Deal directly with verified title owners. Buyers and investors pay ₹0 in brokerage fees.',
  },
  {
    icon: Users,
    title: 'Dedicated Relationship Manager',
    desc: 'A single point of contact who navigates land due diligence, field visits, and documentation.',
  },
  {
    icon: FileSearch,
    title: 'Property Verification',
    desc: 'On-ground boundary demarcation, survey sketch verification, and road width physical audits.',
  },
  {
    icon: Calendar,
    title: 'Site Visit Coordination',
    desc: 'Dedicated accompanied site inspection with land surveyor & legal packs (nominal ₹2,000 commitment token, 100% adjusted on purchase).',
  },
];

export default function WhyInvest() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '300px' });

  return (
    <section
      ref={ref}
      id="why-invest"
      aria-label="Why invest in land through Naradi Developers"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="container-xl max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Card with Illustration & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80"
                  alt="Naradi Developers Land Inspection"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/20" />
              </div>

              {/* Floating Overlay Badge (Bottom Left) */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-gray-900 text-sm">30-Year Legal Guarantee</p>
                    <p className="text-xs text-gray-500">Every title deed audited by senior advocates</p>
                  </div>
                </div>
              </div>

              {/* Floating Trust Pill (Top Right) */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-2xl bg-amber-400 text-emerald-950 font-bold text-xs shadow-lg flex items-center gap-1.5 border border-amber-300">
                <span>0% Brokerage Platform</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Title & 6 Benefits List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="lg:col-span-7"
          >
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(15,81,50,0.08)', color: '#0F5132' }}
            >
              The Smart Investor Choice
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Why Invest Through Naradi
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
              We remove the complexity and legal anxiety from property transactions by providing verified documentation, direct owner connections, and institutional rigor.
            </p>

            {/* 6 Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="p-4 rounded-2xl bg-[#fafaf9] border border-gray-100 hover:border-emerald-200 transition-colors flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <b.icon className="w-5 h-5 text-emerald-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 mb-1">{b.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/buyers"
                className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #0F5132, #15803d)' }}
              >
                <span>Read Complete Buyer Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/verification"
                className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold text-gray-800 border border-gray-300 hover:border-emerald-700 hover:text-emerald-800 transition-colors"
              >
                See Verification Checklist →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
