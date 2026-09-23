'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle, MapPin } from 'lucide-react';
import { mockTestimonials } from '@/lib/mock/testimonials';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % mockTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const prev = () => { setIsAutoPlaying(false); setCurrent((p) => (p - 1 + mockTestimonials.length) % mockTestimonials.length); };
  const next = () => { setIsAutoPlaying(false); setCurrent((p) => (p + 1) % mockTestimonials.length); };

  return (
    <section
      id="testimonials"
      aria-label="Customer testimonials"
      className="section-padding bg-gradient-to-br from-gray-50 via-white to-emerald-50"
    >
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-sm font-semibold"
            style={{ background: 'rgba(201,162,39,0.1)', color: '#C9A227', border: '1px solid rgba(201,162,39,0.25)' }}
          >
            <Star className="w-3.5 h-3.5 fill-current" /> Real Stories, Real People
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Over 8,200 buyers, sellers, and NRIs have trusted Naradi for their most important property decisions.
          </p>
          <div className="separator-gold mx-auto mt-5" />
        </motion.div>

        {/* Main Carousel */}
        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Big Featured Testimonial */}
          <div className="relative overflow-hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 relative"
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-6 right-8 w-16 h-16 opacity-5"
                style={{ color: '#0F5132' }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(mockTestimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#C9A227' }} />
                ))}
              </div>

              {/* Review */}
              <blockquote className="font-display text-xl sm:text-2xl text-gray-800 leading-relaxed mb-8 italic">
                &ldquo;{mockTestimonials[current].review}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {mockTestimonials[current].avatar ? (
                  <img
                    src={mockTestimonials[current].avatar}
                    alt={mockTestimonials[current].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-emerald-100"
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)' }}
                  >
                    {mockTestimonials[current].name[0]}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{mockTestimonials[current].name}</span>
                    {mockTestimonials[current].isVerified && (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {mockTestimonials[current].location}
                  </div>
                  <div
                    className="text-xs font-semibold mt-1 px-2.5 py-0.5 rounded-full w-fit"
                    style={{ background: 'rgba(15,81,50,0.08)', color: '#0F5132' }}
                  >
                    {mockTestimonials[current].propertyType}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {mockTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 h-2.5' : 'w-2.5 h-2.5'
                  }`}
                  style={{ background: i === current ? '#0F5132' : '#cbd5e1' }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mini cards below */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-10">
          {mockTestimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
              className={`p-3 rounded-xl text-center transition-all duration-200 border ${
                i === current
                  ? 'border-emerald-300 bg-emerald-50 shadow-md'
                  : 'border-gray-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/50'
              }`}
            >
              {t.avatar ? (
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full mx-auto mb-2 object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)' }}>
                  {t.name[0]}
                </div>
              )}
              <p className="text-xs font-semibold text-gray-800 truncate">{t.name.split(' ')[0]}</p>
              <div className="flex justify-center gap-0.5 mt-1">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-2.5 h-2.5 fill-current" style={{ color: '#C9A227' }} />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
