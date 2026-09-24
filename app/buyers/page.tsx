import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, CheckCircle, FileText, Calculator, ArrowRight, Shield, BookOpen, Users, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Buyers — Naradi Developers',
  description: 'Complete buyer guide for purchasing verified land and properties in India. Loan calculator, legal assistance, site visits, and property comparison tools.',
};

const buyingSteps = [
  { step: 1, title: 'Register for Free', desc: 'Create your buyer account in 2 minutes. No subscription required.', icon: Users },
  { step: 2, title: 'Search & Shortlist', desc: 'Use our advanced filters to find your perfect property. Save to wishlist.', icon: Search },
  { step: 3, title: 'Request Site Visit', desc: 'Schedule an accompanied site visit with a certified land surveyor. A nominal ₹2,000 commitment token (100% adjustable against booking) ensures serious buyers get dedicated, time-efficient inspections.', icon: CheckCircle },
  { step: 4, title: 'Legal Verification', desc: 'Our experts verify all legal documents — 30-year title, EC, patta.', icon: Shield },
  { step: 5, title: 'Loan & Finance', desc: 'Get pre-approved home loans from our banking partners at best rates.', icon: Calculator },
  { step: 6, title: 'Register & Own', desc: 'Complete the registration with our legal team support. Enjoy your property!', icon: FileText },
];

const buyerBenefits = [
  'Zero brokerage — save 1-2% commission',
  'Legally verified properties only',
  'Dedicated accompanied site visits (₹2,000 token, 100% adjustable)',
  '30-year title check guarantee',
  'Dedicated support throughout purchase',
  'Home loan assistance at 8.5% p.a.',
  'NRI-friendly remote buying',
  'Property comparison tools',
];

const featuredFAQs = [
  {
    q: 'Is it really broker-free?',
    a: 'Yes! Naradi is a direct marketplace. You connect directly with property owners. No broker fees, no commissions.',
  },
  {
    q: 'How do I know the property is legally safe?',
    a: 'Every listed property undergoes our 12-point verification — title deed, encumbrance, patta, DTCP/RERA, and more.',
  },
  {
    q: 'Can I get a home loan through Naradi?',
    a: 'Yes! We\'re partnered with leading banks for pre-approved loans from 8.5% p.a. Apply directly from our portal.',
  },
];

export default function BuyersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-950 to-emerald-800 pt-28 pb-16">
        <div className="container-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-sm font-semibold" style={{ background: 'rgba(201,162,39,0.15)', color: '#C9A227', border: '1px solid rgba(201,162,39,0.3)' }}>
              <BookOpen className="w-3.5 h-3.5" /> Buyer&apos;s Guide
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Buy Your Dream Property<br />With Complete Confidence
            </h1>
            <p className="text-emerald-200 text-lg mb-8 leading-relaxed">
              Zero brokerage. Legally verified. Expert guidance at every step. 8,200+ happy buyers trust Naradi for India&apos;s most transparent property purchase experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/properties" className="btn px-6 py-3.5 rounded-xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)', color: '#1a0000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Search className="w-4 h-4" /> Browse Properties
              </Link>
              <Link href="/auth/buyer/register" className="btn px-6 py-3.5 rounded-xl font-bold border-2 border-white/40 text-white hover:bg-white/10 transition-colors" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Register Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Bar */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="container-xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { val: '₹0', label: 'Brokerage Fee' },
              { val: '12,500+', label: 'Verified Properties' },
              { val: '8,200+', label: 'Happy Buyers' },
              { val: '48hr', label: 'Average Response' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-bold text-2xl" style={{ color: '#0F5132' }}>{stat.val}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buying Process */}
      <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Your Buying Journey</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">A simple, guided process from search to ownership.</p>
            <div className="separator-emerald mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {buyingSteps.map((step) => (
              <div key={step.step} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-emerald-200 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)' }}>
                    {step.step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <step.icon className="w-5 h-5 text-emerald-700" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits + Loan Calculator */}
      <div className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Benefits */}
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">Why Buy on Naradi?</h2>
              <div className="space-y-3">
                {buyerBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 py-2.5 border-b border-gray-100">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/auth/buyer/register" className="btn px-6 py-3.5 rounded-xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Register as Buyer <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Loan Calculator Placeholder */}
            <div id="loans" className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <Calculator className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-gray-900 text-lg">Home Loan Calculator</h3>
              </div>
              <div className="space-y-4 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Loan Amount</label>
                  <input type="range" min="500000" max="50000000" step="100000" defaultValue="5000000" className="w-full accent-emerald-700" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1"><span>₹5L</span><span>₹5Cr</span></div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Interest Rate: 8.5% p.a.</label>
                  <input type="range" min="7" max="15" step="0.1" defaultValue="8.5" className="w-full accent-emerald-700" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1"><span>7%</span><span>15%</span></div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tenure: 20 years</label>
                  <input type="range" min="5" max="30" step="1" defaultValue="20" className="w-full accent-emerald-700" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1"><span>5 yrs</span><span>30 yrs</span></div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Estimated Monthly EMI</p>
                <p className="font-display text-3xl font-bold text-emerald-700">₹43,391</p>
                <p className="text-xs text-gray-400 mt-1">For ₹50L loan at 8.5% for 20 years</p>
              </div>
              <a href="/buyers#loans" className="block w-full text-center mt-4 py-3 rounded-xl font-bold text-white text-sm" style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)', textDecoration: 'none' }}>
                Apply for Home Loan
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="section-padding bg-gray-50">
        <div className="container-xl max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Buyer FAQs</h2>
            <div className="separator-emerald mx-auto mt-4" />
          </div>
          <div className="space-y-4">
            {featuredFAQs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-emerald-200 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="text-emerald-700 font-semibold hover:underline">View All FAQs →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
