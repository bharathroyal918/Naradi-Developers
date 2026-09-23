'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { FormField } from '@/components/auth/FormField';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import { SuccessScreen } from '@/components/auth/SuccessScreen';
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations/auth';
import { authService } from '@/services/auth';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your account';

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      setServerError(null);
      const res = await authService.resetPassword(email, data.password);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setServerError(res.message);
      }
    } catch {
      setServerError('Failed to reset password. Please try again.');
    }
  };

  return (
    <AuthLayout theme="emerald" role="auth">
      <AuthCard theme="emerald">
        {isSuccess ? (
          <SuccessScreen
            badge="Security Updated"
            title="Password Updated Successfully"
            message="Your account credentials have been securely updated. You can now login with your new password to access your dashboard."
            buttonText="Back to Login"
            buttonHref="/buyer/login"
            secondaryButtonText="Or login to Seller Portal"
            secondaryButtonHref="/seller/login"
          />
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-4 mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <AuthHeader
              badge="Create New Credentials"
              title="Reset Your Password"
              subtitle={`Set a strong, new password for ${email}.`}
            />

            <ErrorAlert message={serverError} onDismiss={() => setServerError(null)} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <FormField
                id="password"
                label="New Password"
                required
                error={errors.password?.message}
              >
                <PasswordInput
                  id="password"
                  placeholder="Enter new password"
                  value={passwordValue}
                  onChange={(val) => setValue('password', val, { shouldValidate: true })}
                  showStrength
                  showChecklist
                  error={errors.password?.message}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                />
              </FormField>

              <FormField
                id="confirmPassword"
                label="Confirm New Password"
                required
                error={errors.confirmPassword?.message}
              >
                <PasswordInput
                  id="confirmPassword"
                  placeholder="Re-enter new password"
                  value={confirmPasswordValue}
                  onChange={(val) => setValue('confirmPassword', val, { shouldValidate: true })}
                  error={errors.confirmPassword?.message}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                />
              </FormField>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] shadow-lg shadow-emerald-900/15 flex items-center justify-center gap-2 transition-all disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password</span>
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
