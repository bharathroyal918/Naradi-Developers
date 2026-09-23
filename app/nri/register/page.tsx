'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Globe2,
  Phone,
  Mail,
  Compass,
  Briefcase,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { FormField } from '@/components/auth/FormField';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import { SuccessScreen } from '@/components/auth/SuccessScreen';
import { AuthRoleTabs } from '@/components/auth/AuthRoleTabs';
import { nriRegisterSchema, type NRIRegisterInput } from '@/lib/validations/auth';
import { authService } from '@/services/auth';

const COUNTRIES = [
  'United States',
  'United Arab Emirates',
  'United Kingdom',
  'Canada',
  'Singapore',
  'Australia',
  'Germany',
  'Saudi Arabia',
  'Qatar',
  'Other',
];

const STATES = [
  'Karnataka',
  'Telangana',
  'Andhra Pradesh',
  'Tamil Nadu',
  'Maharashtra',
  'Kerala',
  'Delhi NCR',
  'Goa',
];

const PURPOSES = [
  'Buy Property',
  'Sell Property',
  'Property Management',
  'Legal Assistance',
  'Virtual Tour',
] as const;

export default function NRIRegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NRIRegisterInput>({
    resolver: zodResolver(nriRegisterSchema),
    defaultValues: {
      fullName: '',
      countryOfResidence: 'United States',
      mobileNumber: '',
      email: '',
      password: '',
      preferredInvestmentState: 'Karnataka',
      purpose: 'Buy Property',
      receiveWhatsAppUpdates: true,
      agreeTerms: false,
    },
  });

  const passwordValue = watch('password');

  const handleFillSample = () => {
    setValue('fullName', 'Priya Subramaniam', { shouldValidate: true });
    setValue('countryOfResidence', 'Singapore', { shouldValidate: true });
    setValue('mobileNumber', '91234567', { shouldValidate: true });
    setValue('email', `priya.nri${Math.floor(Math.random() * 900 + 100)}@example.com`, { shouldValidate: true });
    setValue('password', 'Password@123', { shouldValidate: true });
    setValue('preferredInvestmentState', 'Karnataka', { shouldValidate: true });
    setValue('purpose', 'Buy Property', { shouldValidate: true });
    setValue('receiveWhatsAppUpdates', true, { shouldValidate: true });
    setValue('agreeTerms', true, { shouldValidate: true });
  };

  const onSubmit = async (data: NRIRegisterInput) => {
    try {
      setServerError(null);
      const res = await authService.registerNRI(data);
      if (res.success) {
        setRegisteredEmail(data.email);
      } else {
        setServerError(res.message);
      }
    } catch {
      setServerError('Registration failed. Please check your credentials and try again.');
    }
  };

  return (
    <AuthLayout theme="dark" role="nri">
      <AuthCard theme="dark">
        {registeredEmail ? (
          <SuccessScreen
            badge="NRI Account Created"
            title="Welcome to Naradi Global"
            message={`Your NRI investment profile for ${registeredEmail} has been established. Our Dedicated NRI Desk and Relationship Manager will contact you via WhatsApp for your customized portfolio.`}
            buttonText="Verify Email & Continue"
            buttonHref={`/auth/verify-email?email=${encodeURIComponent(registeredEmail)}&role=nri`}
            secondaryButtonText="Or proceed to NRI Login"
            secondaryButtonHref="/nri/login"
            dark
          />
        ) : (
          <>
            {/* Role Tabs for switching between Buyer, Seller, NRI */}
            <AuthRoleTabs activeRole="nri" mode="register" dark />

            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                NRI Desk & Legal Concierge
              </span>
              <button
                type="button"
                onClick={handleFillSample}
                className="text-[11px] font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-400/30 transition-colors"
              >
                ⚡ Fill Sample
              </button>
            </div>

            <AuthHeader
              title="Create NRI Account"
              subtitle="End-to-end legal clearance, POA assistance, virtual walkthroughs and asset management."
              dark
            />

            <ErrorAlert message={serverError} onDismiss={() => setServerError(null)} dark />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
              {/* Full Name */}
              <FormField id="nri-fullname" label="Full Name" required error={errors.fullName?.message} dark>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <input
                    id="nri-fullname"
                    type="text"
                    placeholder="e.g. Vikramaditya Rao"
                    {...register('fullName')}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                    disabled={isSubmitting}
                  />
                </div>
              </FormField>

              {/* Country & International Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="countryOfResidence" label="Country of Residence" required error={errors.countryOfResidence?.message} dark>
                  <div className="relative">
                    <Globe2 className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <select
                      id="countryOfResidence"
                      {...register('countryOfResidence')}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-white text-sm transition-all outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c} className="bg-slate-900 text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormField>

                <FormField id="mobileNumber" label="International Mobile" required error={errors.mobileNumber?.message} dark>
                  <div className="relative">
                    <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <input
                      id="mobileNumber"
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      {...register('mobileNumber')}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                      disabled={isSubmitting}
                    />
                  </div>
                </FormField>
              </div>

              {/* Email */}
              <FormField id="nri-email" label="Email Address" required error={errors.email?.message} dark>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <input
                    id="nri-email"
                    type="email"
                    placeholder="name@company.com"
                    {...register('email')}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                    disabled={isSubmitting}
                  />
                </div>
              </FormField>

              {/* Preferred State & Purpose */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="preferredInvestmentState" label="Preferred State" required error={errors.preferredInvestmentState?.message} dark>
                  <div className="relative">
                    <Compass className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <select
                      id="preferredInvestmentState"
                      {...register('preferredInvestmentState')}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-white text-sm transition-all outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {STATES.map((s) => (
                        <option key={s} value={s} className="bg-slate-900 text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormField>

                <FormField id="purpose" label="Primary Purpose" required error={errors.purpose?.message} dark>
                  <div className="relative">
                    <Briefcase className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <select
                      id="purpose"
                      {...register('purpose')}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-white text-sm transition-all outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {PURPOSES.map((p) => (
                        <option key={p} value={p} className="bg-slate-900 text-white">
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormField>
              </div>

              {/* Password */}
              <FormField id="password" label="Create Password" required error={errors.password?.message} dark>
                <PasswordInput
                  id="password"
                  placeholder="Minimum 8 characters"
                  value={passwordValue}
                  onChange={(val) => setValue('password', val, { shouldValidate: true })}
                  showStrength
                  showChecklist
                  error={errors.password?.message}
                  disabled={isSubmitting}
                  dark
                />
              </FormField>

              {/* Checkboxes */}
              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register('receiveWhatsAppUpdates')}
                    className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    disabled={isSubmitting}
                  />
                  <span className="text-xs text-slate-300 leading-tight">
                    Receive virtual tour invitations, ROI reports & WhatsApp updates on my registered number.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register('agreeTerms')}
                    className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    disabled={isSubmitting}
                  />
                  <span className="text-xs text-slate-300 leading-tight">
                    I agree to Naradi NRI Desk{' '}
                    <Link href="/terms" className="text-emerald-400 font-semibold hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-emerald-400 font-semibold hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-xs text-rose-400 font-medium pl-6">
                    {errors.agreeTerms.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-slate-950 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-75 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Creating NRI Portfolio...</span>
                  </>
                ) : (
                  <>
                    <span>Create NRI Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <AuthFooter
              linkText="Already have an NRI account?"
              linkHref="/nri/login"
              linkTitle="NRI Login"
              roleNotice="Resident in India? "
              roleNoticeHref="/buyer/register"
              roleNoticeTitle="Buyer Registration"
              dark
            />
          </>
        )}
      </AuthCard>
    </AuthLayout>
  );
}
