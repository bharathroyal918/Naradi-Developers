import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2, MessageCircle, Mail, QrCode } from 'lucide-react';
import type { Property } from '@/types';

interface ShareModalProps {
  property?: Property | null;
  title?: string;
  url?: string;
  isOpen?: boolean;
  onClose: () => void;
}

export function ShareModal({ property, title, url: customUrl, isOpen = true, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  if (!isOpen) return null;

  const resolvedTitle = title || property?.title || 'Verified Property';
  const url = customUrl || (typeof window !== 'undefined' 
    ? `${window.location.origin}/properties/${property?.slug || ''}` 
    : `https://naradidevelopers.com/properties/${property?.slug || ''}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Take a look at this verified property on Naradi Developers:\n\n*${resolvedTitle}*\n${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Verified Property: ${resolvedTitle}`);
    const body = encodeURIComponent(`Hello,\n\nI found this verified property on Naradi Developers and thought you might be interested:\n\n${resolvedTitle}\n${property ? `Location: ${property.location.address}, ${property.location.city}\n` : ''}\nView details here: ${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10 p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-gray-900 text-base">Share Property</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-4 space-y-4">
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
              {property?.images?.[0] ? (
                <img
                  src={property.images[0]}
                  alt={resolvedTitle}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  N
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">{resolvedTitle}</p>
                <p className="text-[11px] text-gray-500 truncate">
                  {property ? `${property.location.city} • ₹${(property.pricing.totalPrice / 100000).toFixed(1)} Lakhs` : 'Naradi Developers Certified'}
                </p>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-emerald-50 text-emerald-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold">WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleEmail}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-blue-50 text-blue-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold">Email</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                }}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-sky-50 text-sky-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-semibold">LinkedIn</span>
              </button>

              <button
                type="button"
                onClick={() => setShowQR(!showQR)}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-amber-50 text-amber-900 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                  <QrCode className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold">QR Code</span>
              </button>
            </div>

            {/* QR Code expansion */}
            {showQR && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 text-center space-y-2">
                <div className="w-32 h-32 bg-white mx-auto border rounded-xl flex items-center justify-center p-2 shadow-inner">
                  {/* Generated QR representation */}
                  <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center">
                    <QrCode className="w-12 h-12 text-gray-700" />
                    <span className="text-[9px] text-gray-500 font-mono mt-1">SCAN ON MOBILE</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500">Scan to open this listing directly on mobile</p>
              </div>
            )}

            {/* Copy Link Input */}
            <div className="pt-2">
              <label className="block text-[11px] font-bold text-gray-600 mb-1">Direct Link</label>
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-gray-200 bg-gray-50">
                <input
                  type="text"
                  readOnly
                  value={url}
                  className="bg-transparent text-xs text-gray-700 px-2 flex-1 outline-none truncate font-mono"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 hover:bg-emerald-800 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ShareModal;
