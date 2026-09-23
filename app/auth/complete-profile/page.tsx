'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Camera,
  MapPin,
  IndianRupee,
  Building,
  CheckCircle2,
  ArrowRight,
  Loader2,
  UserCheck,
} from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { FormField } from '@/components/auth/FormField';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import { SuccessScreen } from '@/components/auth/SuccessScreen';
import { completeProfileSchema, type CompleteProfileInput } from '@/lib/validations/auth';
import { authService } from '@/services/auth';

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

const PROPERTY_INTEREST_OPTIONS = [
  'Residential Plots',
  'Commercial Land',
  'Agricultural Farmland',
  'Gated Layout Sites',
  'Luxury Villas',
  'Industrial Warehousing',
];

const COMMUNICATION_CHANNELS = ['WhatsApp', 'Email', 'Phone Call'] as const;

export default function CompleteProfilePage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CompleteProfileInput>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      avatarUrl: '',
      state: 'Karnataka',
      city: 'Bengaluru',
      preferredLocations: 'Yelahanka, Devanahalli, Airport Road',
      budgetMin: 50,
      budgetMax: 250,
      propertyInterests: ['Residential Plots', 'Agricultural Farmland'],
      preferredCommunication: 'WhatsApp',
    },
  });

  const budgetMin = watch('budgetMin');
  const budgetMax = watch('budgetMax');
  const selectedInterests = watch('propertyInterests') || [];
  const selectedCommunication = watch('preferredCommunication');

  const toggleInterest = (interest: string) => {
    const next = selectedInterests.includes(interest)
      ? selectedInterests.filter((item) => item !== interest)
      : [...selectedInterests, interest];
    setValue('propertyInterests', next, { shouldValidate: true });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setValue('avatarUrl', url);
    }
  };

  const onSubmit = async (data: CompleteProfileInput) => {
    try {
      setServerError(null);
      const res = await authService.completeProfile(data);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/buyer-portal');
        }, 1200);
      } else {
        setServerError(res.message);
      }
    } catch {
      setServerError('Failed to save profile. Please try again.');
    }
  };

  return (
    <AuthLayout theme="emerald" role="auth">
      <AuthCard theme="emerald">
        {isSuccess ? (
          <SuccessScreen
            badge="Profile Complete"
            title="Welcome to Naradi Marketplace"
            message="Your buyer preferences and verified profile have been personalized. Redirecting you to your curated dashboard..."
            buttonText="Go to Buyer Portal"
            buttonHref="/buyer-portal"
          />
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-4 mx-auto">
              <UserCheck className="w-6 h-6" />
            </div>

            <AuthHeader
              badge="First Time Setup"
              title="Complete Your Profile"
              subtitle="Personalize your discovery algorithm to receive zero-brokerage alerts matched to your exact criteria."
            />

            <ErrorAlert message={serverError} onDismiss={() => setServerError(null)} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Profile Photo Upload */}
              <div className="flex flex-col items-center justify-center gap-2 pb-2">
                <div className="relative group cursor-pointer">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-600/40 bg-emerald-50/50 flex items-center justify-center overflow-hidden transition-all group-hover:border-emerald-600">
                    {photoPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photoPreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-2 text-emerald-800">
                        <Camera className="w-6 h-6 mx-auto mb-0.5 text-emerald-700" />
                        <span className="text-[10px] font-semibold block">Add Photo</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="Upload profile photo"
                  />
                </div>
                <span className="text-[11px] text-slate-500">
                  Optional • JPG, PNG or WEBP up to 5MB
                </span>
              </div>

              {/* State & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField id="state" label="State" required error={errors.state?.message}>
                  <select
                    id="state"
                    {...register('state')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all outline-none bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 cursor-pointer"
                  >
                    {STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField id="city" label="City" required error={errors.city?.message}>
                  <input
                    id="city"
                    type="text"
                    placeholder="e.g. Bengaluru"
                    {...register('city')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all outline-none bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                  />
                </FormField>
              </div>

              {/* Preferred Locations */}
              <FormField
                id="preferredLocations"
                label="Preferred Localities / Highways"
                required
                hint="Comma separated"
                error={errors.preferredLocations?.message}
              >
                <div className="relative">
                  <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="preferredLocations"
                    type="text"
                    placeholder="e.g. Yelahanka, Devanahalli, Doddaballapura"
                    {...register('preferredLocations')}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm transition-all outline-none bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                  />
                </div>
              </FormField>

              {/* Budget Range Slider */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-700" />
                    Target Budget Range
                  </span>
                  <span className="text-emerald-700 font-bold">
                    ₹{budgetMin} Lakhs – ₹{budgetMax} Lakhs
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[11px] text-slate-500 font-medium block mb-1">
                      Min (₹ Lakhs): {budgetMin}L
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      step={5}
                      {...register('budgetMin', { valueAsNumber: true })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 font-medium block mb-1">
                      Max (₹ Lakhs): {budgetMax}L
                    </label>
                    <input
                      type="range"
                      min={20}
                      max={1000}
                      step={10}
                      {...register('budgetMax', { valueAsNumber: true })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Property Interests Chips */}
              <FormField
                label="Property Interests"
                required
                error={errors.propertyInterests?.message}
              >
                <div className="flex flex-wrap gap-2 pt-1">
                  {PROPERTY_INTEREST_OPTIONS.map((item) => {
                    const active = selectedInterests.includes(item);
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleInterest(item)}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all ${
                          active
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-500 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </FormField>

              {/* Preferred Communication */}
              <FormField
                label="Preferred Communication Channel"
                required
                error={errors.preferredCommunication?.message}
              >
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {COMMUNICATION_CHANNELS.map((ch) => {
                    const isSelected = selectedCommunication === ch;
                    return (
                      <button
                        type="button"
                        key={ch}
                        onClick={() => setValue('preferredCommunication', ch)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800 ring-2 ring-emerald-600/20'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>
              </FormField>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] shadow-lg shadow-emerald-900/15 flex items-center justify-center gap-2 transition-all disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Profile & Enter Marketplace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </AuthCard>
    </AuthLayout>
  );
}
