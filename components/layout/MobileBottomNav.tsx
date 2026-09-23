'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileNavItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Search', href: '/properties' },
  { icon: Plus, label: 'List', href: '/sellers', isPrimary: true },
  { icon: Heart, label: 'Saved', href: '/buyer-portal/wishlist' },
  { icon: User, label: 'Profile', href: '/auth/buyer/login' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 pb-safe"
    >
      <div className="flex items-center">
        {mobileNavItems.map((item) =>
          item.isPrimary ? (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
              aria-label={item.label}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center -mt-5 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)' }}
              >
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 mt-1">{item.label}</span>
            </Link>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors',
                pathname === item.href
                  ? 'text-emerald-700'
                  : 'text-gray-500 hover:text-gray-700'
              )}
              aria-label={item.label}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              <item.icon
                className={cn(
                  'w-5 h-5 transition-transform',
                  pathname === item.href && 'scale-110'
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-medium',
                  pathname === item.href ? 'font-semibold' : ''
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
