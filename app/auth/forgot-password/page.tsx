'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowRight, ArrowLeft, Loader2, KeyRound } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { FormField } from '@/components/auth/FormField';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import { SuccessScreen } from '@/components/auth/SuccessScreen';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth';
import { authService } from '@/services/auth';

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      setServerError(null);
      const res = await authService.forgotPassword(data.email);
      if (res.success) {
        setSubmittedEmail(data.email);
      } else {
        setServerError(res.message);
      }
    } catch {
      setServerError('Failed to transmit OTP request. Please check connection.');
    }
  };

  return (
    <AuthLayout theme="emerald" role="auth">
      <AuthCard theme="emerald">
        {submittedEmail ? (
          <SuccessScreen
            badge="OTP Dispatched"
            title="OTP Sent Successfully"
            message={`A 6-digit verification code has been dispatched to ${submittedEmail}. Please enter the code to verify your ownership.`}
            buttonText="Verify OTP"
            buttonHref={`/auth/verify-otp?email=${encodeURIComponent(submittedEmail)}`}
            secondaryButtonText="Did not receive code? Try again"
            onSecondaryClick={() => setSubmittedEmail(null)}
          />
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-4 mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>

            <AuthHeader
              badge="Security Recovery"
              title="Forgot Password?"
              subtitle="Enter your registered email address and we'll send a 6-digit security OTP to reset your password."
            />

            <ErrorAlert message={serverError} onDismiss={() => setServerError(null)} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <FormField id="email" label="Registered Email Address" required error={errors.email?.message}>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...register('email')}
                    className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none bg-slate-50/50 focus:bg-white ${
                      errors.email
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                        : 'border-slate-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10'
                    }`}
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                </div>
              </FormField>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] shadow-lg shadow-emerald-900/15 flex items-center justify-center gap-2 transition-all disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send Security OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <Link
                href="/buyer/login"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </>
        )}
      </AuthCard>
    </AuthLayout>
  );
}
