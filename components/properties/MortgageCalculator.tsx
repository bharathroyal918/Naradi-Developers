'use client';

import React, { useState } from 'react';
import { Calculator, IndianRupee, Percent, Clock, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export function MortgageCalculator({ initialPrice = 7500000 }: MortgageCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const downPayment = Math.round((propertyPrice * downPaymentPercent) / 100);
  const principal = Math.max(0, propertyPrice - downPayment);

  // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const monthlyRate = interestRate / 12 / 100;
  const numberOfMonths = tenureYears * 12;

  const emi =
    monthlyRate > 0 && numberOfMonths > 0
      ? Math.round(
          (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
            (Math.pow(1 + monthlyRate, numberOfMonths) - 1)
        )
      : 0;

  const totalPayment = emi * numberOfMonths;
  const totalInterest = Math.max(0, totalPayment - principal);

  return (
    <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-gray-900 text-lg">Mortgage & EMI Estimator</h3>
            <p className="text-xs text-gray-500">Calculate bank loan eligibility & monthly repayments</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          SBI / HDFC / ICICI Ready
        </span>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sliders Column */}
        <div className="space-y-5">
          {/* Property Price */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-gray-700">
              <span>Property Value</span>
              <span className="text-emerald-800 font-mono text-sm font-black">{formatPrice(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={1000000}
              max={50000000}
              step={250000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>₹10 Lakhs</span>
              <span>₹5 Crores</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-gray-700">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="text-emerald-800 font-mono text-sm font-bold">{formatPrice(downPayment)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>10% (Minimum)</span>
              <span>50%</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-gray-700">
              <span>Annual Interest Rate</span>
              <span className="text-emerald-800 font-mono text-sm font-bold">{interestRate}% p.a.</span>
            </div>
            <input
              type="range"
              min={6.5}
              max={12}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>6.5%</span>
              <span>12.0%</span>
            </div>
          </div>

          {/* Tenure Years */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-gray-700">
              <span>Loan Tenure</span>
              <span className="text-emerald-800 font-mono text-sm font-bold">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>5 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022019] text-white flex flex-col justify-between shadow-lg">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Estimated Monthly Outflow</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-display text-3xl sm:text-4xl font-black text-amber-300">
                ₹{emi.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-emerald-200/70 font-semibold">/ month</span>
            </div>

            {/* Split Visual Bar */}
            <div className="mt-5 space-y-2">
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${Math.round((principal / totalPayment) * 100)}%` }}
                  className="bg-amber-400 h-full transition-all duration-300"
                  title="Principal Amount"
                />
                <div
                  style={{ width: `${Math.round((totalInterest / totalPayment) * 100)}%` }}
                  className="bg-emerald-400 h-full transition-all duration-300"
                  title="Total Interest"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-emerald-100">Principal: {formatPrice(principal)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-emerald-100">Interest: {formatPrice(totalInterest)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
            <div className="flex justify-between text-xs text-emerald-200/80">
              <span>Total Payable (P + I):</span>
              <span className="font-bold text-white">{formatPrice(totalPayment)}</span>
            </div>
            <div className="flex justify-between text-xs text-emerald-200/80">
              <span>Pre-Approved Banking Partners:</span>
              <span className="font-semibold text-amber-300">SBI, HDFC, Canara, ICICI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MortgageCalculator;
