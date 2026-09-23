'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Phone, ArrowUp, X,
  Clock, Shield, ExternalLink,
} from 'lucide-react';
import { mockProperties } from '@/lib/mock/properties';
import { formatPrice } from '@/lib/utils';

export default function FloatingControls() {
  const pathname = usePathname();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const [showRecentDrawer, setShowRecentDrawer] = useState(false);

  // Do not render floating clutter on auth pages
  const isAuthPage =
    pathname?.includes('/login') ||
    pathname?.includes('/register') ||
    pathname?.startsWith('/auth');

  useEffect(() => {
    if (isAuthPage) return;
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check cookie consent
    const consent = localStorage.getItem('naradi_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowCookie(true), 1500);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const acceptCookies = () => {
    localStorage.setItem('naradi_cookie_consent', 'true');
    setShowCookie(false);
  };

  const recentListings = mockProperties.slice(0, 3);

  if (isAuthPage) return null;

  return (
    <>
      {/* Bottom Right Floating Action Group */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Recently Viewed Toggle Pill */}
        <button
          onClick={() => setShowRecentDrawer(true)}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-emerald-950 font-bold text-xs shadow-lg border border-gray-200 hover:border-emerald-600 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          aria-label="Recently viewed properties"
        >
          <Clock className="w-3.5 h-3.5 text-emerald-700" />
          <span>Recent Views</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </button>

        {/* Floating Call Button */}
        <a
          href="tel:+919876543210"
          className="w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-xl hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all"
          aria-label="Call Naradi Property Advisory"
          title="Call Property Advisory"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919876543210?text=Hello%20Naradi%20Developers,%20I%20am%20interested%20in%20verified%20properties"
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all"
          style={{ background: '#25D366' }}
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        {/* Back To Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-md text-white flex items-center justify-center shadow-md hover:bg-emerald-900 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Recently Viewed Properties Slide-Out Drawer */}
      <AnimatePresence>
        {showRecentDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRecentDrawer(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-800" />
                    <h3 className="font-display font-bold text-lg text-gray-900">Recently Viewed</h3>
                  </div>
                  <button
                    onClick={() => setShowRecentDrawer(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    aria-label="Close drawer"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-4">
                  {recentListings.map((p) => (
                    <Link
                      key={p.id}
                      href={`/properties/${p.slug}`}
                      onClick={() => setShowRecentDrawer(false)}
                      className="flex gap-3 p-2.5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all group"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-20 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 uppercase">
                          <Shield className="w-2.5 h-2.5" /> Verified
                        </div>
                        <h4 className="font-semibold text-xs text-gray-900 group-hover:text-emerald-800 line-clamp-1">
                          {p.title}
                        </h4>
                        <p className="text-[10px] text-gray-400">{p.location.city}</p>
                        <p className="text-xs font-bold text-emerald-950 mt-1">
                          {formatPrice(p.pricing.totalPrice)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/buyer-portal"
                  onClick={() => setShowRecentDrawer(false)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-center bg-emerald-800 text-white block hover:bg-emerald-700"
                >
                  Go to Buyer Dashboard →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showCookie && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-5 left-5 right-5 sm:left-6 sm:right-auto sm:max-w-md bg-gray-950/95 text-white backdrop-blur-xl rounded-3xl p-5 shadow-2xl border border-gray-800 z-50 flex flex-col gap-3.5"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs text-gray-300 leading-relaxed">
                We use privacy-preserving cookies to personalize verified property recommendations and maintain secure session states.
              </p>
              <button
                onClick={() => setShowCookie(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={acceptCookies}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-400 text-gray-950 hover:bg-amber-300 transition-colors"
              >
                Accept &amp; Continue
              </button>
              <Link
                href="/privacy-policy"
                className="text-xs text-gray-400 hover:text-white underline flex items-center gap-1"
              >
                <span>Privacy Policy</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
