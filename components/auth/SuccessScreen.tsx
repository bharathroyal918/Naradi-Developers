'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface SuccessScreenProps {
  title: string;
  message: string;
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  onSecondaryClick?: () => void;
  badge?: string;
  dark?: boolean;
}

export function SuccessScreen({
  title,
  message,
  buttonText,
  buttonHref,
  onButtonClick,
  secondaryButtonText,
  secondaryButtonHref,
  onSecondaryClick,
  badge = 'Success',
  dark = false,
}: SuccessScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-6 px-2"
    >
      {/* Animated Checkmark Circle */}
      <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
            dark
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-emerald-500/10'
              : 'bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-emerald-600/10'
          }`}
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
        </span>
      </div>

      {badge && (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
            dark
              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}
        >
          {badge}
        </span>
      )}

      <h3
        className={`text-2xl font-bold tracking-tight mb-2 ${
          dark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm max-w-sm mx-auto mb-8 leading-relaxed ${
          dark ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        {message}
      </p>

      <div className="space-y-3">
        {buttonHref ? (
          <Link
            href={buttonHref}
            className={`w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium shadow-md transition-all ${
              dark
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-900/15'
            }`}
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onButtonClick}
            className={`w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium shadow-md transition-all ${
              dark
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-900/15'
            }`}
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {secondaryButtonText && (
          <div>
            {secondaryButtonHref ? (
              <Link
                href={secondaryButtonHref}
                className={`text-sm font-medium transition-colors ${
                  dark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {secondaryButtonText}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onSecondaryClick}
                className={`text-sm font-medium transition-colors ${
                  dark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
