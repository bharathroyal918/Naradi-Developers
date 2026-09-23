'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BuyerRegisterPage from '@/app/buyer/register/page';
import SellerRegisterPage from '@/app/seller/register/page';
import NRIRegisterPage from '@/app/nri/register/page';

function RegisterRouter() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  if (role === 'seller') {
    return <SellerRegisterPage />;
  }

  if (role === 'nri') {
    return <NRIRegisterPage />;
  }

  return <BuyerRegisterPage />;
}

export default function UnifiedRegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <RegisterRouter />
    </Suspense>
  );
}
