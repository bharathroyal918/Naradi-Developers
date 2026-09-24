'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, CheckCircle2, User, Phone, Mail, Sparkles, Video } from 'lucide-react';
import type { Property } from '@/types';

interface ScheduleVisitModalProps {
  property?: Property;
  propertyTitle?: string;
  propertyLocation?: string;
  isOpen?: boolean;
  onClose: () => void;
}

export function ScheduleVisitModal({ 
  property, 
  propertyTitle, 
  propertyLocation, 
  isOpen = true, 
  onClose 
}: ScheduleVisitModalProps) {
  const title = propertyTitle || property?.title || 'Verified Property';
  const location = propertyLocation || (property ? `${property.location.locality}, ${property.location.city}` : '');
  const [visitType, setVisitType] = useState<'physical' | 'virtual'>('physical');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10 my-8"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Verified Site Tour
            </span>
            <h3 className="text-xl font-display font-bold">Schedule Property Visit</h3>
            <p className="text-xs text-emerald-200/80 mt-1 line-clamp-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0 text-amber-400" />
              {title} {location ? `• ${location}` : ''}
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {isSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {visitType === 'physical' ? 'Priority Site Visit Reserved!' : 'Virtual Tour Scheduled!'}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 max-w-xs mx-auto">
                    Your {visitType === 'physical' ? 'priority on-ground inspection' : 'live virtual video tour'} for{' '}
                    <span className="font-semibold text-emerald-800">{preferredDate || 'upcoming date'}</span> at{' '}
                    <span className="font-semibold text-emerald-800">{preferredTime}</span> has been received.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 text-[11px] text-gray-600 border border-gray-200 text-left space-y-1.5">
                  {visitType === 'physical' ? (
                    <>
                      <p className="font-bold text-emerald-950 flex items-center justify-between">
                        <span>Dedicated Land Surveyor Assignment</span>
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">₹2,000 Token</span>
                      </p>
                      <p className="text-gray-600">
                        Our relationship manager will reach out on WhatsApp ({phone || '+91 98765 43210'}) within 30 minutes to confirm your initial ₹2,000 commitment token receipt, share surveyor contact details, and send live GPS navigation.
                      </p>
                      <p className="text-[10px] text-emerald-800 font-semibold pt-1 border-t border-gray-200/80">
                        ✓ Note: Your ₹2,000 commitment fee is 100% credited into your property booking token.
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-600">
                      A relationship manager will share your Google Meet / WhatsApp 360° video tour link with HD drone footage to {phone || '+91 98765 43210'}.
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-md shadow-emerald-900/10"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Visit Type Toggle */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Select Visit Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setVisitType('physical')}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        visitType === 'physical'
                          ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/10 text-emerald-950 font-bold'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        <div>
                          <div className="text-xs">Physical Visit</div>
                          <div className="text-[10px] text-gray-500 font-normal">On-ground with Surveyor</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                        ₹2,000
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisitType('virtual')}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        visitType === 'virtual'
                          ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/10 text-emerald-950 font-bold'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <div>
                          <div className="text-xs">Virtual 360 Tour</div>
                          <div className="text-[10px] text-gray-500 font-normal">HD Video / Remote</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Free
                      </span>
                    </button>
                  </div>
                </div>

                {/* Visit Type Policy Context Banner */}
                {visitType === 'physical' ? (
                  <div className="p-3 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 flex items-start gap-2.5 text-xs leading-relaxed">
                    <div className="w-6 h-6 rounded-lg bg-amber-400 text-emerald-950 font-black text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      ₹2K
                    </div>
                    <div>
                      <div className="font-bold text-amber-900 flex flex-wrap items-center gap-1.5">
                        <span>Serious Buyer Commitment Token</span>
                        <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full border border-emerald-200">
                          100% Adjusted on Purchase
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-900/90 mt-0.5">
                        To eliminate time-wasters and ensure dedicated one-on-one time from our senior land surveyor, physical visits require an initial token of <strong>₹2,000</strong>. This fee is <strong>100% credited into your property booking</strong>.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 flex items-start gap-2 text-xs leading-relaxed">
                    <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-900">Virtual 360° Tours are 100% Free:</span>{' '}
                      <span className="text-emerald-800 text-[11px]">
                        Inspect boundaries, drone footage, and surroundings over a live guided video call before scheduling your on-ground physical visit.
                      </span>
                    </div>
                  </div>
                )}

                {/* Date & Time Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Date *</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Time *</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 bg-white"
                      >
                        <option>10:00 AM</option>
                        <option>11:30 AM</option>
                        <option>02:00 PM</option>
                        <option>03:30 PM</option>
                        <option>05:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="space-y-2.5 pt-1">
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Number *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                      />
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Any specific requests or requirements (optional)..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-900/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting
                    ? 'Reserving Visit Slot...'
                    : visitType === 'physical'
                    ? 'Reserve Priority Visit (₹2,000 Commitment Token)'
                    : 'Confirm Free Virtual 360° Tour'}
                </button>
                {visitType === 'physical' && (
                  <p className="text-[10.5px] text-center text-gray-500 font-medium -mt-1 leading-snug">
                    🔒 Nominal ₹2,000 token is 100% credited into your property booking. Strictly for genuine buyers.
                  </p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ScheduleVisitModal;
