import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus, TrendingUp, Users, Star, Shield, CheckCircle, ArrowRight, BarChart3, Eye, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sell Your Property — Naradi Developers',
  description: 'List your property for free on Naradi Developers. Reach 50,000+ verified buyers, zero brokerage marketplace, and get qualified leads within 48 hours.',
};

const sellerSteps = [
  { step: 1, title: 'Register as Seller', desc: 'Free seller registration with KYC verification in under 10 minutes.' },
  { step: 2, title: 'List Your Property', desc: 'Use our 6-step wizard to upload details, photos, and documents.' },
  { step: 3, title: 'Get Verified Badge', desc: 'Our team reviews and verifies your listing within 48-72 hours.' },
  { step: 4, title: 'Receive Qualified Leads', desc: 'Get direct enquiries from verified, intent-heavy buyers. No junk leads.' },
  { step: 5, title: 'Schedule Site Visits', desc: 'Manage all site visit requests from your seller dashboard.' },
  { step: 6, title: 'Close the Deal', desc: 'Our legal team assists with agreements and registration. Zero commission.' },
];

const sellerBenefits = [
  { icon: Eye, title: '50,000+ Monthly Visitors', desc: 'Your property visible to lakhs of verified buyers every month.' },
  { icon: Shield, title: 'Verified Listing Badge', desc: 'Stand out with our trust badge — gets 3x more enquiries.' },
  { icon: MessageSquare, title: 'Direct Buyer Connect', desc: 'All leads come directly to you — no broker interference.' },
  { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Track views, enquiries, and visits from your dashboard.' },
  { icon: TrendingUp, title: 'Premium Promotion', desc: 'Feature your property on homepage and social media.' },
  { icon: Users, title: 'NRI Reach', desc: 'Access 1,800+ NRI clients actively seeking Indian property.' },
];

const successStories = [
  { name: 'Suresh Kumar', location: 'Bengaluru', property: 'Plot, Yelahanka', soldIn: '18 days', price: '₹95L', rating: 5 },
  { name: 'Priya Rajan', location: 'Coimbatore', property: 'Commercial Land', soldIn: '31 days', price: '₹1.2Cr', rating: 5 },
  { name: 'Balaji Nair', location: 'Hosur', property: 'Agricultural Land', soldIn: '22 days', price: '₹45L', rating: 5 },
];

export default function SellersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16" style={{ background: 'linear-gradient(135deg, #022c22 0%, #0F5132 100%)' }}>
        <div className="container-xl relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-sm font-semibold" style={{ background: 'rgba(201,162,39,0.15)', color: '#C9A227', border: '1px solid rgba(201,162,39,0.3)' }}>
              <Plus className="w-3.5 h-3.5" /> Seller Platform
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              List Your Property.<br />Sell Faster. Zero Commission.
            </h1>
            <p className="text-emerald-200 text-lg mb-8 leading-relaxed">
              Join 3,500+ sellers who have successfully sold their properties on Naradi — with zero brokerage, verified buyers, and complete transparency.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/seller/register" className="btn px-6 py-3.5 rounded-xl font-bold" style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)', color: '#1a0000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus className="w-4 h-4" /> List Property Free
              </Link>
              <Link href="/contact" className="btn px-6 py-3.5 rounded-xl font-bold border-2 border-white/40 text-white" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Talk to Team
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="container-xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { val: '₹0', label: 'Commission Fee' },
              { val: '3,500+', label: 'Active Sellers' },
              { val: '18 days', label: 'Avg. Time to Sell' },
              { val: '48 hrs', label: 'Lead Response Time' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-bold text-2xl" style={{ color: '#0F5132' }}>{stat.val}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selling Process */}
      <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">How to Sell on Naradi</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">List for free, get verified, receive leads — all within 72 hours.</p>
            <div className="separator-emerald mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sellerSteps.map((step) => (
              <div key={step.step} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-emerald-200 transition-all">
                <div className="w-10 h-10 rounded-xl font-bold text-white flex items-center justify-center mb-4 text-sm" style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)' }}>
                  {step.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/auth/seller/register" className="btn px-8 py-3.5 rounded-xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Start Listing Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Why Sellers Choose Naradi</h2>
            <div className="separator-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerBenefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-white hover:shadow-sm transition-all group">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                  <benefit.icon className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-500">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="section-padding bg-gradient-to-br from-emerald-50 to-white">
        <div className="container-xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Seller Success Stories</h2>
            <div className="separator-emerald mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {successStories.map((story) => (
              <div key={story.name} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-3">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#C9A227' }} />
                  ))}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900">{story.name}</span>
                  <span className="text-xs text-gray-500">{story.location}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{story.property}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-emerald-50 rounded-lg p-2 text-center">
                    <div className="font-bold text-emerald-700">{story.soldIn}</div>
                    <div className="text-xs text-gray-500">Sold in</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2 text-center">
                    <div className="font-bold" style={{ color: '#C9A227' }}>{story.price}</div>
                    <div className="text-xs text-gray-500">Final Price</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16" style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)' }}>
        <div className="container-xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a0000' }}>
            Ready to Sell Your Property?
          </h2>
          <p className="text-yellow-900 text-lg mb-8">Free listing. Verified buyers. Zero commission.</p>
          <Link href="/auth/seller/register" className="btn inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base" style={{ background: '#0F5132', textDecoration: 'none' }}>
            <Plus className="w-5 h-5" /> List Your Property Free
          </Link>
        </div>
      </div>
    </div>
  );
}
