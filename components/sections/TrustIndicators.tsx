'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, FileCheck, Globe, Banknote } from 'lucide-react';

const trustMetrics = [
  {
    icon: ShieldCheck,
    title: '100% Verified Listings',
    description: 'Every property undergoes thorough physical verification & boundary checks.',
    stat: '12,500+',
    statLabel: 'Properties Verified',
  },
  {
    icon: FileCheck,
    title: 'Legal Documentation Checked',
    description: '30-year encumbrance search, patta, and master plan approval scrutiny.',
    stat: '30-Year',
    statLabel: 'Title Due Diligence',
  },
  {
    icon: Globe,
    title: 'Trusted NRI Assistance',
    description: 'End-to-end remote buying, Power of Attorney handling, & virtual site visits.',
    stat: '1,800+',
    statLabel: 'Global Clients Served',
  },
  {
    icon: Banknote,
    title: 'No Brokerage Marketplace',
    description: 'Direct owner transactions. Transparent pricing with zero hidden commission.',
    stat: '₹0',
    statLabel: 'Commission Charged',
  },
];

export default function TrustIndicators() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section
      id="trust-strip"
      aria-label="Trust strip"
      className="relative z-20 -mt-10 sm:-mt-14 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100/80"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {trustMetrics.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex items-start gap-4 pt-4 sm:pt-0 ${index > 0 ? 'sm:pl-6' : ''} group hover:-translate-y-1 transition-transform duration-300`}
            >
              {/* Green Circular Background */}
              <div
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: 'linear-gradient(135deg, #0F5132, #15803d)',
                  boxShadow: '0 6px 18px rgba(15, 81, 50, 0.25)',
                }}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>

              {/* Text & Stats */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display font-bold text-lg text-emerald-950">{item.stat}</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{item.statLabel}</span>
                </div>
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-emerald-800 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
