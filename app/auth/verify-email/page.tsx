'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import { authService } from '@/services/auth';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your registered email';
  const role = searchParams.get('role') || 'buyer';

  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleResend = async () => {
    try {
      setErrorMessage(null);
      setResending(true);
      const res = await authService.verifyEmail(email);
      setResending(false);
      if (res.success) {
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 5000);
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setResending(false);
      setErrorMessage('Failed to trigger verification email. Please try again.');
    }
  };

  const handleOpenEmailApp = () => {
    window.location.href = 'mailto:';
  };

  const dashboardHref =
    role === 'seller' ? '/seller-portal' : role === 'nri' ? '/nri/login' : '/buyer/login';

  return (
    <AuthLayout theme="emerald" role="auth">
      <AuthCard theme="emerald">
        {/* Email Mailbox Illustration */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-700/10 border border-emerald-200"
          >
            <Mail className="w-10 h-10" />
          </motion.div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </span>
        </div>

        <AuthHeader
          badge="Email Verification Required"
          title="Verify Your Email Address"
          subtitle={`We've dispatched an activation link to ${email}. Click the link inside the email to complete verification.`}
        />

        <ErrorAlert message={errorMessage} onDismiss={() => setErrorMessage(null)} />

        {resendSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Verification email has been re-sent successfully!</span>
          </motion.div>
        )}

        <div className="space-y-3 pt-2">
          {/* Open Email App Button */}
          <button
            type="button"
            onClick={handleOpenEmailApp}
            className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] shadow-lg shadow-emerald-900/15 flex items-center justify-center gap-2 transition-all"
          >
            <span>Open Email App</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* Resend Email Button */}
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-slate-700 hover:bg-slate-100 border border-slate-200 active:scale-[0.99] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin text-emerald-700' : ''}`} />
            <span>{resending ? 'Dispatching...' : 'Resend Verification Email'}</span>
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Already verified?</span>
          <Link
            href={dashboardHref}
            className="font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 hover:underline"
          >
            <span>Continue to Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
