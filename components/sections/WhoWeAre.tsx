'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Target, Eye, HeartHandshake, ArrowRight, Award } from 'lucide-react';

const pillars = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To eliminate corruption, fraudulent titles, and arbitrary brokerage fees from Indian land transactions through technology, physical audits, and complete transparency.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    desc: 'To establish India\'s most trusted real estate ecosystem by 2030, empowering 1,000,000+ families, farmers, and global NRIs to transact land with institutional peace of mind.',
  },
  {
    icon: HeartHandshake,
    title: 'Our Values',
    desc: 'Integrity first, zero tolerance for title discrepancies, direct owner empowerment, and dedicated client-first fiduciary representation at every milestone.',
  },
];

export default function WhoWeAre() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="who-we-are"
      aria-label="About Naradi Developers and leadership"
      className="py-20 lg:py-28 bg-[#fafaf9]"
    >
      <div className="container-xl max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Primary Large Image */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                  alt="Naradi Developers Corporate Headquarters"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Secondary Overlapping Image */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                  alt="Verified Plotted Layouts"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Founder Tag Pill */}
              <div className="absolute top-6 left-6 px-4 py-2.5 rounded-2xl bg-emerald-950 text-white text-xs font-semibold border border-emerald-800 shadow-lg">
                <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Leadership</p>
                <p className="font-display font-bold text-sm">G.R Narendra Reddy</p>
                <p className="text-[10px] text-gray-300">Founder &amp; CEO</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story & 3 Pillar Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(201,162,39,0.12)', color: '#C9A227' }}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Who We Are</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Building Trust in Indian Real Estate
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
              Founded and led by <strong>G.R Narendra Reddy</strong>, Naradi Developers is headquartered at Judicial Layout, Yelahanka, Bengaluru. We were founded on a singular conviction: buying and selling land in India should never be fraught with legal ambiguity or exorbitant broker markups. Today, we stand as one of South India&apos;s most reputable broker-free platforms.
            </p>

            {/* Three Cards: Mission, Vision, Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {pillars.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-emerald-800" />
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 mb-1.5">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
            >
              <span>Read Full Company Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
