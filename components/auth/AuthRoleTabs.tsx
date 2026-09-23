'use client';

import React from 'react';
import Link from 'next/link';
import { User, Building2, Globe2 } from 'lucide-react';

export type AuthRole = 'buyer' | 'seller' | 'nri';

interface AuthRoleTabsProps {
  activeRole: AuthRole;
  mode: 'login' | 'register';
  onRoleChange?: (role: AuthRole) => void;
  dark?: boolean;
}

const ROLES: { id: AuthRole; label: string; subLabel: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'buyer', label: 'Buyer', subLabel: 'Buy / Invest', icon: User },
  { id: 'seller', label: 'Seller', subLabel: 'Direct Owner', icon: Building2 },
  { id: 'nri', label: 'NRI Global', subLabel: 'Overseas', icon: Globe2 },
];

export function AuthRoleTabs({
  activeRole,
  mode,
  onRoleChange,
  dark = false,
}: AuthRoleTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Select account type"
      className={`grid grid-cols-3 p-1 rounded-2xl mb-6 transition-colors border ${dark
        ? 'bg-slate-950/70 border-slate-800'
        : 'bg-slate-100/90 border-slate-200/80 shadow-inner'
        }`}
    >
      {ROLES.map((role) => {
        const isActive = activeRole === role.id;
        const Icon = role.icon;
        const href = `/${role.id}/${mode}`;

        const content = (
          <div className="flex flex-col items-center justify-center py-2 px-1 text-center select-none">
            <div className="flex items-center gap-1.5">
              <Icon
                className={`w-3.5 h-3.5 transition-colors ${isActive
                  ? 'text-amber-500'
                  : dark
                    ? 'text-slate-400'
                    : 'text-slate-500'
                  }`}
              />
              <span
                className={`text-xs font-bold tracking-tight transition-colors ${isActive
                  ? dark
                    ? 'text-white'
                    : 'text-emerald-950'
                  : dark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {role.label}
              </span>
            </div>
            <span
              className={`text-[9px] font-medium leading-none mt-0.5 ${isActive
                ? dark
                  ? 'text-emerald-400 font-semibold'
                  : 'text-emerald-700 font-semibold'
                : dark
                  ? 'text-slate-500'
                  : 'text-slate-400'
                }`}
            >
              {role.subLabel}
            </span>
          </div>
        );

        if (onRoleChange) {
          return (
            <button
              key={role.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onRoleChange(role.id)}
              className={`relative rounded-xl transition-all duration-200 ${isActive
                ? dark
                  ? 'bg-slate-900 shadow-md border-2 border-emerald-500/50 ring-2 ring-emerald-500/15'
                  : 'bg-white shadow-md shadow-emerald-950/10 border-2 border-emerald-700/40 ring-2 ring-emerald-700/10'
                : dark ? 'hover:bg-white/10 opacity-80 hover:opacity-100' : 'hover:bg-white/80 opacity-80 hover:opacity-100'
                }`}
            >
              {content}
            </button>
          );
        }

        return (
          <Link
            key={role.id}
            href={href}
            role="tab"
            aria-selected={isActive}
            className={`relative rounded-xl transition-all duration-200 ${isActive
              ? dark
                ? 'bg-slate-900 shadow-md border-2 border-emerald-500/50 ring-2 ring-emerald-500/15'
                : 'bg-white shadow-md shadow-emerald-950/10 border-2 border-emerald-700/40 ring-2 ring-emerald-700/10'
              : dark ? 'hover:bg-white/10 opacity-80 hover:opacity-100' : 'hover:bg-white/80 opacity-80 hover:opacity-100'
              }`}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}

export default AuthRoleTabs;
