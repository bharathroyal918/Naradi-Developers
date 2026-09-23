'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone, MapPin, Building, ArrowRight, Loader2, ChevronDown } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { FormField } from '@/components/auth/FormField';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import { SuccessScreen } from '@/components/auth/SuccessScreen';
import { AuthRoleTabs } from '@/components/auth/AuthRoleTabs';
import { buyerRegisterSchema, type BuyerRegisterInput } from '@/lib/validations/auth';
import { authService } from '@/services/auth';

const PROPERTY_TYPES = [
  'Residential Plot',
  'Commercial Plot',
  'Agricultural Land',
  'Farm House',
  'Apartment',
  'Villa',
  'Warehouse',
  'Industrial Building',
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

export default function BuyerRegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BuyerRegisterInput>({
    resolver: zodResolver(buyerRegisterSchema),
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      state: 'Karnataka',
      city: 'Bengaluru',
      propertyType: 'Residential Plot',
      agreeTerms: false,
      subscribeAlerts: true,
    },
  });

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const handleFillSample = () => {
    setValue('fullName', 'Rahul Sharma', { shouldValidate: true });
    setValue('mobileNumber', '9876543210', { shouldValidate: true });
    setValue('email', `rahul.buyer${Math.floor(Math.random() * 900 + 100)}@example.com`, { shouldValidate: true });
    setValue('password', 'Password@123', { shouldValidate: true });
    setValue('confirmPassword', 'Password@123', { shouldValidate: true });
    setValue('state', 'Karnataka', { shouldValidate: true });
    setValue('city', 'Bengaluru', { shouldValidate: true });
    setValue('propertyType', 'Residential Plot', { shouldValidate: true });
    setValue('agreeTerms', true, { shouldValidate: true });
    setValue('subscribeAlerts', true, { shouldValidate: true });
  };

  const onSubmit = async (data: BuyerRegisterInput) => {
    try {
      setServerError(null);
      const res = await authService.registerBuyer(data);
      if (res.success) {
        setRegisteredEmail(data.email);
      } else {
        setServerError(res.message);
      }
    } catch {
      setServerError('Registration failed due to connection error. Please try again.');
    }
  };

  return (
    <AuthLayout theme="emerald" role="buyer">
      <AuthCard theme="emerald">
        {registeredEmail ? (
          <SuccessScreen
            badge="Registration Successful"
            title="Account Created Successfully"
            message={`We've created your buyer profile for ${registeredEmail}. Please verify your email address to unlock verified property documents and schedule site visits.`}
            buttonText="Verify Email"
            buttonHref={`/auth/verify-email?email=${encodeURIComponent(registeredEmail)}&role=buyer`}
            secondaryButtonText="Or proceed to Buyer Portal"
            secondaryButtonHref="/buyer-portal"
          />
        ) : (
          <>
            {/* Role Tabs for switching between Buyer, Seller, NRI */}
            <AuthRoleTabs activeRole="buyer" mode="register" />

            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Zero Brokerage Marketplace
              </span>
              <button
                type="button"
                onClick={handleFillSample}
                className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100/80 px-2 py-0.5 rounded-lg border border-amber-300 transition-colors"
              >
                ⚡ Fill Sample Details
              </button>
            </div>

            <AuthHeader
              title="Create Your Buyer Account"
              subtitle="Get exclusive access to direct-from-owner land deals, verified legal paperwork, and priority site visits."
            />

            <ErrorAlert message={serverError} onDismiss={() => setServerError(null)} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
              {/* Full Name */}
              <FormField id="fullName" label="Full Name" required error={errors.fullName?.message}>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    {...register('fullName')}
                    className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none bg-white text-slate-900 placeholder:text-slate-400 ${
                      errors.fullName
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                        : 'border-slate-200 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10'
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
              </FormField>

              {/* Mobile & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="mobileNumber" label="Mobile Number" required error={errors.mobileNumber?.message}>
                  <div className="relative">
                    <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      id="mobileNumber"
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      {...register('mobileNumber')}
                      className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none bg-white text-slate-900 placeholder:text-slate-400 ${
                        errors.mobileNumber
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                          : 'border-slate-200 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10'
                      }`}
                      disabled={isSubmitting}
                    />
                  </div>
                </FormField>

                <FormField id="email" label="Email Address" required error={errors.email?.message}>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      {...register('email')}
                      className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none bg-white text-slate-900 placeholder:text-slate-400 ${
                        errors.email
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                          : 'border-slate-200 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10'
                      }`}
                      disabled={isSubmitting}
                    />
                  </div>
                </FormField>
              </div>

              {/* State & City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="state" label="State" required error={errors.state?.message}>
                  <div className="relative">
                    <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <select
                      id="state"
                      {...register('state')}
                      className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm transition-all outline-none bg-white text-slate-900 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 appearance-none cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </FormField>

                <FormField id="city" label="City" required error={errors.city?.message}>
                  <input
                    id="city"
                    type="text"
                    placeholder="e.g. Bengaluru"
                    {...register('city')}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all outline-none bg-white text-slate-900 placeholder:text-slate-400 ${
                      errors.city
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                        : 'border-slate-200 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10'
                    }`}
                    disabled={isSubmitting}
                  />
                </FormField>
              </div>

              {/* Interested Property Type */}
              <FormField
                id="propertyType"
                label="Interested Property Type"
                required
                error={errors.propertyType?.message}
              >
                <div className="relative">
                  <Building className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    id="propertyType"
                    {...register('propertyType')}
                    className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm transition-all outline-none bg-white text-slate-900 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 appearance-none cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {PROPERTY_TYPES.map((pt) => (
                      <option key={pt} value={pt}>
                        {pt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </FormField>

              {/* Password */}
              <FormField
                id="password"
                label="Create Password"
                required
                error={errors.password?.message}
              >
                <PasswordInput
                  id="password"
                  placeholder="At least 8 characters"
                  value={passwordValue}
                  onChange={(val) => setValue('password', val, { shouldValidate: true })}
                  showStrength
                  showChecklist
                  error={errors.password?.message}
                  disabled={isSubmitting}
                />
              </FormField>

              {/* Confirm Password */}
              <FormField
                id="confirmPassword"
                label="Confirm Password"
                required
                error={errors.confirmPassword?.message}
              >
                <PasswordInput
                  id="confirmPassword"
                  placeholder="Re-enter password"
                  value={confirmPasswordValue}
                  onChange={(val) => setValue('confirmPassword', val, { shouldValidate: true })}
                  error={errors.confirmPassword?.message}
                  disabled={isSubmitting}
                />
              </FormField>

              {/* Checkboxes */}
              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register('agreeTerms')}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    disabled={isSubmitting}
                  />
                  <span className="text-xs text-slate-600 leading-tight">
                    I agree to the{' '}
                    <Link href="/terms" className="text-emerald-700 font-semibold hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-emerald-700 font-semibold hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-xs text-rose-500 font-medium pl-6">
                    {errors.agreeTerms.message}
                  </p>
                )}

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register('subscribeAlerts')}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    disabled={isSubmitting}
                  />
                  <span className="text-xs text-slate-600 leading-tight">
                    Subscribe to newly verified property alerts and price drops via WhatsApp & email.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] shadow-lg shadow-emerald-900/15 flex items-center justify-center gap-2 transition-all disabled:opacity-75 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Buyer Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Buyer Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <AuthFooter
              linkText="Already have an account?"
              linkHref="/buyer/login"
              linkTitle="Login as Buyer"
              roleNotice="Want to list your land? "
              roleNoticeHref="/seller/register"
              roleNoticeTitle="Register as Seller"
            />
          </>
        )}
      </AuthCard>
    </AuthLayout>
  );
}
