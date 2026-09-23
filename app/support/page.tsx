import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, MessageCircle, Phone, Mail, BookOpen, ArrowRight, Clock, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support Center — Naradi Developers',
  description: 'Get help with property buying, selling, NRI services, and account issues on Naradi Developers.',
};

const topCategories = [
  { icon: BookOpen, title: 'Buyer Guide', desc: 'How to search, shortlist, and buy verified properties', href: '/buyers', count: 24 },
  { icon: HelpCircle, title: 'Seller Support', desc: 'Listing, verification, and lead management help', href: '/sellers', count: 18 },
  { icon: MessageCircle, title: 'NRI Services', desc: 'Virtual tours, PoA, and remote purchase guidance', href: '/nri-services', count: 15 },
  { icon: CheckCircle, title: 'Legal & Verification', desc: 'Document requirements and verification process', href: '/verification', count: 12 },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        {/* Hero */}
        <div className="bg-gradient-to-br from-emerald-950 to-emerald-800 py-16">
          <div className="container-xl text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">How Can We Help?</h1>
            <p className="text-emerald-200 text-lg max-w-2xl mx-auto mb-8">
              Search our knowledge base or reach out to our expert team — available 6 days a week.
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="search"
                  className="input-base bg-white text-sm pl-12 h-14 text-base"
                  placeholder="Search for help articles..."
                  aria-label="Search help articles"
                />
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="section-padding bg-white">
          <div className="container-xl">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">Browse Help Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {topCategories.map((cat) => (
                <Link key={cat.title} href={cat.href} className="group bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all" style={{ textDecoration: 'none' }}>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3 group-hover:bg-emerald-200 transition-colors">
                    <cat.icon className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{cat.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{cat.desc}</p>
                  <span className="text-xs text-emerald-600 font-semibold">{cat.count} articles</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Articles */}
        <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="container-xl max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
            <div className="space-y-3">
              {[
                { title: 'How to buy land with DTCP approval', cat: 'Buyers', href: '/buyers' },
                { title: 'What documents are required to sell property?', cat: 'Sellers', href: '/sellers' },
                { title: 'How NRIs can buy property via PoA?', cat: 'NRI', href: '/nri-services' },
                { title: 'What is Encumbrance Certificate (EC)?', cat: 'Legal', href: '/verification' },
                { title: 'How to schedule a site visit?', cat: 'Buyers', href: '/properties' },
                { title: 'Difference between patta, chitta, and FMB sketch', cat: 'Legal', href: '/verification' },
              ].map((article, i) => (
                <Link key={i} href={article.href} className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4 hover:border-emerald-200 hover:shadow-sm transition-all" style={{ textDecoration: 'none' }}>
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{article.title}</p>
                    <p className="text-xs text-emerald-600 font-medium">{article.cat}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="section-padding bg-white">
          <div className="container-xl max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">Still Need Help?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { icon: MessageCircle, title: 'WhatsApp', desc: 'Instant response on WhatsApp', action: 'Chat Now', href: 'https://wa.me/919876543210', bg: '#25D366' },
                { icon: Phone, title: 'Call Us', desc: 'Mon-Sat, 9 AM - 7 PM IST', action: 'Call +91 98765 43210', href: 'tel:+919876543210', bg: '#0F5132' },
                { icon: Mail, title: 'Email', desc: 'Response within 24 hours', action: 'Send Email', href: 'mailto:support@naradidevelopers.com', bg: '#C9A227' },
              ].map((channel) => (
                <a key={channel.title} href={channel.href} className="flex flex-col items-center gap-3 bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center hover:shadow-md transition-all" style={{ textDecoration: 'none' }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: channel.bg }}>
                    <channel.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">{channel.title}</h3>
                  <p className="text-sm text-gray-500">{channel.desc}</p>
                  <span className="text-sm font-bold" style={{ color: channel.bg }}>{channel.action} →</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
