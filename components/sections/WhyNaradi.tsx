'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Scale, FileText, Compass, ArrowRight } from 'lucide-react';

const serviceCards = [
  {
    icon: ShieldCheck,
    title: 'Verified Properties',
    description: 'Every land parcel, plot, and commercial space goes through an exhaustive multi-point verification covering on-site boundaries, legal ownership, and municipal approvals before appearing on our marketplace.',
    href: '/verification',
    tag: 'Physical & Digital Check',
    accent: '#0F5132',
  },
  {
    icon: Scale,
    title: 'Transparent Transactions',
    description: 'Direct buyer-to-seller interactions with no middleman inflation. Fixed transparent pricing, no hidden brokerage fees, and clear disclosure of all statutory costs and government charges.',
    href: '/buyers',
    tag: '0% Brokerage',
    accent: '#C9A227',
  },
  {
    icon: FileText,
    title: 'Legal Documentation Support',
    description: 'Dedicated legal advocates assist with 30-year Encumbrance Certificates (EC), Patta/Chitta transfers, BDA/DTCP master plan compliance, sale deed drafts, and sub-registrar appointments.',
    href: '/verification',
    tag: '30-Year Title Search',
    accent: '#0F5132',
  },
  {
    icon: Compass,
    title: 'Dedicated Investment Guidance',
    description: 'Tailored property advisory for high-net-worth investors, developers, and NRIs. Data-driven growth corridor insights across Bengaluru, Hyderabad, and major South Indian industrial belts.',
    href: '/nri-services',
    tag: 'High-ROI Insights',
    accent: '#C9A227',
  },
];

export default function WhyNaradi() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="why-naradi"
      aria-label="Why thousands trust Naradi Developers"
      className="py-20 lg:py-28 bg-[#fafaf9]"
    >
      <div className="container-xl max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(15,81,50,0.08)', color: '#0F5132' }}
          >
            The Naradi Advantage
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Why Thousands Trust Naradi
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            We are redefining real estate by eliminating middlemen, guaranteeing legal clarity, and putting buyers and land owners directly in control.
          </p>
          <div className="w-16 h-1 rounded-full mx-auto mt-5" style={{ background: '#C9A227' }} />
        </motion.div>

        {/* 4 Premium Service Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                    style={{
                      background: `${card.accent}12`,
                      border: `1px solid ${card.accent}25`,
                    }}
                  >
                    <card.icon className="w-7 h-7" style={{ color: card.accent }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                    {card.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-800 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Learn More Arrow */}
              <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 group-hover:text-emerald-950 group-hover:gap-3 transition-all"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 text-amber-600" />
                </Link>
                <span className="text-[11px] font-mono text-gray-300">0{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
