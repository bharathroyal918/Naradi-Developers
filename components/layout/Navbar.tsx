'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Search, MapPin, Building2,
  Wheat, Trees, Warehouse, Factory, Home, Building, Castle,
  Shield, CheckCircle, ArrowRight, Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const propertyMegaMenu = {
  lands: [
    { label: 'Residential Plots', desc: 'DTCP & BDA approved layout plots', slug: 'plots', icon: MapPin },
    { label: 'Commercial Land', desc: 'High-visibility highway frontage land', slug: 'commercial-land', icon: Building2 },
    { label: 'Agricultural Land', desc: 'Fertile farmland with water sources', slug: 'agricultural-land', icon: Wheat },
    { label: 'Farm House', desc: 'Scenic countryside retreat plots', slug: 'farm-house', icon: Trees },
    { label: 'Industrial Land', desc: 'KIADB & industrial corridor zones', slug: 'industrial-building', icon: Factory },
    { label: 'Gated Community Plots', desc: 'Clubhouse, security & underground utilities', slug: 'plots', icon: Shield },
    { label: 'DTCP / RERA Approved', desc: '100% legally clear titled plots', slug: 'plots', icon: CheckCircle },
  ],
  commercial: [
    { label: 'Warehouse', desc: 'Modern industrial storage & logistics', slug: 'warehouse', icon: Warehouse },
    { label: 'Industrial Building', desc: 'Manufacturing units & tech parks', slug: 'industrial-building', icon: Factory },
  ],
  residential: [
    { label: 'Individual Houses', desc: 'Luxury independent villas & duplexes', slug: 'individual-houses', icon: Home },
    { label: 'Apartments', desc: 'Premium gated community high-rises', slug: 'apartments', icon: Building },
    { label: 'Villas', desc: 'Private estate luxury residences', slug: 'villas', icon: Castle },
  ],
};

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties', hasMega: true },
  { label: 'Buyers', href: '/buyers' },
  { label: 'Sellers', href: '/sellers' },
  { label: 'NRI Services', href: '/nri-services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [megaTimeout, setMegaTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 40;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
    setIsMegaOpen(false);
  }

  const handleMegaEnter = () => {
    if (megaTimeout) clearTimeout(megaTimeout);
    setIsMegaOpen(true);
  };

  const handleMegaLeave = () => {
    const t = setTimeout(() => setIsMegaOpen(false), 180);
    setMegaTimeout(t);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileOpen(false);
  };

  const handleHeaderClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest('a, button, input, select, textarea, [role="button"], [role="menu"], [role="menuitem"]')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isTransparent = isHomePage && !isScrolled && !isMobileOpen;

  return (
    <>
      <header
        role="banner"
        onClick={handleHeaderClick}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform-gpu cursor-default',
          isTransparent
            ? 'bg-transparent py-4'
            : 'bg-white shadow-sm border-b border-gray-100 py-3'
        )}
      >
        <div className="container-xl max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Left: Logo */}
            <Link
              href="/"
              onClick={handleLogoClick}
              aria-label="Naradi Developers Home"
              className="flex items-center gap-2.5 flex-shrink-0 group cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-700 to-emerald-900 shadow-md group-hover:scale-105 transition-transform"
              >
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className={cn(
                    'font-display font-bold text-xl tracking-tight transition-colors',
                    isTransparent ? 'text-white' : 'text-emerald-950'
                  )}
                >
                  Naradi
                </span>
                <span
                  className="text-[10px] font-bold tracking-widest uppercase transition-colors"
                  style={{ color: '#C9A227' }}
                >
                  Developers
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div
                    key={link.href}
                    className="static"
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setIsMegaOpen((prev) => !prev)}
                      className={cn(
                        'flex items-center gap-1 px-3.5 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative group',
                        isTransparent
                          ? 'text-white/90 hover:text-white'
                          : 'text-gray-700 hover:text-emerald-700',
                        isMegaOpen && (isTransparent ? 'text-white' : 'text-emerald-700')
                      )}
                      aria-expanded={isMegaOpen}
                      aria-haspopup="menu"
                    >
                      {link.label}
                      <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', isMegaOpen && 'rotate-180')} />
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </button>

                    {/* Properties Mega Menu Dropdown */}
                    <AnimatePresence>
                      {isMegaOpen && (
                        <motion.div
                          role="menu"
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[980px] max-w-[calc(100vw-32px)] z-50 pointer-events-auto"
                          onMouseEnter={handleMegaEnter}
                          onMouseLeave={handleMegaLeave}
                        >
                          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/90 overflow-hidden">
                            {/* Top Banner */}
                            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 px-7 py-3.5 flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <Sparkles className="w-4 h-4 text-amber-400" />
                                <p className="text-white font-semibold text-sm">Explore 12,500+ Verified Properties</p>
                                <span className="text-emerald-300 text-xs hidden sm:inline">• 100% Legal Verification &amp; Zero Brokerage</span>
                              </div>
                              <Link
                                href="/properties"
                                onClick={() => setIsMegaOpen(false)}
                                className="text-xs font-bold px-3.5 py-1.5 rounded-lg text-emerald-950 transition-transform hover:scale-105"
                                style={{ background: '#C9A227' }}
                              >
                                Browse All Properties →
                              </Link>
                            </div>

                          {/* 4-Column Layout (3 Mega Columns + 1 Featured Property Image) */}
                          <div className="grid grid-cols-12 p-6 gap-6">
                            {/* Column 1: LANDS */}
                            <div className="col-span-4 border-r border-gray-100 pr-4">
                              <div className="flex items-center justify-between mb-3">
                                <p className="text-[11px] font-bold tracking-wider uppercase text-emerald-800">Lands &amp; Plots</p>
                                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Core Focus</span>
                              </div>
                              <div className="space-y-1">
                                {propertyMegaMenu.lands.map((item) => (
                                  <Link
                                    key={item.label}
                                    href={`/properties/${item.slug}`}
                                    role="menuitem"
                                    className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/60 transition-colors group"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-7 h-7 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                                        <item.icon className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <p className="text-xs font-semibold text-gray-800 group-hover:text-emerald-800 leading-tight">{item.label}</p>
                                        <p className="text-[10px] text-gray-400 truncate max-w-[160px]">{item.desc}</p>
                                      </div>
                                    </div>
                                    <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Column 2: COMMERCIAL */}
                            <div className="col-span-3 border-r border-gray-100 pr-3">
                              <p className="text-[11px] font-bold tracking-wider uppercase text-gray-500 mb-3">Commercial</p>
                              <div className="space-y-1">
                                {propertyMegaMenu.commercial.map((item) => (
                                  <Link
                                    key={item.label}
                                    href={`/properties/${item.slug}`}
                                    role="menuitem"
                                    className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors group"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <item.icon className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <p className="text-xs font-semibold text-gray-800 group-hover:text-emerald-800 leading-tight">{item.label}</p>
                                        <p className="text-[10px] text-gray-400 truncate max-w-[110px]">{item.desc}</p>
                                      </div>
                                    </div>
                                    <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                                  </Link>
                                ))}
                              </div>

                              <div className="mt-5 p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                                <p className="text-[11px] font-bold text-amber-900">Commercial Advisory</p>
                                <p className="text-[10px] text-amber-700 mt-0.5 leading-snug">Warehouse &amp; industrial site feasibility audits available.</p>
                                <Link href="/contact" className="text-[10px] font-bold text-emerald-800 mt-1.5 inline-flex items-center gap-1">
                                  Talk to expert →
                                </Link>
                              </div>
                            </div>

                            {/* Column 3: RESIDENTIAL */}
                            <div className="col-span-2 border-r border-gray-100 pr-2">
                              <p className="text-[11px] font-bold tracking-wider uppercase text-gray-500 mb-3">Residential</p>
                              <div className="space-y-1">
                                {propertyMegaMenu.residential.map((item) => (
                                  <Link
                                    key={item.label}
                                    href={`/properties/${item.slug}`}
                                    role="menuitem"
                                    className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors group"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        <item.icon className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <p className="text-xs font-semibold text-gray-800 group-hover:text-emerald-800 leading-tight">{item.label}</p>
                                        <p className="text-[10px] text-gray-400">{item.desc}</p>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Column 4: Featured Property Image Card */}
                            <div className="col-span-3">
                              <p className="text-[11px] font-bold tracking-wider uppercase text-emerald-800 mb-2">Featured Listing</p>
                              <Link
                                href="/properties/premium-dtcp-plot-ecr-chennai"
                                className="group block rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
                              >
                                <div className="relative h-28 overflow-hidden">
                                  <img
                                    src="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=600&q=80"
                                    alt="Judicial Layout Plot"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-800/90 text-[9px] font-bold text-white flex items-center gap-1">
                                    <Shield className="w-2.5 h-2.5 text-amber-400" /> BDA Approved
                                  </div>
                                </div>
                                <div className="p-2.5 bg-gray-50">
                                  <p className="font-bold text-xs text-gray-900 line-clamp-1">Judicial Layout, Yelahanka</p>
                                  <p className="text-[10px] text-gray-500">Bengaluru • 1,727 sq.ft</p>
                                  <div className="flex items-center justify-between mt-1.5">
                                    <span className="text-xs font-bold text-emerald-700">₹95,00,000</span>
                                    <span className="text-[10px] font-semibold text-amber-600 group-hover:translate-x-0.5 transition-transform">
                                      View Details →
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={link.href === '/' ? handleLogoClick : undefined}
                    className={cn(
                      'px-3.5 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative group',
                      isTransparent
                        ? 'text-white/90 hover:text-white'
                        : 'text-gray-700 hover:text-emerald-700',
                      pathname === link.href && (isTransparent ? 'text-white font-semibold' : 'text-emerald-700 font-semibold')
                    )}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                )
              )}
            </nav>

            {/* Right: Search, Auth, Gold List Property Button */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Link
                href="/properties"
                aria-label="Search properties"
                className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center transition-colors',
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-emerald-700'
                )}
              >
                <Search className="w-4 h-4" />
              </Link>

              <Link
                href="/buyer/login"
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors',
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-emerald-700 hover:bg-gray-50'
                )}
              >
                Login
              </Link>

              <Link
                href="/buyer/register"
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all',
                  isTransparent
                    ? 'border-white/30 text-white hover:bg-white/10'
                    : 'border-gray-200 text-gray-800 hover:border-emerald-600 hover:text-emerald-700'
                )}
              >
                Register
              </Link>

              {/* Gold "List Property" Button */}
              <Link
                href="/seller-portal"
                className="btn text-xs font-bold px-4 py-2.5 rounded-xl transition-transform hover:scale-105 shadow-md flex items-center gap-1.5"
                style={{
                  background: 'linear-gradient(135deg, #C9A227, #d4b04a)',
                  color: '#1a0f00',
                  fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(201, 162, 39, 0.35)',
                }}
              >
                <span>List Property</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-black/10 font-extrabold uppercase">Free</span>
              </Link>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/seller-portal"
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-950"
                style={{ background: '#C9A227' }}
              >
                List Property
              </Link>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle mobile menu"
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                  isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'
                )}
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Slide Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-20 pb-8 px-6 lg:hidden overflow-y-auto"
          >
            <nav className="flex-1 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href} className="border-b border-gray-100 pb-2">
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      setIsMobileOpen(false);
                      if (link.href === '/') {
                        handleLogoClick(e);
                      }
                    }}
                    className="flex items-center justify-between py-2 text-base font-semibold text-gray-900 hover:text-emerald-700"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  {link.hasMega && (
                    <div className="grid grid-cols-2 gap-1.5 pl-2 pt-1 pb-2">
                      <Link href="/properties/plots" onClick={() => setIsMobileOpen(false)} className="text-xs text-gray-500 py-1">Residential Plots</Link>
                      <Link href="/properties/commercial-land" onClick={() => setIsMobileOpen(false)} className="text-xs text-gray-500 py-1">Commercial Land</Link>
                      <Link href="/properties/agricultural-land" onClick={() => setIsMobileOpen(false)} className="text-xs text-gray-500 py-1">Agricultural Land</Link>
                      <Link href="/properties/farm-house" onClick={() => setIsMobileOpen(false)} className="text-xs text-gray-500 py-1">Farm House</Link>
                      <Link href="/properties/warehouse" onClick={() => setIsMobileOpen(false)} className="text-xs text-gray-500 py-1">Warehouses</Link>
                      <Link href="/properties/villas" onClick={() => setIsMobileOpen(false)} className="text-xs text-gray-500 py-1">Luxury Villas</Link>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile CTAs */}
            <div className="pt-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/buyer/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-2.5 rounded-xl text-center font-semibold text-sm border border-gray-200 text-gray-800"
                >
                  Login
                </Link>
                <Link
                  href="/buyer/register"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-2.5 rounded-xl text-center font-semibold text-sm bg-emerald-700 text-white"
                >
                  Register
                </Link>
              </div>

              <Link
                href="/seller-portal"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 rounded-xl text-center font-bold text-sm text-gray-950 flex items-center justify-center gap-1.5"
                style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)' }}
              >
                List Your Property (100% Free)
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
