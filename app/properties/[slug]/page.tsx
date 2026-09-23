'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Shield, Eye, Heart, Share2, Phone, MessageCircle,
  Calendar, Download, ChevronLeft, ChevronRight,
  FileText, ArrowLeft, CheckCircle, X,
  Building, Compass, Car, Trees, Award, HelpCircle,
  Scale, Star, Send, Clock, BadgeCheck
} from 'lucide-react';
import { mockProperties } from '@/lib/mock/properties';
import type { Property } from '@/types';
import { formatPrice, formatArea, categoryLabels } from '@/lib/utils';
import { ScheduleVisitModal } from '@/components/properties/ScheduleVisitModal';
import { ShareModal } from '@/components/properties/ShareModal';
import { MortgageCalculator } from '@/components/properties/MortgageCalculator';

// Mock helper
function getProperty(slug: string) {
  return mockProperties.find((p) => p.slug === slug) || null;
}

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = 'then' in params ? use(params) : params;
  const property = getProperty(resolvedParams.slug);

  if (!property) {
    const demo = mockProperties[0];
    return <PropertyDetail property={demo} />;
  }

  return <PropertyDetail property={property} />;
}

function PropertyDetail({ property }: { property: Property }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'location' | 'legal' | 'calculator' | 'reviews' | 'similar'>('overview');
  const [activeImg, setActiveImg] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [activePlanView, setActivePlanView] = useState<'master' | 'floor'>('master');
  const [virtualTourActive, setVirtualTourActive] = useState(false);

  // Review submission state
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'r1',
      name: 'Dr. Srinivas Rao',
      date: 'September 2026',
      rating: 5,
      comment: 'Inspected the legal documents with our advocate. The A-Khata and clear BDA parent deed made this an exceptionally safe transaction. Excellent layout planning.',
      verified: true,
    },
    {
      id: 'r2',
      name: 'Ananya & Karthik V.',
      date: 'August 2026',
      rating: 5,
      comment: 'Naradi arranged an immediate physical site visit with their land surveyor. True dimensions matched the master plan down to the inch.',
      verified: true,
    }
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;
    setReviewsList((prev) => [
      {
        id: `r-${Date.now()}`,
        name: newReviewAuthor.trim(),
        date: 'Just now',
        rating: newReviewRating,
        comment: newReviewComment.trim(),
        verified: true,
      },
      ...prev,
    ]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'plans', label: 'Master & Floor Plan' },
    { id: 'location', label: 'Location & Transit' },
    { id: 'legal', label: 'Legal & Verification' },
    { id: 'calculator', label: 'EMI Calculator' },
    { id: 'reviews', label: `Reviews (${reviewsList.length})` },
    { id: 'similar', label: 'Similar Properties' },
  ];

  const similarProperties = mockProperties
    .filter((p) => p.id !== property.id && (p.category === property.category || p.location.city === property.location.city))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Gallery */}
      <div className="relative bg-gray-950 pt-20">
        {/* Main Image Banner */}
        <div className="relative h-[48vh] sm:h-[62vh] overflow-hidden">
          <motion.div
            key={activeImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${property.images[activeImg]}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-black/30" />

          {/* Image Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImg((p) => (p - 1 + property.images.length) % property.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/85 transition-all shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActiveImg((p) => (p + 1) % property.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/85 transition-all shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Interactive 360 View / Video Tour Triggers */}
          <div className="absolute bottom-5 left-6 flex flex-wrap gap-2.5 z-10">
            <button
              onClick={() => setVirtualTourActive(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/70 text-white text-xs font-bold border border-white/30 hover:bg-black/85 transition-all shadow-lg"
            >
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              Interactive 360° Tour
            </button>
            <button
              onClick={() => setIsVisitOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-emerald-950 text-xs font-bold hover:bg-amber-300 transition-all shadow-lg"
            >
              <Calendar className="w-3.5 h-3.5" />
              Schedule Drone / Physical Visit
            </button>
          </div>

          {/* Top Floating Bar */}
          <div className="absolute top-5 left-6 right-6 flex items-center justify-between z-10">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/70 text-white/90 text-xs font-semibold hover:text-white hover:bg-black/90 transition-all border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Listings
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href={`/properties/compare?ids=${property.id}`}
                className="w-9 h-9 rounded-xl bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-all border border-white/10"
                title="Compare this property"
              >
                <Scale className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border border-white/10 ${
                  isWishlisted ? 'bg-red-500 text-white' : 'bg-black/70 text-white hover:bg-black/90'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => setIsShareOpen(true)}
                className="w-9 h-9 rounded-xl bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-all border border-white/10"
                aria-label="Share property"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {property.images.length > 1 && (
          <div className="flex gap-2.5 px-6 pb-4 overflow-x-auto scrollbar-none">
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  i === activeImg ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label={`Thumbnail ${i + 1}`}
              >
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="container-xl py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Left Content */}
          <div className="flex-1 min-w-0">
            {/* Title & Primary Metrics Box */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 mb-6 shadow-sm">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                <Link href="/" className="hover:text-emerald-700">Home</Link>
                <span>/</span>
                <Link href="/properties" className="hover:text-emerald-700">Properties</Link>
                <span>/</span>
                <span className="text-gray-700 font-semibold">{categoryLabels[property.category]}</span>
              </nav>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {property.isVerified && (
                  <span className="badge-verified shadow-sm">
                    <Shield className="w-3.5 h-3.5" /> 100% Title Verified
                  </span>
                )}
                {property.isDTCP && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm" style={{ background: '#2563eb' }}>
                    DTCP Approved
                  </span>
                )}
                {property.isRERA && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm" style={{ background: '#7c3aed' }}>
                    RERA Certified
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' }}>
                  For {property.listingType}
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-4xl font-black text-gray-900 mb-2 leading-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{property.location.address}, {property.location.locality}, {property.location.city} - {property.location.pincode}</span>
              </div>

              {/* Key Quantitative Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-gradient-to-br from-emerald-50/50 to-gray-50 rounded-2xl border border-emerald-100/60">
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Total Valuation</div>
                  <div className="font-display font-black text-2xl sm:text-3xl text-emerald-950">
                    {formatPrice(property.pricing.totalPrice)}
                  </div>
                  {property.pricing.isNegotiable && (
                    <span className="text-[11px] text-emerald-700 font-bold">Negotiable</span>
                  )}
                </div>
                <div className="border-l border-gray-200/80 pl-4">
                  <div className="text-xs text-gray-500 font-medium mb-1">Total Land/Built Area</div>
                  <div className="font-display font-bold text-lg text-gray-900">
                    {formatArea(property.pricing.totalArea, property.pricing.areaUnit)}
                  </div>
                  <div className="text-[11px] text-gray-500">100% On-Site Clear</div>
                </div>
                {property.pricing.pricePerSqFt && (
                  <div className="border-l border-gray-200/80 pl-4">
                    <div className="text-xs text-gray-500 font-medium mb-1">Unit Rate</div>
                    <div className="font-display font-bold text-lg text-gray-900">
                      ₹{property.pricing.pricePerSqFt.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-gray-500">per sq.ft</div>
                  </div>
                )}
                <div className="border-l border-gray-200/80 pl-4">
                  <div className="text-xs text-gray-500 font-medium mb-1">Orientation & Facing</div>
                  <div className="font-display font-bold text-lg text-amber-700 capitalize">
                    {property.pricing.facing || 'East Facing'}
                  </div>
                  <div className="text-[11px] text-gray-500">Vaastu Compliant</div>
                </div>
              </div>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-5 border-t border-gray-100 text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-emerald-600" /> {property.views.toLocaleString()} verified views</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gray-400" /> Listed: {property.postedAt}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-100/60 px-3 py-1 rounded-full">
                  <BadgeCheck className="w-4 h-4 text-emerald-700" />
                  Naradi Legal Guarantee Included
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="flex overflow-x-auto border-b border-gray-100 px-3 scrollbar-none">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex-shrink-0 px-5 py-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-px ${
                      activeTab === tab.id
                        ? 'border-emerald-800 text-emerald-900'
                        : 'border-transparent text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6 sm:p-8">
                {/* TAB 1: OVERVIEW */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-xl font-bold text-gray-900 mb-3">About this Property</h2>
                      <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                        {property.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 text-base mb-3">Comprehensive Specifications</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { label: 'Category', value: categoryLabels[property.category] },
                          { label: 'Total Land Area', value: formatArea(property.pricing.totalArea, property.pricing.areaUnit) },
                          { label: 'Facing Orientation', value: property.pricing.facing || 'East Facing' },
                          { label: 'Approach Road Width', value: property.roadWidth || '40 Ft Black-Top' },
                          { label: 'Boundary Fencing', value: 'Compound Wall with Gate' },
                          { label: 'Water Resource', value: 'Borewell & Municipal Line' },
                          { label: 'Electricity Supply', value: '3-Phase High Tension' },
                          { label: 'Approval Authority', value: property.isDTCP ? 'DTCP Approved' : property.isRERA ? 'RERA Approved' : 'BDA / BMRDA Cleared' },
                          ...(property.pricing.plotLength ? [{ label: 'Dimensions', value: `${property.pricing.plotLength}ft × ${property.pricing.plotWidth}ft` }] : []),
                          ...(property.pricing.bedrooms ? [{ label: 'Bedrooms', value: `${property.pricing.bedrooms} BHK Master Suites` }] : []),
                          ...(property.pricing.bathrooms ? [{ label: 'Bathrooms', value: `${property.pricing.bathrooms} Luxury Baths` }] : []),
                        ].map((item) => (
                          <div key={item.label} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                            <div className="text-[11px] text-gray-400 font-medium mb-1">{item.label}</div>
                            <div className="font-bold text-gray-900 text-sm">{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amenities Highlight */}
                    <div>
                      <h3 className="font-bold text-gray-900 text-base mb-3">Included Infrastructure & Amenities</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {property.amenities.map((amenity) => (
                          <div key={amenity.id} className="flex items-center gap-3 p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100/80">
                            <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                            <span className="text-xs text-gray-900 font-semibold">{amenity.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: PLANS (MASTER & FLOOR) */}
                {activeTab === 'plans' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-display text-xl font-bold text-gray-900">Layout & Dimension Blueprints</h2>
                        <p className="text-xs text-gray-500">High-resolution architectural CAD master plan and plot setback analysis</p>
                      </div>
                      <div className="flex bg-gray-100 rounded-xl p-1">
                        <button
                          onClick={() => setActivePlanView('master')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            activePlanView === 'master' ? 'bg-white text-emerald-950 shadow-sm' : 'text-gray-500'
                          }`}
                        >
                          Master Layout (2D)
                        </button>
                        <button
                          onClick={() => setActivePlanView('floor')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            activePlanView === 'floor' ? 'bg-white text-emerald-950 shadow-sm' : 'text-gray-500'
                          }`}
                        >
                          Floor & Setback View
                        </button>
                      </div>
                    </div>

                    {/* Interactive Blueprint Placeholder Box */}
                    <div className="relative h-80 sm:h-96 rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center justify-center overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201, 162, 39, 0.4) 1px, transparent 0)`,
                          backgroundSize: '24px 24px',
                        }}
                      />
                      
                      {/* Blueprint Mock Lines */}
                      <svg className="w-full h-full max-w-md opacity-70" viewBox="0 0 400 300">
                        <rect x="40" y="40" width="320" height="220" fill="none" stroke="#C9A227" strokeWidth="2" strokeDasharray="4,4" />
                        <rect x="70" y="70" width="260" height="160" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2" />
                        <line x1="70" y1="150" x2="330" y2="150" stroke="#10b981" strokeWidth="1.5" />
                        <line x1="200" y1="70" x2="200" y2="230" stroke="#10b981" strokeWidth="1.5" />
                        <text x="135" y="115" fill="#ffffff" fontSize="12" textAnchor="middle">Zone A: Main Wing</text>
                        <text x="265" y="115" fill="#ffffff" fontSize="12" textAnchor="middle">Zone B: Utilities</text>
                        <text x="135" y="195" fill="#ffffff" fontSize="12" textAnchor="middle">Setback: 10 Ft</text>
                        <text x="265" y="195" fill="#ffffff" fontSize="12" textAnchor="middle">Access Road: 40 Ft</text>
                      </svg>

                      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white/70">
                        <span>Architectural Drawing #NRD-PLN-2026</span>
                        <button
                          onClick={() => alert('High-res CAD blueprint download initialized.')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" /> Download Vector PDF
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: LOCATION & TRANSIT */}
                {activeTab === 'location' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-xl font-bold text-gray-900 mb-1">Location & Transit Accessibility</h2>
                      <p className="text-xs text-gray-500">Verified commute times calculated from actual traffic telemetry</p>
                    </div>

                    <div className="map-placeholder h-64 rounded-3xl mb-6 relative overflow-hidden bg-emerald-950 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center mb-3 shadow-xl">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-white text-base mb-1">{property.location.address}</h4>
                      <p className="text-xs text-emerald-200 max-w-sm mb-4">
                        {property.location.locality}, {property.location.city} - {property.location.pincode}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.location.address} ${property.location.city}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-white text-emerald-900 text-xs font-bold hover:bg-emerald-50 transition-colors shadow-lg"
                      >
                        Open in Google Maps Satellite
                      </a>
                    </div>

                    {property.nearbyPlaces && (
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">Key Distance Benchmarks</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {property.nearbyPlaces.map((place) => (
                            <div key={place.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                              <span className="text-xs font-bold text-gray-800">{place.name}</span>
                              <span className="text-xs font-black text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                                {place.distance}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 4: LEGAL & DOCUMENTS */}
                {activeTab === 'legal' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-xl font-bold text-gray-900 mb-1">Legal Clearance & Due Diligence</h2>
                      <p className="text-xs text-gray-500">Every property on Naradi Developers undergoes rigorous 40-year title tracing</p>
                    </div>

                    <div className="space-y-3">
                      {property.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 text-sm">{doc.name}</div>
                              <div className="text-xs text-gray-400 capitalize">{doc.type.replace('-', ' ')} • Verified by High Court Advocate</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {doc.verified && (
                              <span className="badge-verified">
                                <CheckCircle className="w-3.5 h-3.5 inline mr-1" />
                                Verified Clear
                              </span>
                            )}
                            <button
                              onClick={() => setIsEnquiryOpen(true)}
                              className="text-xs font-bold text-emerald-800 hover:underline px-3 py-1.5 rounded-lg hover:bg-emerald-50"
                            >
                              Request Copy
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                      <strong className="font-bold">Naradi Protection Guarantee:</strong> Full un-redacted copies of Mother Deed, Patta/Khata Transfer, Encumbrance Certificate (Form 15), and Conversion Orders are immediately released to buyers upon initial enquiry or site visit verification.
                    </div>
                  </div>
                )}

                {/* TAB 5: EMI / MORTGAGE CALCULATOR */}
                {activeTab === 'calculator' && (
                  <div>
                    <h2 className="font-display text-xl font-bold text-gray-900 mb-1">Mortgage & Loan Planning</h2>
                    <p className="text-xs text-gray-500 mb-6">Calculate monthly instalments pre-approved by SBI, HDFC, ICICI, and Axis Bank</p>
                    <MortgageCalculator initialPrice={property.pricing.totalPrice} />
                  </div>
                )}

                {/* TAB 6: REVIEWS */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-display text-xl font-bold text-gray-900">Verified Buyer Reviews</h2>
                        <p className="text-xs text-gray-500">Feedback from actual visitors and registered investors</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 px-3 py-1.5 rounded-xl font-bold text-sm">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        5.0 / 5.0 (100% Recommended)
                      </div>
                    </div>

                    {/* Existing Reviews List */}
                    <div className="space-y-4">
                      {reviewsList.map((rev) => (
                        <div key={rev.id} className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900 text-sm">{rev.name}</span>
                              {rev.verified && (
                                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                                  Verified Site Visitor
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">{rev.date}</span>
                          </div>
                          <div className="flex gap-1 text-amber-400 mb-2">
                            {Array.from({ length: rev.rating }).map((_, idx) => (
                              <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                        </div>
                      ))}
                    </div>

                    {/* Leave a review form */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <h3 className="font-bold text-gray-900 text-sm mb-3">Add Your Property Review</h3>
                      {reviewSubmitted ? (
                        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center">
                          ✓ Thank you! Your review has been submitted for moderation.
                        </div>
                      ) : (
                        <form onSubmit={handleAddReview} className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              required
                              type="text"
                              placeholder="Your Full Name"
                              value={newReviewAuthor}
                              onChange={(e) => setNewReviewAuthor(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:border-emerald-700"
                            />
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-gray-600">Rating:</span>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setNewReviewRating(star)}
                                  className="text-amber-400 focus:outline-none"
                                >
                                  <Star className={`w-4 h-4 ${star <= newReviewRating ? 'fill-amber-400' : 'text-gray-300'}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                          <textarea
                            required
                            rows={3}
                            placeholder="Share your feedback regarding location, documents, or site visit experience..."
                            value={newReviewComment}
                            onChange={(e) => setNewReviewComment(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:border-emerald-700"
                          />
                          <button
                            type="submit"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                          >
                            <Send className="w-3.5 h-3.5" /> Submit Review
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 7: SIMILAR PROPERTIES */}
                {activeTab === 'similar' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-xl font-bold text-gray-900 mb-1">Recommended Similar Properties</h2>
                      <p className="text-xs text-gray-500">Hand-curated matching listings in {property.location.city}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {similarProperties.map((p) => (
                        <Link
                          key={p.id}
                          href={`/properties/${p.slug}`}
                          className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between group"
                          style={{ textDecoration: 'none' }}
                        >
                          <div
                            className="h-32 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                            style={{ backgroundImage: `url('${p.images[0]}')` }}
                          />
                          <div className="p-3.5">
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full mb-1 inline-block">
                              {categoryLabels[p.category]}
                            </span>
                            <h4 className="font-bold text-gray-900 text-xs line-clamp-1">{p.title}</h4>
                            <p className="text-[11px] text-gray-500 mt-0.5">{p.location.locality}, {p.location.city}</p>
                            <div className="font-black text-gray-900 text-sm mt-2">
                              {formatPrice(p.pricing.totalPrice)}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Conversion Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Primary Action Card */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Purchase Value</span>
                  <div className="font-display text-3xl font-black text-gray-900 mt-0.5">
                    {formatPrice(property.pricing.totalPrice)}
                    {property.listingType === 'lease' && <span className="text-xs text-gray-500 font-normal">/month</span>}
                  </div>
                  {property.pricing.pricePerSqFt && (
                    <p className="text-xs text-gray-500 mt-1">₹{property.pricing.pricePerSqFt.toLocaleString()} per sq.ft</p>
                  )}
                  {property.pricing.isNegotiable && (
                    <p className="text-xs text-emerald-700 font-bold mt-1">✓ Price Negotiable via Naradi Desk</p>
                  )}
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => setIsEnquiryOpen(true)}
                    className="w-full py-3.5 rounded-xl font-bold text-white text-xs shadow-md shadow-emerald-900/10 hover:brightness-110 transition-all"
                    style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)', border: 'none', cursor: 'pointer' }}
                  >
                    Send Instant Enquiry
                  </button>

                  <button
                    onClick={() => setIsVisitOpen(true)}
                    className="w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all text-emerald-950"
                    style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)', border: 'none', cursor: 'pointer' }}
                  >
                    <Calendar className="w-4 h-4" /> Book Site Visit (Free)
                  </button>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href="tel:+919876543210"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs border border-gray-200 text-gray-700 hover:border-emerald-300 hover:text-emerald-800 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Manager
                    </a>
                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi Naradi Developers, I am interested in property: ${property.title} (Price: ${formatPrice(property.pricing.totalPrice)})`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs text-white shadow-sm"
                      style={{ background: '#25D366' }}
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>

                {/* Compare & Save quick row */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      isWishlisted
                        ? 'border-red-200 text-red-600 bg-red-50'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                    {isWishlisted ? 'Saved' : 'Save'}
                  </button>
                  <Link
                    href={`/properties/compare?ids=${property.id}`}
                    className="flex-1 py-2 rounded-xl text-xs font-bold border border-gray-200 text-gray-600 hover:border-gray-300 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Scale className="w-3.5 h-3.5" /> Compare
                  </Link>
                  <button
                    onClick={() => setIsShareOpen(true)}
                    className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:border-gray-300 transition-all"
                    title="Share"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Download Brochure CTA */}
              <button
                onClick={() => alert(`Official brochure for ${property.title} has been generated and downloaded.`)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs border-2 border-dashed border-emerald-300 text-emerald-800 hover:bg-emerald-50 transition-all"
              >
                <Download className="w-4 h-4" /> Download Official Brochure (PDF)
              </button>

              {/* Dedicated Naradi Relationship Manager Card */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">Direct Property Desk</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-amber-400 font-display font-black text-lg shadow-md">
                    N
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-xs">Naradi Certified Executive</p>
                    <p className="text-[11px] text-gray-500">Legal & Verification Specialist</p>
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-700 font-bold">
                      <Shield className="w-3 h-3 text-emerald-600" />
                      Assigned Relationship Desk
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-16 left-0 right-0 lg:hidden z-30 bg-white border-t border-gray-200 p-3 shadow-2xl">
        <div className="flex gap-2 max-w-lg mx-auto">
          <button
            onClick={() => setIsEnquiryOpen(true)}
            className="flex-1 py-3 rounded-xl font-bold text-white text-xs shadow-md"
            style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)' }}
          >
            Enquire Now
          </button>
          <button
            onClick={() => setIsVisitOpen(true)}
            className="px-4 py-3 rounded-xl font-bold text-emerald-950 text-xs shadow-md"
            style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)' }}
          >
            Visit
          </button>
          <a href="tel:+919876543210" className="p-3 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700">
            <Phone className="w-4 h-4" />
          </a>
          <a href="https://wa.me/919876543210" className="p-3 rounded-xl flex items-center justify-center text-white" style={{ background: '#25D366' }}>
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Quick Enquiry Modal */}
      {isEnquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
            <button
              onClick={() => { setIsEnquiryOpen(false); setEnquirySubmitted(false); }}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-gray-900 mb-1">
              Enquire about this Property
            </h3>
            <p className="text-xs text-gray-500 mb-4 line-clamp-1">{property.title}</p>

            {enquirySubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900">Enquiry Sent Successfully!</h4>
                <p className="text-xs text-gray-500">Our relationship manager will contact you within 30 minutes with the legal dossier.</p>
                <button
                  onClick={() => { setIsEnquiryOpen(false); setEnquirySubmitted(false); }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEnquirySubmitted(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Your Name</label>
                  <input required type="text" placeholder="e.g. Ramesh Kumar" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Phone Number</label>
                  <input required type="tel" placeholder="+91 98765 43210" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Email</label>
                  <input required type="email" placeholder="name@example.com" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Message</label>
                  <textarea rows={2} defaultValue="I am interested in this property. Please share full details and documentation." className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:border-emerald-600" />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-white text-sm mt-2 shadow-md shadow-emerald-900/10"
                  style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)' }}
                >
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 360 Virtual Tour Modal */}
      {virtualTourActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl p-6 border border-slate-800 text-white shadow-2xl">
            <button
              onClick={() => setVirtualTourActive(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-slate-800"
              aria-label="Close virtual tour"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="font-display text-xl font-bold mb-1">Interactive 360° Virtual Tour</h3>
            <p className="text-xs text-gray-400 mb-4">{property.title} — High Precision Panoramic Simulation</p>
            
            <div className="relative h-96 rounded-2xl overflow-hidden bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url('${property.images[0]}')` }}>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />
              <div className="relative z-10 text-center p-6 bg-black/60 rounded-2xl max-w-md border border-white/20">
                <Compass className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-spin" style={{ animationDuration: '10s' }} />
                <h4 className="font-bold text-base mb-1">360° Immersive Aerial Drone Stream</h4>
                <p className="text-xs text-gray-300 mb-4">Click and drag around the viewport to inspect boundary fencing, elevation, and surrounding infrastructure.</p>
                <button
                  onClick={() => setIsVisitOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 text-emerald-950 text-xs font-bold hover:bg-amber-300 transition-colors"
                >
                  Book Private Guided 360 Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Visit Modal */}
      {isVisitOpen && (
        <ScheduleVisitModal
          propertyTitle={property.title}
          propertyLocation={`${property.location.locality}, ${property.location.city}`}
          onClose={() => setIsVisitOpen(false)}
        />
      )}

      {/* Share Modal */}
      {isShareOpen && (
        <ShareModal
          title={property.title}
          url={typeof window !== 'undefined' ? `${window.location.origin}/properties/${property.slug}` : `https://naradidevelopers.com/properties/${property.slug}`}
          onClose={() => setIsShareOpen(false)}
        />
      )}
    </div>
  );
}
