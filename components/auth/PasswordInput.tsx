'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export interface PasswordInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  showStrength?: boolean;
  showChecklist?: boolean;
  theme?: 'light' | 'dark' | 'emerald';
  dark?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  registerProps?: Record<string, unknown>;
}

export function PasswordInput({
  id = 'password',
  placeholder = '••••••••',
  value,
  onChange,
  onBlur,
  error,
  showStrength = false,
  showChecklist = false,
  theme = 'light',
  dark = false,
  disabled = false,
  autoComplete = 'current-password',
  registerProps,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const isDark = dark || theme === 'dark';

  const currentValue = value !== undefined ? value : (registerProps?.value as string) ?? internalValue;

  const hasUpper = /[A-Z]/.test(currentValue);
  const hasLower = /[a-z]/.test(currentValue);
  const hasNumber = /[0-9]/.test(currentValue);
  const hasSpecial = /[^A-Za-z0-9]/.test(currentValue);
  const hasMinLength = currentValue.length >= 8;

  const score = [hasUpper, hasLower, hasNumber, hasSpecial, hasMinLength].filter(Boolean).length;

  const getStrengthLabel = () => {
    if (!currentValue) return { label: '', color: 'bg-gray-200' };
    if (score <= 2) return { label: 'Weak', color: 'bg-rose-500' };
    if (score === 3) return { label: 'Fair', color: 'bg-amber-500' };
    if (score === 4) return { label: 'Good', color: 'bg-blue-500' };
    return { label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getStrengthLabel();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          {...(registerProps as React.InputHTMLAttributes<HTMLInputElement>)}
          className={`w-full pl-4 pr-11 py-3 rounded-xl text-sm outline-none transition-all ${isDark
            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20'
            : 'bg-white border-slate-300 hover:border-slate-400 text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10'
            } border ${error
              ? isDark
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10'
                : 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
              : ''
            }`}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
            }`}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Strength Bar */}
      {showStrength && currentValue.length > 0 && (
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Password strength</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">{strength.label}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex gap-1">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <div
                key={lvl}
                className={`h-full flex-1 rounded-full transition-all duration-300 ${score >= lvl ? strength.color : 'bg-transparent'
                  }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Checklist */}
      {showChecklist && currentValue.length > 0 && (
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-1.5 text-[11px]">
          <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-600' : 'text-slate-400'}`}>
            {hasMinLength ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3" />}
            <span>Min 8 characters</span>
          </div>
          <div className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-600' : 'text-slate-400'}`}>
            {hasUpper ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3" />}
            <span>Uppercase letter</span>
          </div>
          <div className={`flex items-center gap-1.5 ${hasLower ? 'text-emerald-600' : 'text-slate-400'}`}>
            {hasLower ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3" />}
            <span>Lowercase letter</span>
          </div>
          <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-600' : 'text-slate-400'}`}>
            {hasNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3" />}
            <span>Number (0-9)</span>
          </div>
          <div className={`col-span-2 flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-600' : 'text-slate-400'}`}>
            {hasSpecial ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3" />}
            <span>Special character (!@#$%^&*)</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PasswordInput;
