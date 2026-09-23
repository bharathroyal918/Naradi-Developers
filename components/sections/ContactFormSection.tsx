'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MessageCircle, Send, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  requirement: string;
  propertyInterest: string;
  message?: string;
}

export default function ContactFormSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log('Enquiry form submitted:', data);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section
      id="contact"
      aria-label="Direct quick enquiry and headquarters contact"
      className="py-20 lg:py-28 bg-[#fafaf9]"
    >
      <div className="container-xl max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(15,81,50,0.08)', color: '#0F5132' }}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Connect with Advisors</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Get in Touch with Naradi
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Schedule a physical visit, request legal title audit documents, or consult our senior land investment advisors.
          </p>
          <div className="w-16 h-1 rounded-full mx-auto mt-5" style={{ background: '#C9A227' }} />
        </motion.div>

        {/* Two-Column Layout */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (7 Cols): Quick Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xl"
          >
            <div className="mb-6">
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-1">
                Quick Property Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-light">
                Fill out the quick form below. Our regional property advisor will connect with you in under 15 minutes.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-display font-bold text-lg text-emerald-950 mb-1">Enquiry Received!</h4>
                <p className="text-xs text-emerald-800">
                  Thank you. Our dedicated property advisor will call or WhatsApp you shortly with verified documents.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register('phone', { required: 'Phone is required' })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all"
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      {...register('email', { required: 'Email is required' })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Property Interest */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Property Interest *
                    </label>
                    <select
                      {...register('propertyInterest', { required: true })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:bg-white focus:border-emerald-700 outline-none cursor-pointer"
                    >
                      <option value="Residential Plot">Residential Plot (BDA / DTCP)</option>
                      <option value="Commercial Land">Commercial Land / Highway Frontage</option>
                      <option value="Agricultural Land">Agricultural Farmland</option>
                      <option value="Farm House">Farm House / Countryside Estate</option>
                      <option value="Industrial Land">Industrial Land / Warehouse</option>
                      <option value="NRI Consultation">NRI Investment Portfolio</option>
                    </select>
                  </div>
                </div>

                {/* Requirement / Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Requirement &amp; Budget
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us your target location (e.g. Yelahanka, Bengaluru), budget, and expected timeline..."
                    {...register('requirement')}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl font-bold text-sm text-emerald-950 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #C9A227, #e0c068)',
                    boxShadow: '0 6px 20px rgba(201, 162, 39, 0.35)',
                  }}
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Property Enquiry (Free)'}</span>
                </button>
                <p className="text-[11px] text-gray-400 text-center">
                  🔒 Strictly Confidential. No spam. Zero brokerage guaranteed.
                </p>
              </form>
            )}
          </motion.div>

          {/* Right Column (5 Cols): Contact Cards & Headquarters Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Phone Card */}
            <a
              href="tel:+919876543210"
              className="flex items-start gap-4 p-4 sm:p-5 bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:border-emerald-600 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Direct Phone Support</p>
                <p className="font-display font-bold text-base text-gray-900 group-hover:text-emerald-800 transition-colors">+91 98765 43210</p>
                <p className="text-xs text-gray-500 mt-0.5">Toll-free across India • Mon–Sat</p>
              </div>
            </a>

            {/* Email Card */}
            <a
              href="mailto:info@naradidevelopers.com"
              className="flex items-start gap-4 p-4 sm:p-5 bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:border-emerald-600 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Official Email</p>
                <p className="font-display font-bold text-base text-gray-900 group-hover:text-emerald-800 transition-colors">info@naradidevelopers.com</p>
                <p className="text-xs text-gray-500 mt-0.5">Response guaranteed within 24 hours</p>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 sm:p-5 bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:border-emerald-600 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Instant WhatsApp Chat</p>
                <p className="font-display font-bold text-base text-gray-900 group-hover:text-emerald-800 transition-colors">+91 98765 43210</p>
                <p className="text-xs text-gray-500 mt-0.5">Instant plot layout PDFs &amp; survey pins</p>
              </div>
            </a>

            {/* Office & Working Hours Card */}
            <div className="p-5 sm:p-6 bg-white rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="flex items-start gap-3.5 mb-3.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Headquarters Office</p>
                  <p className="font-semibold text-xs text-gray-900 leading-snug mt-0.5">
                    8th Main Rd, Judicial Layout, Yelahanka, Bengaluru, Karnataka 560065
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                <Clock className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Working Hours: Mon – Sat: 9:00 AM – 7:00 PM IST</span>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="relative h-48 rounded-3xl overflow-hidden shadow-md border border-gray-200 flex flex-col items-center justify-center text-center p-4 bg-emerald-950 text-white">
              <MapPin className="w-8 h-8 text-amber-400 mb-2 animate-bounce" />
              <p className="font-display font-bold text-sm text-white">Naradi Developers Corporate HQ</p>
              <p className="text-[11px] text-emerald-200 max-w-xs mt-1">
                8th Main Rd, Judicial Layout, Yelahanka, Bengaluru
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-bold text-amber-300 border border-white/20 transition-colors"
              >
                Open in Google Maps →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
