'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Phone,
  Mail,
  Building2,
  FileText,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { ProgressStepper } from '@/components/auth/ProgressStepper';
import { FormField } from '@/components/auth/FormField';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import { SuccessScreen } from '@/components/auth/SuccessScreen';
import { AuthRoleTabs } from '@/components/auth/AuthRoleTabs';
import {
  sellerRegistrationSchema,
  type SellerRegistrationInput,
  sellerStep1Schema,
  sellerStep2Schema,
  sellerStep3Schema,
} from '@/lib/validations/auth';
import { authService } from '@/services/auth';

const STEPS = [
  { id: 1, title: 'Personal Details', description: 'Name, phone & login' },
  { id: 2, title: 'Seller Type', description: 'Business category' },
  { id: 3, title: 'Address', description: 'Location & district' },
  { id: 4, title: 'Verification', description: 'Legal compliance' },
];

const SELLER_TYPES = [
  'Individual',
  'Builder',
  'Developer',
  'Land Aggregator',
  'Company',
] as const;

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

export default function SellerRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SellerRegistrationInput>({
    resolver: zodResolver(sellerRegistrationSchema),
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      email: '',
      password: '',
      sellerType: 'Individual',
      companyName: '',
      gstNumber: '',
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      city: 'Yelahanka',
      address: '',
      agreeMandatoryVerification: false,
      agreeTerms: false,
    },
  });

  const passwordValue = watch('password');
  const selectedSellerType = watch('sellerType');

  const handleFillSample = () => {
    setValue('fullName', 'G.R Narendra Reddy', { shouldValidate: true });
    setValue('mobileNumber', '9964156024', { shouldValidate: true });
    setValue('email', `narendra.seller${Math.floor(Math.random() * 900 + 100)}@example.com`, { shouldValidate: true });
    setValue('password', 'Password@123', { shouldValidate: true });
    setValue('sellerType', 'Developer', { shouldValidate: true });
    setValue('companyName', 'Naradi Estates Pvt Ltd', { shouldValidate: true });
    setValue('gstNumber', '29ABCDE1234F1Z5', { shouldValidate: true });
    setValue('state', 'Karnataka', { shouldValidate: true });
    setValue('district', 'Bengaluru Urban', { shouldValidate: true });
    setValue('city', 'Yelahanka', { shouldValidate: true });
    setValue('address', '142, Judicial Layout, Yelahanka', { shouldValidate: true });
    setValue('agreeMandatoryVerification', true, { shouldValidate: true });
    setValue('agreeTerms', true, { shouldValidate: true });
  };

  // Validate specific step before proceeding
  const handleNextStep = async () => {
    setServerError(null);
    let stepValid = false;

    if (currentStep === 1) {
      stepValid = await trigger(['fullName', 'mobileNumber', 'email', 'password']);
    } else if (currentStep === 2) {
      stepValid = await trigger(['sellerType', 'companyName', 'gstNumber']);
    } else if (currentStep === 3) {
      stepValid = await trigger(['state', 'district', 'city', 'address']);
    }

    if (stepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setServerError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: SellerRegistrationInput) => {
    try {
      setServerError(null);
      const res = await authService.registerSeller(data);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setServerError(res.message);
      }
    } catch {
      setServerError('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <AuthLayout theme="emerald" role="seller">
      <AuthCard theme="emerald">
        {isSuccess ? (
          <SuccessScreen
            badge="Partner Registered"
            title="Registration Successful"
            message="Your seller onboarding is complete! You can now access your seller dashboard, submit your land parcels for verification, and connect with genuine buyers."
            buttonText="Go to Seller Dashboard"
            buttonHref="/seller-portal"
            secondaryButtonText="View Seller Guidelines"
            secondaryButtonHref="/sellers"
          />
        ) : (
          <>
            {/* Role Tabs for switching between Buyer, Seller, NRI */}
            <AuthRoleTabs activeRole="seller" mode="register" />

            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-300">
                Direct Seller Program
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFillSample}
                  className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100/80 px-2 py-0.5 rounded-lg border border-amber-300 transition-colors"
                >
                  ⚡ Fill Sample
                </button>
                <span className="text-xs text-slate-500 font-medium">
                  Step {currentStep} of 4
                </span>
              </div>
            </div>

            <AuthHeader
              title="Seller Registration"
              subtitle="List verified properties with zero brokerage and reach pre-vetted buyers."
            />

            <ProgressStepper steps={STEPS} currentStep={currentStep} />

            <ErrorAlert message={serverError} onDismiss={() => setServerError(null)} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* STEP 1: Personal Details */}
              {currentStep === 1 && (
                <div className="space-y-3.5">
                  <FormField id="fullName" label="Full Name" required error={errors.fullName?.message}>
                    <div className="relative">
                      <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input
                        id="fullName"
                        type="text"
                        placeholder="e.g. Narendra Reddy"
                        {...register('fullName')}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all outline-none bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                      />
                    </div>
                  </FormField>

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
                          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all outline-none bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                        />
                      </div>
                    </FormField>

                    <FormField id="email" label="Email Address" required error={errors.email?.message}>
                      <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          id="email"
                          type="email"
                          placeholder="seller@example.com"
                          {...register('email')}
                          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all outline-none bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                        />
                      </div>
                    </FormField>
                  </div>

                  <FormField id="password" label="Create Password" required error={errors.password?.message}>
                    <PasswordInput
                      id="password"
                      placeholder="Minimum 8 characters"
                      value={passwordValue}
                      onChange={(val) => setValue('password', val, { shouldValidate: true })}
                      showStrength
                      showChecklist
                      error={errors.password?.message}
                    />
                  </FormField>
                </div>
              )}

              {/* STEP 2: Seller Information */}
              {currentStep === 2 && (
                <div className="space-y-3.5">
                  <FormField id="sellerType" label="Seller Type" required error={errors.sellerType?.message}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                      {SELLER_TYPES.map((type) => {
                        const isSelected = selectedSellerType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setValue('sellerType', type, { shouldValidate: true })}
                            className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${isSelected
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-800 ring-2 ring-emerald-600/20'
                              : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </FormField>

                  <FormField
                    id="companyName"
                    label="Company / Firm Name (Optional)"
                    hint="For Builders & Developers"
                    error={errors.companyName?.message}
                  >
                    <div className="relative">
                      <Building2 className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input
                        id="companyName"
                        type="text"
                        placeholder="e.g. Naradi Land Developers Pvt Ltd"
                        {...register('companyName')}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all outline-none bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                      />
                    </div>
                  </FormField>

                  <FormField
                    id="gstNumber"
                    label="GST Number (Optional)"
                    hint="15-character GSTIN"
                    error={errors.gstNumber?.message}
                  >
                    <div className="relative">
                      <FileText className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input
                        id="gstNumber"
                        type="text"
                        placeholder="29AAAAA0000A1Z5"
                        maxLength={15}
                        {...register('gstNumber')}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono uppercase transition-all outline-none bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                      />
                    </div>
                  </FormField>
                </div>
              )}

              {/* STEP 3: Address */}
              {currentStep === 3 && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField id="state" label="State" required error={errors.state?.message}>
                      <select
                        id="state"
                        {...register('state')}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all outline-none bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                      >
                        {STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField id="district" label="District" required error={errors.district?.message}>
                      <input
                        id="district"
                        type="text"
                        placeholder="e.g. Bengaluru Urban"
                        {...register('district')}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all outline-none bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                      />
                    </FormField>
                  </div>

                  <FormField id="city" label="City / Taluk" required error={errors.city?.message}>
                    <input
                      id="city"
                      type="text"
                      placeholder="e.g. Yelahanka"
                      {...register('city')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all outline-none bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </FormField>

                  <FormField id="address" label="Office / Registered Address" required error={errors.address?.message}>
                    <div className="relative">
                      <MapPin className="w-5 h-5 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                      <textarea
                        id="address"
                        rows={3}
                        placeholder="8th Main Rd, Judicial Layout, Yelahanka..."
                        {...register('address')}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all outline-none bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 resize-none"
                      />
                    </div>
                  </FormField>
                </div>
              )}

              {/* STEP 4: Verification Ready */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-900 space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0" />
                      <span>Naradi 100% Legal Verification Mandate</span>
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Every property submitted to Naradi Developers undergoes on-ground physical inspection, 30-year title deeds validation, and encumbrance certificate (EC) scrutiny before it is visible to buyers.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        {...register('agreeMandatoryVerification')}
                        className="w-4 h-4 mt-1 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs text-slate-700 leading-tight">
                        <strong>I agree that property verification is mandatory</strong> for all listings I submit, and I will furnish original deed copies and survey sketches.
                      </span>
                    </label>
                    {errors.agreeMandatoryVerification && (
                      <p className="text-xs text-rose-500 font-medium pl-7">
                        {errors.agreeMandatoryVerification.message}
                      </p>
                    )}

                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        {...register('agreeTerms')}
                        className="w-4 h-4 mt-1 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs text-slate-700 leading-tight">
                        I accept the{' '}
                        <Link href="/terms" className="text-emerald-700 font-semibold hover:underline">
                          Seller Terms
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-emerald-700 font-semibold hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <p className="text-xs text-rose-500 font-medium pl-7">
                        {errors.agreeTerms.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="flex items-center gap-3 pt-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 active:scale-[0.99] flex items-center justify-center gap-2 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md active:scale-[0.99] flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-lg shadow-emerald-900/20 active:scale-[0.99] flex items-center justify-center gap-2 transition-all disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                        <span>Submitting Onboarding...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Registration</span>
                        <CheckCircle className="w-4 h-4 text-emerald-300" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            <AuthFooter
              linkText="Already a registered seller?"
              linkHref="/seller/login"
              linkTitle="Seller Login"
              roleNotice="Are you an NRI investor? "
              roleNoticeHref="/nri/login"
              roleNoticeTitle="NRI Portal"
            />
          </>
        )}
      </AuthCard>
    </AuthLayout>
  );
}
