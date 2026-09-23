import type { Metadata } from 'next';
import Link from 'next/link';
import { Globe, Video, Scale, Banknote, Home, FileText, Phone, MessageCircle, CheckCircle, Star, ArrowRight, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NRI Services — Naradi Developers',
  description: 'Dedicated NRI property services in India. Virtual tours, legal assistance, PoA support, home loans, property management, and dedicated relationship managers.',
};

const services = [
  {
    icon: Video,
    title: 'Virtual Property Tours',
    desc: 'HD live video tours, 360° walkthroughs, and drone footage. Experience every property remotely — as if you\'re there.',
    features: ['Live WhatsApp/Zoom tours', '360° walkthroughs', 'Drone footage for large properties', 'Recorded tour archives'],
  },
  {
    icon: Scale,
    title: 'Legal & Verification',
    desc: 'Our senior property lawyers handle everything — title verification, agreement drafting, and registration via PoA.',
    features: ['30-year title verification', 'PoA drafting & attestation', 'Registration support', 'FEMA compliance'],
  },
  {
    icon: Banknote,
    title: 'Finance & Loans',
    desc: 'NRI home loans in INR or foreign currency. Best rates from our banking partners with repatriation support.',
    features: ['NRI loans from 8.5% p.a.', 'Foreign currency options', 'Repatriation guidance', 'Pre-approval assistance'],
  },
  {
    icon: FileText,
    title: 'Power of Attorney (PoA)',
    desc: 'Complete PoA setup service — drafting, apostille, attestation, and registration support from your home country.',
    features: ['PoA drafting', 'Apostille guidance', 'Embassy attestation support', 'Registration coordination'],
  },
  {
    icon: Home,
    title: 'Property Management',
    desc: 'Own a property in India but live abroad? We manage it — tenant management, maintenance, and rent collection.',
    features: ['Tenant finding & screening', 'Rent collection', 'Maintenance coordination', 'Monthly reporting'],
  },
  {
    icon: Users,
    title: 'Dedicated Relationship Manager',
    desc: 'Your personal NRI property advisor available via WhatsApp, email, and video call — in your time zone.',
    features: ['Dedicated personal manager', 'WhatsApp / video support', 'Local market insights', '24-hour response SLA'],
  },
];

const countries = [
  { name: 'USA', flag: '🇺🇸', clients: '420+' },
  { name: 'UAE', flag: '🇦🇪', clients: '380+' },
  { name: 'Singapore', flag: '🇸🇬', clients: '280+' },
  { name: 'UK', flag: '🇬🇧', clients: '190+' },
  { name: 'Canada', flag: '🇨🇦', clients: '160+' },
  { name: 'Australia', flag: '🇦🇺', clients: '140+' },
  { name: 'Qatar', flag: '🇶🇦', clients: '120+' },
  { name: 'Germany', flag: '🇩🇪', clients: '95+' },
];

export default function NRIServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-20" style={{ background: 'linear-gradient(135deg, #022c22 0%, #0F5132 60%, #166534 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Globe className="absolute right-10 top-10 w-72 h-72 text-white" />
        </div>
        <div className="container-xl relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-sm font-semibold" style={{ background: 'rgba(201,162,39,0.15)', color: '#C9A227', border: '1px solid rgba(201,162,39,0.3)' }}>
            <Globe className="w-3.5 h-3.5" /> Exclusively for NRIs & PIOs
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Invest in India<br />from Anywhere in the World
          </h1>
          <p className="text-emerald-200 text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Dedicated relationship managers, virtual tours, complete legal support, and hassle-free PoA services. Buy your dream property in India without leaving home.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link href="/auth/nri/register" className="btn px-7 py-3.5 rounded-xl font-bold" style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)', color: '#1a0000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Start NRI Registration
            </Link>
            <a href="https://wa.me/919876543210" className="btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white border-2 border-white/30 hover:bg-white/10 transition-colors" style={{ textDecoration: 'none' }}>
              <MessageCircle className="w-4 h-4" /> WhatsApp Us Now
            </a>
          </div>

          {/* Country Stats */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 max-w-3xl mx-auto">
            {countries.map((country) => (
              <div key={country.name} className="text-center">
                <div className="text-3xl mb-1">{country.flag}</div>
                <p className="text-white font-bold text-xs">{country.name}</p>
                <p className="text-emerald-300 text-xs">{country.clients}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="container-xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { val: '1,800+', label: 'NRI Clients Served' },
              { val: '28', label: 'Countries Covered' },
              { val: '₹480Cr+', label: 'NRI Transactions' },
              { val: '4.9★', label: 'NRI Satisfaction' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: '#0F5132' }}>{stat.val}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Complete NRI Property Services</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Everything you need to invest in Indian property — from discovery to final registration — handled remotely.</p>
            <div className="separator-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 card-hover">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-5 group-hover:bg-emerald-200 transition-colors">
                  <service.icon className="w-7 h-7 text-emerald-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="section-padding" style={{ background: 'linear-gradient(135deg, #022c22, #0F5132)' }}>
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">How It Works for NRIs</h2>
            <p className="text-emerald-200 text-lg max-w-2xl mx-auto">Buy property in India in 6 simple steps — entirely from abroad.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: '01', title: 'Register as NRI Client', desc: 'Free registration with your overseas details. Get a dedicated relationship manager assigned within 24 hours.' },
              { num: '02', title: 'Browse & Shortlist', desc: 'Explore verified properties. Request virtual tours and video walkthroughs for your shortlisted properties.' },
              { num: '03', title: 'Legal Verification', desc: 'Our legal team verifies all documents. You receive a detailed legal report before committing.' },
              { num: '04', title: 'PoA & Finance', desc: 'We assist with PoA creation, attestation, and NRI home loan applications from your home country.' },
              { num: '05', title: 'Agreement & Registration', desc: 'Our team handles the sale agreement and registration on your behalf via authorized PoA.' },
              { num: '06', title: 'Property Handover', desc: 'Keys handed to a trusted representative. We can also manage your property as rental investment.' },
            ].map((step) => (
              <div key={step.num} className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
                <div className="text-3xl font-bold mb-3" style={{ color: '#C9A227' }}>{step.num}</div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-emerald-200/80 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section-padding bg-white">
        <div className="container-xl max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Ready to Invest in India?</h2>
          <p className="text-gray-500 text-lg mb-8">Book a free consultation call with our NRI specialist. WhatsApp, Zoom, or phone — your choice.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/919876543210" className="btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white" style={{ background: '#25D366', textDecoration: 'none' }}>
              <MessageCircle className="w-4 h-4" /> WhatsApp Consultation
            </a>
            <a href="tel:+919876543210" className="btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)', textDecoration: 'none' }}>
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <Link href="/auth/nri/register" className="btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
              Register Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
