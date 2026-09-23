'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id?: number;
  number?: number;
  title: string;
  description?: string;
}

interface ProgressStepperProps {
  steps: StepItem[];
  currentStep: number;
  theme?: 'light' | 'dark' | 'emerald';
}

export function ProgressStepper({
  steps,
  currentStep,
  theme = 'light',
}: ProgressStepperProps) {
  const isDark = theme === 'dark';

  return (
    <div className="mb-6">
      {/* Step Numbers & Connector Line */}
      <div className="relative flex items-center justify-between">
        {/* Connector Line Background */}
        <div className={`absolute top-1/2 -translate-y-1/2 left-4 right-4 h-0.5 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} -z-0`} />

        {/* Active Line Fill */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-4 h-0.5 ${isDark ? 'bg-amber-400' : 'bg-emerald-700'} transition-all duration-500 -z-0`}
          style={{
            width: `${Math.max(0, Math.min(100, ((currentStep - 1) / Math.max(1, steps.length - 1)) * 100))}%`,
          }}
        />

        {steps.map((s, idx) => {
          const stepNum = s.number ?? s.id ?? idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={stepNum} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : isActive
                    ? 'bg-amber-400 text-emerald-950 ring-4 ring-amber-400/20 shadow-md font-extrabold'
                    : isDark
                    ? 'bg-gray-800 text-gray-400 border border-gray-700'
                    : 'bg-white text-gray-400 border-2 border-gray-200'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
              </div>
              <span
                className={`text-[10px] font-semibold mt-1.5 hidden sm:block ${
                  isActive
                    ? isDark
                      ? 'text-amber-300 font-bold'
                      : 'text-emerald-900 font-bold'
                    : isDark
                    ? 'text-gray-500'
                    : 'text-gray-400'
                }`}
              >
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Step Title */}
      <div className="text-center mt-3 sm:hidden">
        <span className={`text-xs font-bold ${isDark ? 'text-amber-300' : 'text-emerald-900'}`}>
          Step {currentStep} of {steps.length}:{' '}
          {steps.find((s, idx) => (s.number ?? s.id ?? idx + 1) === currentStep)?.title}
        </span>
      </div>
    </div>
  );
}

export default ProgressStepper;
