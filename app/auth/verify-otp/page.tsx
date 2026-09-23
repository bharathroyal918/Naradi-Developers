'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { OTPInput } from '@/components/auth/OTPInput';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import { authService } from '@/services/auth';

function OTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your registered contact';

  const [otp, setOtp] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (otp.length !== 6) {
      setServerError('Please enter all 6 digits of the OTP code.');
      return;
    }

    try {
      setServerError(null);
      setIsSubmitting(true);
      const res = await authService.verifyOTP(email, otp);
      setIsSubmitting(false);

      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push(`/auth/reset-password?email=${encodeURIComponent(email)}&verified=true`);
        }, 1200);
      } else {
        setServerError(res.message);
      }
    } catch {
      setIsSubmitting(false);
      setServerError('Verification failed due to connection error.');
    }
  };

  const handleResend = async () => {
    try {
      setServerError(null);
      const res = await authService.forgotPassword(email);
      if (res.success) {
        setResendStatus('A new 6-digit OTP has been dispatched.');
        setTimeout(() => setResendStatus(null), 4000);
      } else {
        setServerError(res.message);
      }
    } catch {
      setServerError('Unable to resend OTP. Please try again.');
    }
  };

  return (
    <AuthLayout theme="emerald" role="auth">
      <AuthCard theme="emerald">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-4 mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <AuthHeader
          badge="Two-Factor Authentication"
          title="Verify OTP Code"
          subtitle={`Enter the 6-digit code sent to ${email}.`}
        />

        <ErrorAlert message={serverError} onDismiss={() => setServerError(null)} />

        {resendStatus && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium text-center">
            {resendStatus}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <OTPInput
            length={6}
            value={otp}
            onChange={(val) => {
              setOtp(val);
              if (serverError) setServerError(null);
            }}
            disabled={isSubmitting || isSuccess}
            onResend={handleResend}
          />

          <button
            type="submit"
            disabled={isSubmitting || isSuccess || otp.length !== 6}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all ${
              isSuccess
                ? 'bg-emerald-600 shadow-emerald-600/25'
                : 'bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] shadow-emerald-900/15'
            } disabled:opacity-50 disabled:pointer-events-none`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Security Code...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>Code Verified! Redirecting...</span>
              </>
            ) : (
              <>
                <span>Verify OTP & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <Link
            href="/auth/forgot-password"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Email Address</span>
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default function OTPVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      }
    >
      <OTPContent />
    </Suspense>
  );
}
