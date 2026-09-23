'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { SocialLoginButton } from '@/components/auth/SocialLoginButton';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import { FormField } from '@/components/auth/FormField';
import { AuthRoleTabs } from '@/components/auth/AuthRoleTabs';
import { buyerLoginSchema, type BuyerLoginInput } from '@/lib/validations/auth';
import { authService } from '@/services/auth';

export default function BuyerLoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BuyerLoginInput>({
    resolver: zodResolver(buyerLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const passwordValue = watch('password');

  const handleFillDemo = () => {
    setValue('email', 'ramesh.buyer@naradi.com', { shouldValidate: true });
    setValue('password', 'Password@123', { shouldValidate: true });
  };

  const onSubmit = async (data: BuyerLoginInput) => {
    try {
      setServerError(null);
      const res = await authService.loginBuyer(data);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push(res.redirectUrl || '/buyer-portal');
        }, 1200);
      } else {
        setServerError(res.message);
      }
    } catch {
      setServerError('An unexpected connection error occurred. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setServerError(null);
      const res = await authService.loginBuyer({
        email: 'ramesh.google@naradi.com',
        password: 'GoogleOAuth2User',
      });
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push(res.redirectUrl || '/buyer-portal');
        }, 800);
      }
    } catch {
      setServerError('Google authentication failed. Please try standard login.');
    }
  };

  return (
    <AuthLayout theme="emerald" role="buyer">
      <AuthCard theme="emerald">
        {/* Role Tabs for switching between Buyer, Seller, NRI */}
        <AuthRoleTabs activeRole="buyer" mode="login" />

        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Verified Buyer Access
          </span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100/80 px-2 py-0.5 rounded-lg border border-amber-300 transition-colors"
          >
            ⚡ Demo Credentials
          </button>
        </div>

        <AuthHeader
          title="Welcome Back, Buyer"
          subtitle="Login to access your wishlist, enquiries, site visits and saved properties."
        />

        <ErrorAlert message={serverError} onDismiss={() => setServerError(null)} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Email Field */}
          <FormField
            id="email"
            label="Email Address"
            required
            error={errors.email?.message}
          >
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
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

          {/* Password Field */}
          <FormField
            id="password"
            label="Password"
            required
            error={errors.password?.message}
          >
            <PasswordInput
              id="password"
              placeholder="Enter your secret password"
              value={passwordValue}
              onChange={(val) => setValue('password', val, { shouldValidate: true })}
              error={errors.password?.message}
              disabled={isSubmitting || isSuccess}
              autoComplete="current-password"
            />
          </FormField>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-colors"
                disabled={isSubmitting || isSuccess}
              />
              <span className="text-xs text-slate-600 font-medium">Remember me</span>
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
              : 'bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] shadow-emerald-900/15'
              } disabled:opacity-75 disabled:pointer-events-none`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating Buyer...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>Success! Redirecting...</span>
              </>
            ) : (
              <>
                <span>Login to Buyer Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-slate-400 font-medium">Or continue with</span>
          </div>
        </div>

        <SocialLoginButton
          onClick={handleGoogleLogin}
          disabled={isSubmitting || isSuccess}
        />

        <AuthFooter
          linkText="Don't have a buyer account?"
          linkHref="/buyer/register"
          linkTitle="Create Buyer Account"
          roleNotice="Are you a property seller? "
          roleNoticeHref="/seller/login"
          roleNoticeTitle="Seller Login"
        />
      </AuthCard>
    </AuthLayout>
  );
}
