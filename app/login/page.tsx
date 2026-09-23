'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BuyerLoginPage from '@/app/buyer/login/page';
import SellerLoginPage from '@/app/seller/login/page';
import NRILoginPage from '@/app/nri/login/page';

function LoginRouter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role');

  if (role === 'seller') {
    return <SellerLoginPage />;
  }

  if (role === 'nri') {
    return <NRILoginPage />;
  }

  return <BuyerLoginPage />;
}

export default function UnifiedLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <LoginRouter />
    </Suspense>
  );
}
