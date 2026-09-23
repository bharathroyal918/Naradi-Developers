'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Globe2, ArrowRight, Loader2, CheckCircle2, Shield } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import { FormField } from '@/components/auth/FormField';
import { AuthRoleTabs } from '@/components/auth/AuthRoleTabs';
import { nriLoginSchema, type NRILoginInput } from '@/lib/validations/auth';
import { authService } from '@/services/auth';

export default function NRILoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NRILoginInput>({
    resolver: zodResolver(nriLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const passwordValue = watch('password');

  const handleFillDemo = () => {
    setValue('email', 'priya.nri@naradi.com', { shouldValidate: true });
    setValue('password', 'Password@123', { shouldValidate: true });
  };

  const onSubmit = async (data: NRILoginInput) => {
    try {
      setServerError(null);
      const res = await authService.loginNRI(data);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push(res.redirectUrl || '/nri-services');
        }, 1200);
      } else {
        setServerError(res.message);
      }
    } catch {
      setServerError('Connection error. Please try again.');
    }
  };

  return (
    <AuthLayout theme="dark" role="nri">
      <AuthCard theme="dark">
        {/* Role Tabs for switching between Buyer, Seller, NRI */}
        <AuthRoleTabs activeRole="nri" mode="login" dark />

        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            Global Indian Services
          </span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-400/30 transition-colors"
          >
            ⚡ Demo NRI
          </button>
        </div>

        <AuthHeader
          title="NRI Property Services Login"
          subtitle="Manage investments, virtual tours, legal assistance and property management from anywhere in the world."
          dark
        />

        <ErrorAlert message={serverError} onDismiss={() => setServerError(null)} dark />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Email */}
          <FormField
            id="nri-email"
            label="Email Address"
            required
            error={errors.email?.message}
            dark
          >
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                id="nri-email"
                type="email"
                placeholder="investor@global.com"
                {...register('email')}
                className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none bg-slate-900/80 text-white placeholder-slate-500 ${
                  errors.email
                    ? 'border-rose-500/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                    : 'border-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20'
                }`}
                disabled={isSubmitting || isSuccess}
                autoComplete="email"
              />
            </div>
          </FormField>

          {/* Password */}
          <FormField
            id="nri-password"
            label="Password"
            required
            error={errors.password?.message}
            dark
          >
            <PasswordInput
              id="nri-password"
              placeholder="Enter your NRI account password"
              value={passwordValue}
              onChange={(val) => setValue('password', val, { shouldValidate: true })}
              error={errors.password?.message}
              disabled={isSubmitting || isSuccess}
              dark
              autoComplete="current-password"
            />
          </FormField>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 transition-colors"
                disabled={isSubmitting || isSuccess}
              />
              <span className="text-xs text-slate-300 font-medium">Keep me signed in</span>
            </label>

            <Link
              href="/auth/forgot-password"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm text-slate-950 flex items-center justify-center gap-2 shadow-lg transition-all ${
              isSuccess
                ? 'bg-emerald-400 shadow-emerald-500/25'
                : 'bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] shadow-emerald-500/20'
            } disabled:opacity-75 disabled:pointer-events-none`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Connecting to NRI Portal...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Portal Unlocked! Redirecting...</span>
              </>
            ) : (
              <>
                <span>Access NRI Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <AuthFooter
          linkText="New NRI investor?"
          linkHref="/nri/register"
          linkTitle="Create NRI Account"
          roleNotice="Resident buyer in India? "
          roleNoticeHref="/buyer/login"
          roleNoticeTitle="Buyer Login"
          dark
        />
      </AuthCard>
    </AuthLayout>
  );
}
