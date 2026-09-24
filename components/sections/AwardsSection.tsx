'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, ShieldCheck, FileCheck, Award, CheckCircle } from 'lucide-react';

const certifications = [
  {
    icon: ShieldCheck,
    title: 'RERA Registered Marketplace',
    tag: 'Govt. Sanctioned',
    desc: 'Fully compliant with Real Estate (Regulation and Development) Act standards across states.',
    accent: '#0F5132',
  },
  {
    icon: FileCheck,
    title: '30-Year Legal Due Diligence',
    tag: 'Audit Guarantee',
    desc: 'Strict multi-tier legal audit verifying encumbrance, patta, and link deeds before listing.',
    accent: '#C9A227',
  },
  {
    icon: Award,
    title: 'CREDAI Member Platform',
    tag: 'Industry Accreditation',
    desc: 'Proud member adhering to the highest code of conduct and ethics in land transactions.',
    accent: '#0F5132',
  },
  {
    icon: Trophy,
    title: 'Most Trusted Land Platform',
    tag: '2023 Real Estate Award',
    desc: 'Recognized for innovation in broker-free transactions and consumer transparency.',
    accent: '#C9A227',
  },
];

const partnerGroups = [
  {
    category: 'Finance Partners',
    logos: ['HDFC Bank', 'SBI Home Loans', 'LIC Housing Finance', 'ICICI Home Loans', 'Bank of Baroda'],
  },
  {
    category: 'Legal & Verification Partners',
    logos: ['Bar Council Verified Legal Cells', 'LexTerra Advocates', 'IndoLegal Due Diligence Group'],
  },
  {
    category: 'Developers & Construction Partners',
    logos: ['Prestige Group Developments', 'Sobha Layout Projects', 'Brigade Green Belts', 'Godrej Land Corp'],
  },
];

export default function AwardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '300px' });

  return (
    <section
      ref={ref}
      id="awards-certifications"
      aria-label="Certifications, awards and institutional partners"
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
            style={{ background: 'rgba(201,162,39,0.12)', color: '#C9A227' }}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Accreditations &amp; Recognition</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Certifications &amp; Awards
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Built on stringent regulatory compliance, validated by premier financial institutions and industry bodies.
          </p>
          <div className="w-16 h-1 rounded-full mx-auto mt-5" style={{ background: '#C9A227' }} />
        </motion.div>

        {/* 4 Horizontal Certification Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {certifications.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ background: `${item.accent}12` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.accent }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-gray-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Status Active</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Investor / Partner Logo Slider Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-md">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Institutional Ecosystem
            </p>
            <h3 className="font-display text-2xl font-bold text-gray-900">
              Trusted Banking, Legal &amp; Development Partners
            </h3>
          </div>

          <div className="space-y-8">
            {partnerGroups.map((group) => (
              <div key={group.category} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4 text-center sm:text-left">
                  {group.category}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
                  {group.logos.map((logo) => (
                    <div
                      key={logo}
                      className="px-5 py-3 rounded-2xl bg-[#fafaf9] border border-gray-200 text-xs sm:text-sm font-bold text-gray-700 hover:border-emerald-600 hover:text-emerald-900 hover:bg-white hover:shadow-sm transition-all cursor-default"
                    >
                      {logo}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
