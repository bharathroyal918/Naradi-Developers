'use client';

import Link from 'next/link';
import {
  Building2, Phone, Mail, MapPin, ArrowRight, Shield, CheckCircle,
} from 'lucide-react';

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

const footerLinks = {
  properties: [
    { label: 'Residential Plots', href: '/properties/plots' },
    { label: 'Commercial Land', href: '/properties/commercial-land' },
    { label: 'Agricultural Land', href: '/properties/agricultural-land' },
    { label: 'Farm Houses', href: '/properties/farm-house' },
    { label: 'Warehouses', href: '/properties/warehouse' },
    { label: 'Luxury Villas', href: '/properties/villas' },
    { label: 'Apartments', href: '/properties/apartments' },
    { label: 'Sold Properties', href: '/properties/sold' },
  ],
  services: [
    { label: 'Buyer Services', href: '/buyers' },
    { label: 'Seller Services', href: '/sellers' },
    { label: 'NRI Services', href: '/nri-services' },
    { label: 'Property Verification', href: '/verification-portal' },
    { label: 'Legal Assistance', href: '/buyers#legal' },
    { label: 'Home Loans', href: '/buyers#loans' },
    { label: 'Site Visits', href: '/buyers#visits' },
    { label: 'Virtual Tours', href: '/nri-services#virtual-tours' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Leadership Team', href: '/about#team' },
    { label: 'Awards & Recognition', href: '/about#awards' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press & Media', href: '/about#press' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/privacy-policy#cookies' },
    { label: 'Disclaimer', href: '/terms#disclaimer' },
    { label: 'Refund Policy', href: '/terms#refund' },
    { label: 'RERA Disclosure', href: '/terms#rera' },
  ],
};

const socialLinks = [
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: TwitterIcon, href: '#', label: 'Twitter' },
  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
  { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
];

const trustBadges = [
  { label: 'RERA Registered', icon: Shield },
  { label: 'ISO Certified', icon: CheckCircle },
  { label: 'CREDAI Member', icon: CheckCircle },
  { label: '8+ Years Trust', icon: CheckCircle },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-gray-950 text-gray-300">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-700">
        <div className="container-xl py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-1">
                Stay ahead of the market
              </h3>
              <p className="text-emerald-200 text-sm">
                Get new verified listings, price alerts, and market insights delivered to your inbox.
              </p>
            </div>
            <form className="flex gap-2 w-full lg:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="input-base lg:w-72 rounded-xl text-sm"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="btn btn-gold btn-sm flex-shrink-0 px-5"
                style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)', color: '#1a0000', fontWeight: 700, borderRadius: '0.75rem', padding: '0.65rem 1.25rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem' }}
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-xl pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white">Naradi</span>
                <span className="text-xs font-bold tracking-widest uppercase block" style={{ color: '#C9A227' }}>Developers</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Founded by G.R Narendra Reddy, Naradi Developers is India&apos;s premier broker-free real estate marketplace connecting verified property owners directly with buyers, investors, and NRIs.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <badge.icon className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  {badge.label}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-emerald-700 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4 text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Properties</h4>
            <ul className="space-y-2.5">
              {footerLinks.properties.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>8th Main Rd, Judicial Layout, Yelahanka, Bengaluru, Karnataka 560065</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a href="tel:+91 9964156024" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  +91 99641 56024
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a href="mailto:info@naradidevelopers.com" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  info@naradidevelopers.com
                </a>
              </li>
            </ul>
            <div className="bg-gray-900 rounded-xl p-3">
              <p className="text-xs font-semibold text-emerald-400 mb-1">Business Hours</p>
              <p className="text-xs text-gray-400">Mon – Sat: 9 AM – 7 PM</p>
              <p className="text-xs text-gray-400">Sunday: 10 AM – 4 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-xl py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} Naradi Developers Pvt. Ltd. All rights reserved.
              <span className="mx-2">|</span>
              CIN: U45200TN2016PTC112345
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
