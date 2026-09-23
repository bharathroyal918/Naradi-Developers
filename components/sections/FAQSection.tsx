'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const faqItems = [
  {
    id: 'faq-1',
    question: 'How does property verification work on Naradi?',
    answer: 'Every property goes through a rigorous two-tier verification. First, our legal desk conducts a 30-year title deed search, Encumbrance Certificate (EC) scrutiny, Patta/Chitta validity, and municipal layout sanction check (DTCP/BDA/RERA). Second, our field verification officers conduct on-site physical boundary inspection, road width validation, and GPS boundary mapping. Only properties that pass both stages receive the verified badge.',
  },
  {
    id: 'faq-2',
    question: 'Do buyers pay any brokerage or hidden charges?',
    answer: 'No. Absolutely zero brokerage. Naradi operates on a strict broker-free model connecting buyers and investors directly with verified title owners. You pay the agreed property price directly to the seller during registration. All platform discovery, site visit coordination, and basic document reviews are 100% free for buyers.',
  },
  {
    id: 'faq-3',
    question: 'How do NRI purchases work without traveling to India?',
    answer: 'NRIs can complete 100% of the land purchase remotely. We provide live 4K drone walk-throughs and FaceTime/WhatsApp video tours. Our legal counsel drafts a registered Special Power of Attorney (PoA) which you attest at your nearest Indian Embassy/Consulate. We assist with NRE/NRO fund transfers compliant with FEMA/RBI regulations and represent you during sub-registrar execution.',
  },
  {
    id: 'faq-4',
    question: 'What specific documents are verified before listing?',
    answer: 'We verify: (1) Mother Title Deed & Registered Sale Deeds, (2) Non-Encumbrance Certificate (EC) for up to 30 years, (3) Revenue Patta/Khata certificate in the current seller\'s name, (4) Government Survey Sketch / FMB sketch, (5) Approved Layout Plan from BDA / DTCP / Town Planning authority, and (6) Up-to-date Property Tax receipts and NOCs where applicable.',
  },
  {
    id: 'faq-5',
    question: 'How can I schedule a physical site visit?',
    answer: 'Simply click "Schedule Visit" on any property card or detail page, select your convenient date and time slot, and submit your phone number. Our local field officer will contact you within 2 business hours, share the exact Google Maps location pin, and personally meet you at the site with legal survey documents in hand.',
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [openId, setOpenId] = useState<string | null>('faq-1');

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions about buying and selling land"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="container-xl max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(15,81,50,0.08)', color: '#0F5132' }}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Everything you need to know about our legal verification, broker-free model, and site visit process.
          </p>
          <div className="w-16 h-1 rounded-full mx-auto mt-5" style={{ background: '#C9A227' }} />
        </motion.div>

        {/* Accordion */}
        <div ref={ref} className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-emerald-700 bg-[#fafaf9] shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <div className="flex items-center gap-3 sm:gap-4 pr-4">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 ${
                        isOpen ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className={`font-display font-bold text-base sm:text-lg ${
                      isOpen ? 'text-emerald-950' : 'text-gray-900'
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-800' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100/80">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="text-center mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Have a question not covered here?{' '}
            <Link href="/contact" className="font-bold text-emerald-800 hover:underline">
              Contact our property advisory team →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
