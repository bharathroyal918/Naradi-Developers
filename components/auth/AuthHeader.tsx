'use client';

import React from 'react';

export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  roleBadge?: string;
  theme?: 'light' | 'dark' | 'emerald';
  dark?: boolean;
}

export function AuthHeader({
  title,
  subtitle,
  badge,
  roleBadge,
  theme = 'light',
  dark = false,
}: AuthHeaderProps) {
  const isDark = dark || theme === 'dark';
  const displayBadge = badge || roleBadge;

  return (
    <div className="mb-6 sm:mb-7 text-left">
      {displayBadge && (
        <span
          className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 ${
            isDark
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}
        >
          {displayBadge}
        </span>
      )}
      <h2
        className={`font-display text-2xl sm:text-3xl font-bold tracking-tight leading-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default AuthHeader;
