import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, CheckCircle2, TrendingUp, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { propertyService } from '@/services/property';
import { formatPrice, formatArea } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Sold Properties & Verified Closures — Naradi Developers',
  description: 'Explore successfully sold and registered land parcels, villas, and commercial properties closed with 100% legal clearance and zero brokerage.',
};

export default async function SoldPropertiesPage() {
  const soldList = await propertyService.getSoldProperties();

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 lg:pt-36">
      {/* Hero */}
      <div className="container-xl">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022019] text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Verified Transaction Archive
            </span>

            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Recently Sold & Registered Properties
            </h1>

            <p className="mt-3 text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              Every property below was successfully vetted, matched directly between buyers and owners, and legally registered with complete paperwork transparency and zero broker commissions.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                ₹120+ Crores Transacted
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                Avg 24 Days on Market
              </span>
              <span>•</span>
              <span>100% Legal Clear Titles</span>
            </div>
          </div>
        </div>

        {/* Sold Grid */}
        <div className="mt-10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-gray-900">
              Closed Transactions ({soldList.length})
            </h2>
            <Link
              href="/seller-portal"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              Want to list your land? Submit for Verification →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {soldList.map((prop) => (
              <div
                key={prop.id}
                className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-slate-900 overflow-hidden">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover grayscale-[30%]"
                    />
                    {/* Sold Banner Ribbon */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-md flex items-center gap-1">
                      <span>✓ SOLD & REGISTERED</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow-md">
                      <span className="font-display font-black text-xl text-white">
                        {formatPrice(prop.pricing.totalPrice)}
                      </span>
                      <span className="text-xs font-semibold bg-black/60 px-2 py-0.5 rounded">
                        {formatArea(prop.pricing.totalArea, prop.pricing.areaUnit)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-display font-bold text-base text-gray-900 line-clamp-2">
                      {prop.title}
                    </h3>

                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                      {prop.location.address}, {prop.location.city}
                    </p>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed pt-1">
                      {prop.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between mt-3 text-xs">
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Zero Brokerage Saved: ₹{(prop.pricing.totalPrice * 0.02 / 100000).toFixed(1)}L
                  </span>

                  <Link
                    href={`/properties/${prop.slug}`}
                    className="font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
                  >
                    View Archive →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
