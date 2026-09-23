'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2,
  ShieldCheck,
  FileCheck2,
  BadgePercent,
  Globe2,
  Sparkles,
} from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  theme?: 'light' | 'emerald' | 'dark';
  role?: 'buyer' | 'seller' | 'nri' | 'auth';
}

const TRUST_BADGES = [
  { icon: ShieldCheck, label: '100% Verified Listings' },
  { icon: FileCheck2, label: 'Legal Due Diligence' },
  { icon: BadgePercent, label: 'Zero Brokerage Fee' },
  { icon: Globe2, label: 'NRI Concierge Desk' },
];

export function AuthLayout({
  children,
  theme = 'emerald',
  role = 'buyer',
}: AuthLayoutProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen w-full flex flex-col lg:flex-row ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}
    >
      {/* ========================================================
          LEFT SIDE (45% on Desktop): Luxury Visual + Branding + Trust
         ======================================================== */}
      <div className="relative isolate w-full lg:w-[45%] bg-[#022c22] flex flex-col justify-between p-6 sm:p-10 lg:p-12 pt-28 sm:pt-32 lg:pt-32 overflow-hidden min-h-[420px] lg:min-h-screen text-white">
        {/* Background Visual with Luxury Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Base Dark Gradient Fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022019]" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85&auto=format&fit=crop"
            alt="Naradi Verified Luxury Real Estate"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay scale-105"
          />

          {/* Gradient Overlay for high text contrast */}
          <div
            className={`absolute inset-0 ${
              isDark
                ? 'bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-emerald-950/95'
                : 'bg-gradient-to-br from-[#022c22]/95 via-[#064e3b]/90 to-[#022019]/95'
            }`}
          />
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
        </div>

        {/* Top: Breadcrumb & Portal Tagline */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-bold text-emerald-200 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 hover:border-white/30"
            aria-label="Return to Naradi Developers homepage"
          >
            <span>← Back to Marketplace</span>
          </Link>

          {/* Role Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-amber-400/30 bg-amber-400/10 text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="capitalize">{role === 'auth' ? 'Secure Auth' : `${role} Access`}</span>
          </div>
        </div>

        {/* Middle: Brand Headline and Mission (Desktop Only) */}
        <div className="relative z-10 hidden lg:block my-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              India&apos;s Verified Real Estate Marketplace
            </span>

            <h1 className="font-display text-4xl xl:text-5xl font-extrabold text-white leading-[1.18] tracking-tight drop-shadow-md">
              Buy, sell and invest in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-200 font-black">
                verified properties
              </span>{' '}
              with zero brokerage.
            </h1>

            <p className="mt-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed drop-shadow-sm font-normal">
              Naradi Developers bridges buyers, direct land sellers, and global NRIs with strict legal validation, on-ground inspections, and complete documentation transparency across Bengaluru and beyond.
            </p>
          </motion.div>
        </div>

        {/* Bottom: 4 Trust Badges */}
        <div className="relative z-10 pt-6 lg:pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 sm:gap-3">
            {TRUST_BADGES.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-white transition-all hover:bg-black/50"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/25 border border-emerald-400/40 flex items-center justify-center flex-shrink-0 text-amber-300">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold leading-tight text-white drop-shadow-sm">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Founder Transparency Attribution */}
          <div className="mt-5 pt-3 border-t border-white/15 hidden lg:flex items-center justify-between text-[11px] text-emerald-200/80">
            <span>Leadership: G.R Narendra Reddy (Founder & CEO)</span>
            <span>Judicial Layout, Yelahanka</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          RIGHT SIDE (55% on Desktop): Centered Auth Card
         ======================================================== */}
      <div
        className={`w-full lg:w-[55%] flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 xl:p-16 pt-24 sm:pt-28 lg:pt-28 flex-1 transition-colors ${
          isDark
            ? 'bg-slate-950 lg:bg-gradient-to-b lg:from-slate-950 lg:to-slate-900'
            : 'bg-slate-50 lg:bg-gradient-to-b lg:from-slate-50 lg:to-emerald-50/30'
        }`}
      >
        <div className="w-full max-w-[480px] my-auto">
          {children}
        </div>

        {/* Global Security / Compliance Tagline */}
        <div className="mt-8 text-center text-[11px] text-slate-500 dark:text-slate-500 space-x-3">
          <span>256-Bit SSL Encrypted</span>
          <span>•</span>
          <span>Zero Spam Policy</span>
          <span>•</span>
          <span>RERA & Legal Compliant</span>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
