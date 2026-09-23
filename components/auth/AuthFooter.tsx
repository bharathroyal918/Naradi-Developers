'use client';

import React from 'react';
import Link from 'next/link';

export interface AuthFooterProps {
  promptText?: string;
  linkText?: string;
  linkHref?: string;
  linkTitle?: string;
  forgotPasswordHref?: string;
  roleNotice?: string;
  roleNoticeHref?: string;
  roleNoticeTitle?: string;
  theme?: 'light' | 'dark' | 'emerald';
  dark?: boolean;
}

export function AuthFooter({
  promptText,
  linkText,
  linkHref,
  linkTitle,
  forgotPasswordHref,
  roleNotice,
  roleNoticeHref,
  roleNoticeTitle,
  theme = 'light',
  dark = false,
}: AuthFooterProps) {
  const isDark = dark || theme === 'dark';

  const prompt = promptText || (linkTitle ? linkText : '');
  const linkLabel = linkTitle || linkText || 'Click here';
  const targetHref = linkHref || '#';

  return (
    <div
      className={`mt-6 pt-5 border-t text-center space-y-2.5 ${
        isDark ? 'border-slate-800' : 'border-slate-100'
      }`}
    >
      {forgotPasswordHref && (
        <div className="text-center">
          <Link
            href={forgotPasswordHref}
            className={`text-xs font-semibold hover:underline ${
              isDark ? 'text-emerald-400' : 'text-emerald-700'
            }`}
          >
            Forgot your password?
          </Link>
        </div>
      )}

      {linkHref && (
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {prompt}{' '}
          <Link
            href={targetHref}
            className={`font-bold hover:underline ${
              isDark ? 'text-emerald-400' : 'text-emerald-800'
            }`}
          >
            {linkLabel}
          </Link>
        </p>
      )}

      {roleNotice && roleNoticeHref && roleNoticeTitle && (
        <p className={`text-[11px] pt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
          {roleNotice}
          <Link
            href={roleNoticeHref}
            className={`font-semibold hover:underline ${
              isDark ? 'text-emerald-400' : 'text-emerald-700'
            }`}
          >
            {roleNoticeTitle}
          </Link>
        </p>
      )}
    </div>
  );
}

export default AuthFooter;
