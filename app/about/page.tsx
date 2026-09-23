import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Users, Award, TrendingUp, Globe, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { mockStats, mockTeam, mockAwards } from '@/lib/mock/testimonials';

export const metadata: Metadata = {
  title: 'About Naradi Developers — Founded by G.R Narendra Reddy',
  description: 'Learn about Naradi Developers, founded by CEO G.R Narendra Reddy. Headquartered at 8th Main Rd, Judicial Layout, Yelahanka, Bengaluru, Karnataka. India\'s most trusted broker-free property marketplace.',
};

const timeline = [
  { year: '2016', title: 'Company Founded', desc: 'Naradi Developers founded by G.R Narendra Reddy in Bengaluru with a vision to eliminate brokers from land and property transactions.' },
  { year: '2018', title: 'Digital Marketplace Launch', desc: 'Launched our online marketplace with 500+ verified plots and properties across Karnataka and South India.' },
  { year: '2020', title: 'NRI Services Launched', desc: 'Dedicated NRI relationship management desk and virtual tour services introduced for global investors.' },
  { year: '2022', title: 'Pan-India Expansion', desc: 'Expanded across Karnataka, Tamil Nadu, and Andhra Pradesh with 5,000+ verified listings.' },
  { year: '2023', title: 'CREDAI Recognition', desc: 'Recognized as "Most Trusted Real Estate Platform" by regional real estate bodies.' },
  { year: '2024', title: '12,500+ Properties', desc: 'Achieved milestone of 12,500+ verified listings and 8,200+ satisfied customers nationwide.' },
];

const values = [
  { icon: Shield, title: 'Trust', desc: 'Every listing is verified. Zero tolerance for fraud.' },
  { icon: Heart, title: 'Customer First', desc: 'Your property goals are our mission.' },
  { icon: TrendingUp, title: 'Transparency', desc: 'Honest pricing. No hidden fees. No brokerage.' },
  { icon: Globe, title: 'Inclusivity', desc: 'Services for buyers, sellers, and NRIs worldwide.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-950 to-emerald-800 pt-28 pb-16">
        <div className="container-xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-sm font-semibold" style={{ background: 'rgba(201,162,39,0.15)', color: '#C9A227', border: '1px solid rgba(201,162,39,0.3)' }}>
            Our Story
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Transforming Indian<br />Real Estate Since 2016
          </h1>
          <p className="text-emerald-200 text-lg max-w-3xl mx-auto leading-relaxed">
            Founded by G.R Narendra Reddy, we started with a simple belief: property transactions should be transparent, fair, and broker-free. Headquartered in Yelahanka, Bengaluru, we&apos;re today India&apos;s most trusted marketplace for verified land and property.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-xl py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {mockStats.map((stat) => (
              <div key={stat.id}>
                <div className="font-display text-2xl sm:text-3xl font-bold mb-1" style={{ color: '#0F5132' }}>
                  {stat.prefix}{stat.value.toLocaleString('en-IN')}{stat.suffix}
                </div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-emerald-700" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To eliminate corruption and brokerage from Indian real estate by creating a completely transparent, technology-driven marketplace where property owners and buyers connect directly — with full legal verification, zero hidden costs, and complete peace of mind.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-2xl p-8 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-3">Our Vision</h2>
              <p className="text-emerald-100 leading-relaxed">
                To become India&apos;s largest verified property marketplace by 2030 — serving 1 million+ happy customers across 200+ cities, with dedicated NRI services connecting the Indian diaspora to their homeland investments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Our Core Values</h2>
            <div className="separator-emerald mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value) => (
              <div key={value.title} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md hover:bg-white transition-all border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-emerald-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-xl max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Our Journey</h2>
            <div className="separator-gold mx-auto mt-4" />
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-700 to-gold-500" style={{ background: 'linear-gradient(180deg, #0F5132, #C9A227)' }} />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-5 relative pl-16">
                  <div className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: i % 2 === 0 ? '#0F5132' : '#C9A227', color: i % 2 === 0 ? 'white' : '#1a0000' }}>
                    {item.year.slice(2)}
                  </div>
                  <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
                    <div className="text-xs font-bold text-emerald-700 mb-1">{item.year}</div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div id="team" className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Leadership Team</h2>
            <div className="separator-emerald mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTeam.map((member) => (
              <div key={member.id} className="group text-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center mx-auto mb-4 text-white font-bold text-3xl group-hover:shadow-emerald transition-shadow">
                  {member.name[0]}
                </div>
                <h3 className="font-bold text-gray-900 mb-0.5">{member.name}</h3>
                <p className="text-sm font-semibold mb-2" style={{ color: '#C9A227' }}>{member.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{member.bio}</p>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">{member.experience}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards */}
      <div id="awards" className="section-padding bg-gradient-to-br from-amber-50 to-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Awards & Recognition</h2>
            <div className="separator-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {mockAwards.map((award) => (
              <div key={award.id} className="bg-white rounded-2xl border border-amber-100 p-6 text-center hover:shadow-lg hover:border-amber-300 transition-all">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(201,162,39,0.15), rgba(201,162,39,0.05))', border: '1px solid rgba(201,162,39,0.3)' }}>
                  <Award className="w-7 h-7" style={{ color: '#C9A227' }} />
                </div>
                <div className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 w-fit mx-auto" style={{ background: 'rgba(201,162,39,0.1)', color: '#C9A227' }}>{award.year}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{award.title}</h3>
                <p className="text-xs text-gray-500">{award.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section-padding" style={{ background: 'linear-gradient(135deg, #022c22, #0F5132)' }}>
        <div className="container-xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Join India&apos;s Most Trusted Property Platform
          </h2>
          <p className="text-emerald-200 text-lg mb-8 max-w-2xl mx-auto">
            Whether you&apos;re buying your dream land or selling your property — Naradi is with you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/properties" className="btn px-6 py-3.5 rounded-xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)', color: '#1a0000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Explore Properties <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn px-6 py-3.5 rounded-xl font-bold border-2 border-white/40 text-white hover:bg-white/10 transition-colors" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
