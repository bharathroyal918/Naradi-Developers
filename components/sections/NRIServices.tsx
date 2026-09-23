'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Users, FileCheck2, Building, Calendar, ArrowRight, CheckCircle2, Video, Globe2 } from 'lucide-react';

const nriCards = [
  {
    icon: Users,
    title: 'Dedicated NRI Support Team',
    description: 'Personal relationship managers who operate in your time zone (USA, UAE, Singapore, UK, Australia). We arrange 4K drone walk-throughs, live video visits, and neighborhood analysis.',
    highlights: [
      'Time zone aligned relationship manager',
      'Live WhatsApp 4K drone site visits',
      'Unbiased locality price intelligence',
    ],
    ctaText: 'Meet Your Concierge',
    href: '/nri-services',
    tag: 'Global Concierge',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
  },
  {
    icon: FileCheck2,
    title: 'Complete Documentation Assistance',
    description: 'Never worry about cross-border legalities. Our certified advocates prepare Power of Attorney (PoA) drafts, coordinate Indian embassy attestations, and run 30-year title searches without you flying down.',
    highlights: [
      'Embassy PoA drafting & attestation',
      '30-year non-encumbrance certification',
      'NRE / NRO banking & FEMA compliance',
    ],
    ctaText: 'Explore Legal Services',
    href: '/nri-services#legal',
    tag: '100% Remote Process',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&q=80',
  },
  {
    icon: Building,
    title: 'Easy Property Handling',
    description: 'Complete post-purchase lifecycle management. From boundary compound wall construction and survey marking to tenant leasing, maintenance, and seamless capital repatriation under RBI guidelines.',
    highlights: [
      'Physical boundary marking & fencing',
      'Periodic physical site inspection reports',
      'Repatriation of sale proceeds guidance',
    ],
    ctaText: 'Explore Asset Management',
    href: '/nri-services#management',
    tag: 'End-to-End Care',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  },
];

export default function NRIServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="nri-services"
      aria-label="NRI real estate investment services"
      className="py-20 lg:py-28 bg-gradient-to-br from-emerald-950 via-emerald-900 to-gray-950 text-white relative overflow-hidden"
    >
      {/* Decorative Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-xl max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-bold uppercase tracking-wider bg-white/10 text-amber-300 border border-white/15">
            <Globe2 className="w-3.5 h-3.5" />
            <span>International Investor Desk</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            NRI Services
          </h2>
          <p className="text-emerald-100/90 text-base sm:text-xl font-light leading-relaxed">
            Invest in Indian Real Estate from Anywhere in the World.
          </p>
          <div className="w-16 h-1 rounded-full mx-auto mt-5" style={{ background: '#C9A227' }} />
        </motion.div>

        {/* Three Large Cards */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {nriCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.14 }}
              className="bg-emerald-900/60 rounded-3xl p-7 border border-white/15 hover:border-amber-400/50 hover:bg-emerald-900/80 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Top Image & Badge */}
                <div className="relative h-44 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                    {card.tag}
                  </div>
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-emerald-800/90 flex items-center justify-center text-white">
                    <card.icon className="w-5 h-5 text-amber-300" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-6 font-light">
                  {card.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {card.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2 text-xs text-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card CTA */}
              <Link
                href={card.href}
                className="w-full py-3 rounded-2xl font-bold text-xs text-center border border-white/30 text-white group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-emerald-950 transition-all flex items-center justify-center gap-2"
              >
                <span>{card.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner: Schedule Virtual Consultation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 border border-amber-400/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Video className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                Schedule a 1-on-1 Virtual Consultation
              </h3>
              <p className="text-emerald-200 text-xs sm:text-sm font-light">
                Connect with our senior NRI investment advisor via Google Meet or Zoom to discuss land, plots, and legal procedures.
              </p>
            </div>
          </div>

          <Link
            href="/contact?subject=NRI+Consultation"
            className="px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-emerald-950 flex-shrink-0 shadow-lg hover:scale-105 active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, #C9A227, #e0c068)' }}
          >
            Book Free Virtual Session →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
