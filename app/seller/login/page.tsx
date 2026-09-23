'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowRight, Loader2, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import { FormField } from '@/components/auth/FormField';
import { AuthRoleTabs } from '@/components/auth/AuthRoleTabs';
import { sellerLoginSchema, type SellerLoginInput } from '@/lib/validations/auth';
import { authService } from '@/services/auth';

export default function SellerLoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SellerLoginInput>({
    resolver: zodResolver(sellerLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const passwordValue = watch('password');

  const handleFillDemo = () => {
    setValue('email', 'narendra.seller@naradi.com', { shouldValidate: true });
    setValue('password', 'Password@123', { shouldValidate: true });
  };

  const onSubmit = async (data: SellerLoginInput) => {
    try {
      setServerError(null);
      const res = await authService.loginSeller(data);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push(res.redirectUrl || '/seller-portal');
        }, 1200);
      } else {
        setServerError(res.message);
      }
    } catch {
      setServerError('An unexpected connection error occurred. Please try again.');
    }
  };

  return (
    <AuthLayout theme="emerald" role="seller">
      <AuthCard theme="emerald">
        {/* Role Tabs for switching between Buyer, Seller, NRI */}
        <AuthRoleTabs activeRole="seller" mode="login" />

        {/* Emerald + Gold accent header badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Seller & Developer Portal
          </span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100/80 px-2 py-0.5 rounded-lg border border-amber-300 transition-colors"
          >
            ⚡ Demo Seller
          </button>
        </div>

        <AuthHeader
          title="Seller Login"
          subtitle="Access your property listings, leads and verification status."
        />

        <ErrorAlert message={serverError} onDismiss={() => setServerError(null)} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Email */}
          <FormField
            id="seller-email"
            label="Registered Seller Email"
            required
            error={errors.email?.message}
          >
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="seller-email"
                type="email"
                placeholder="seller@example.com"
                {...register('email')}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white text-slate-900 ${errors.email
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                    : 'border-slate-300 hover:border-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10'
                  }`}
                disabled={isSubmitting || isSuccess}
                autoComplete="email"
              />
            </div>
          </FormField>

          {/* Password */}
          <FormField
            id="seller-password"
            label="Password"
            required
            error={errors.password?.message}
          >
            <PasswordInput
              id="seller-password"
              placeholder="Enter your seller account password"
              value={passwordValue}
              onChange={(val) => setValue('password', val, { shouldValidate: true })}
              error={errors.password?.message}
              disabled={isSubmitting || isSuccess}
              autoComplete="current-password"
            />
          </FormField>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-colors"
                disabled={isSubmitting || isSuccess}
              />
              <span className="text-xs text-slate-600 font-medium">Keep me signed in</span>
            </label>

            <Link
              href="/auth/forgot-password"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all ${isSuccess
                ? 'bg-emerald-600 shadow-emerald-600/25'
                : 'bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] shadow-emerald-950/20 border-t border-amber-300/30'
              } disabled:opacity-75 disabled:pointer-events-none`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                <span>Verifying Seller Account...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>Access Granted! Redirecting...</span>
              </>
            ) : (
              <>
                <span>Login to Seller Dashboard</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </>
            )}
          </button>
        </form>

        <AuthFooter
          linkText="New property owner or developer?"
          linkHref="/seller/register"
          linkTitle="Register as Seller"
          roleNotice="Looking to buy or invest? "
          roleNoticeHref="/buyer/login"
          roleNoticeTitle="Buyer Login"
        />
      </AuthCard>
    </AuthLayout>
  );

}
