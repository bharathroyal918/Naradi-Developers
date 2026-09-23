'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, X, Shield, Plus, Trash2, SlidersHorizontal, Sparkles, MapPin } from 'lucide-react';
import { mockProperties } from '@/lib/mock/properties';
import type { Property } from '@/types';
import { formatPrice, formatArea, categoryLabels } from '@/lib/utils';

export default function ComparePropertiesPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'prop-001',
    'prop-007',
    'prop-004',
  ]);
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Load from localStorage or defaults
  useEffect(() => {
    try {
      const stored = localStorage.getItem('naradi_compare');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedIds(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleRemove = (id: string) => {
    const updated = selectedIds.filter((item) => item !== id);
    setSelectedIds(updated);
    localStorage.setItem('naradi_compare', JSON.stringify(updated));
  };

  const handleAdd = (id: string) => {
    if (selectedIds.length >= 4) {
      alert('You can compare a maximum of 4 properties at a time.');
      return;
    }
    const updated = [...selectedIds, id];
    setSelectedIds(updated);
    localStorage.setItem('naradi_compare', JSON.stringify(updated));
  };

  const comparedProperties = selectedIds
    .map((id) => mockProperties.find((p) => p.id === id || p.slug === id))
    .filter(Boolean) as Property[];

  const availableToAdd = mockProperties.filter((p) => !selectedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 lg:pt-36">
      <div className="container-xl space-y-6">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Marketplace</span>
            </Link>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Compare Properties
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Side-by-side legal approvals, specifications, and pricing metrics comparison.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 shadow-sm">
              <input
                type="checkbox"
                checked={highlightDifferences}
                onChange={(e) => setHighlightDifferences(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Highlight Differences</span>
            </label>
          </div>
        </div>

        {/* Comparison Board */}
        {comparedProperties.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
            <SlidersHorizontal className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="font-bold text-lg text-gray-900">No properties selected for comparison</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Select properties from our marketplace or add from below to see an instant detailed comparison.
            </p>
            <Link
              href="/properties"
              className="inline-block px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-md"
            >
              Explore Listings
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl bg-white border border-gray-200 shadow-md">
            <table className="w-full text-left border-collapse min-w-[700px]">
              {/* Table Header: Sticky property cards */}
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/70">
                  <th className="p-4 sm:p-5 w-48 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Property Specs
                  </th>
                  {comparedProperties.map((p) => (
                    <th key={p.id} className="p-4 sm:p-5 align-top min-w-[220px]">
                      <div className="space-y-3">
                        <div className="relative h-32 rounded-2xl overflow-hidden bg-slate-900">
                          <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemove(p.id)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white hover:bg-rose-600 flex items-center justify-center transition-colors"
                            title="Remove from comparison"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          <div className="font-display font-black text-lg text-emerald-800">
                            {formatPrice(p.pricing.totalPrice)}
                          </div>
                          <Link href={`/properties/${p.slug}`}>
                            <p className="font-bold text-xs text-gray-900 line-clamp-2 hover:text-emerald-700 mt-0.5">
                              {p.title}
                            </p>
                          </Link>
                          <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1 truncate">
                            <MapPin className="w-3 h-3 text-emerald-700 flex-shrink-0" />
                            {p.location.locality}, {p.location.city}
                          </p>
                        </div>
                      </div>
                    </th>
                  ))}

                  {/* Add Property Slot if < 4 */}
                  {comparedProperties.length < 4 && (
                    <th className="p-5 align-middle text-center w-52 bg-slate-50/50">
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center space-y-2">
                        <Plus className="w-6 h-6 text-gray-400" />
                        <span className="text-xs font-bold text-gray-600">Add Property</span>
                        <select
                          onChange={(e) => {
                            if (e.target.value) handleAdd(e.target.value);
                          }}
                          className="w-full text-xs p-1.5 rounded-lg border border-gray-200 outline-none bg-white text-gray-700"
                          defaultValue=""
                        >
                          <option value="" disabled>Choose property...</option>
                          {availableToAdd.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.title} ({opt.location.city})
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-gray-100 text-xs">
                {/* Category */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-gray-500 bg-gray-50/30">Category</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-4 font-semibold text-gray-800 capitalize">
                      {categoryLabels[p.category] || p.category}
                    </td>
                  ))}
                  {comparedProperties.length < 4 && <td />}
                </tr>

                {/* Total Area */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-gray-500 bg-gray-50/30">Total Area</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-4 font-bold text-gray-900 font-mono">
                      {formatArea(p.pricing.totalArea, p.pricing.areaUnit)}
                    </td>
                  ))}
                  {comparedProperties.length < 4 && <td />}
                </tr>

                {/* Price / sq.ft */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-gray-500 bg-gray-50/30">Rate / Sq.Ft</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-4 font-semibold text-gray-700 font-mono">
                      ₹{p.pricing.pricePerSqFt?.toLocaleString('en-IN') || '—'} / sq.ft
                    </td>
                  ))}
                  {comparedProperties.length < 4 && <td />}
                </tr>

                {/* Approvals */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-gray-500 bg-gray-50/30">Legal Approvals</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-4 space-y-1">
                      <div className="flex items-center gap-1.5">
                        {p.isDTCP ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-gray-300" />}
                        <span className={p.isDTCP ? 'font-semibold text-gray-900' : 'text-gray-400'}>DTCP / BDA</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {p.isRERA ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-gray-300" />}
                        <span className={p.isRERA ? 'font-semibold text-gray-900' : 'text-gray-400'}>RERA Approved</span>
                      </div>
                    </td>
                  ))}
                  {comparedProperties.length < 4 && <td />}
                </tr>

                {/* Facing */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-gray-500 bg-gray-50/30">Facing Direction</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-4 font-semibold text-gray-800 capitalize">
                      {p.pricing.facing || 'East'} Facing
                    </td>
                  ))}
                  {comparedProperties.length < 4 && <td />}
                </tr>

                {/* Road Width */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-gray-500 bg-gray-50/30">Road Width</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-4 font-semibold text-gray-800">
                      {p.roadWidth || '40ft Wide'}
                    </td>
                  ))}
                  {comparedProperties.length < 4 && <td />}
                </tr>

                {/* Key Amenities */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-gray-500 bg-gray-50/30">Top Amenities</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-4 space-y-1">
                      {p.amenities.map((a) => (
                        <div key={a.id} className="text-[11px] text-gray-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>{a.name}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                  {comparedProperties.length < 4 && <td />}
                </tr>

                {/* CTAs */}
                <tr className="bg-gray-50/50">
                  <td className="p-4 font-bold text-gray-500">Action</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-4">
                      <Link
                        href={`/properties/${p.slug}`}
                        className="block w-full py-2 px-3 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white text-center transition-colors shadow-sm"
                      >
                        View Full Details
                      </Link>
                    </td>
                  ))}
                  {comparedProperties.length < 4 && <td />}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
