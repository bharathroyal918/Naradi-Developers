'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      router.replace('/buyer/login');
      return;
    }

    if (user.role === 'seller') {
      router.replace('/seller-portal');
    } else if (user.role === 'nri') {
      router.replace('/nri-services');
    } else {
      router.replace('/buyer-portal');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-full border-3 border-emerald-600 border-t-transparent animate-spin" />
        <p className="text-xs font-semibold text-slate-600">Redirecting to your portal...</p>
      </div>
    </div>
  );
}
