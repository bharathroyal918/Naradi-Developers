'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Search, Calendar, FileCheck, Award, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: '1. Discover Verified Properties',
    description: 'Filter through thousands of BDA, DTCP, and RERA approved land parcels with verified GPS coordinates, video walk-throughs, and boundary demarcations.',
    highlight: 'Filter by area, budget & zoning',
  },
  {
    step: '02',
    icon: Calendar,
    title: '2. Schedule Site Visit',
    description: 'Select your preferred date & time. Our certified surveyor meets you at the property with survey maps and layout approval documents.',
    highlight: 'Dedicated surveyor visit (₹2,000 token, 100% adjustable)',
  },
  {
    step: '03',
    icon: FileCheck,
    title: '3. Verify Documents',
    description: 'Review our exhaustive 30-year legal audit report covering Encumbrance Certificates, Patta, tax receipts, and municipal sanction plans.',
    highlight: 'Exhaustive title search audit',
  },
  {
    step: '04',
    icon: Award,
    title: '4. Finalize Registration',
    description: 'Execute the sale agreement directly with the registered owner. Our legal team coordinates sub-registrar paperwork with zero brokerage.',
    highlight: 'Direct owner registration • 0% Brokerage',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '300px' });

  return (
    <section
      ref={ref}
      id="how-it-works"
      aria-label="Buying land made simple 4-step timeline"
      className="py-20 lg:py-28 bg-white"
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
            style={{ background: 'rgba(201,162,39,0.1)', color: '#C9A227' }}
          >
            Streamlined Journey
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Buying Land Made Simple
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Four transparent steps from your first search to the sub-registrar registration — with zero brokerage and total peace of mind.
          </p>
          <div className="w-16 h-1 rounded-full mx-auto mt-5" style={{ background: '#0F5132' }} />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal Desktop Connector Line */}
          <div className="hidden lg:block absolute top-28 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700 -z-0 opacity-40" />

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="bg-stone-50 rounded-3xl p-6 sm:p-7 border border-gray-100 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number & Icon Circle */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-md border border-gray-100 group-hover:scale-110 group-hover:bg-emerald-800 transition-all duration-300"
                    >
                      <item.icon className="w-6 h-6 text-emerald-800 group-hover:text-amber-300 transition-colors" />
                    </div>
                    <span
                      className="font-display font-bold text-2xl"
                      style={{ color: '#C9A227' }}
                    >
                      {item.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2.5 group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Highlight Chip */}
                <div className="pt-4 border-t border-gray-200/60">
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/60 px-2.5 py-1 rounded-full inline-block">
                    ✓ {item.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, #0F5132, #15803d)' }}
          >
            <span>Start Exploring Properties Today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
