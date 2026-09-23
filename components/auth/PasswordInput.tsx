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
          className={`w-full pl-4 pr-11 py-2.5 rounded-xl text-sm outline-none transition-all ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10'
          } border ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
              : ''
          }`}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors ${
            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
          }`}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Strength Bar */}
      {showStrength && currentValue.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}>Password strength</span>
            <span className={`font-bold ${
              score <= 2 ? 'text-rose-600' : score === 3 ? 'text-amber-600' : score === 4 ? 'text-blue-600' : 'text-emerald-700'
            }`}>{strength.label}</span>
          </div>
          <div className={`h-1.5 w-full rounded-full overflow-hidden flex gap-1 ${isDark ? 'bg-slate-800' : 'bg-slate-100 border border-slate-200'}`}>
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
        <div
          className={`p-3.5 rounded-xl border grid grid-cols-2 gap-2 text-xs transition-colors ${
            isDark
              ? 'bg-slate-900/90 border-slate-700 text-slate-300'
              : 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950'
          }`}
        >
          <div className={`flex items-center gap-1.5 ${hasMinLength ? (isDark ? 'text-emerald-400 font-semibold' : 'text-emerald-800 font-semibold') : (isDark ? 'text-slate-500' : 'text-slate-500')}`}>
            {hasMinLength ? <Check className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} /> : <X className="w-3.5 h-3.5 text-slate-400" />}
            <span>Min 8 characters</span>
          </div>
          <div className={`flex items-center gap-1.5 ${hasUpper ? (isDark ? 'text-emerald-400 font-semibold' : 'text-emerald-800 font-semibold') : (isDark ? 'text-slate-500' : 'text-slate-500')}`}>
            {hasUpper ? <Check className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} /> : <X className="w-3.5 h-3.5 text-slate-400" />}
            <span>Uppercase letter</span>
          </div>
          <div className={`flex items-center gap-1.5 ${hasLower ? (isDark ? 'text-emerald-400 font-semibold' : 'text-emerald-800 font-semibold') : (isDark ? 'text-slate-500' : 'text-slate-500')}`}>
            {hasLower ? <Check className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} /> : <X className="w-3.5 h-3.5 text-slate-400" />}
            <span>Lowercase letter</span>
          </div>
          <div className={`flex items-center gap-1.5 ${hasNumber ? (isDark ? 'text-emerald-400 font-semibold' : 'text-emerald-800 font-semibold') : (isDark ? 'text-slate-500' : 'text-slate-500')}`}>
            {hasNumber ? <Check className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} /> : <X className="w-3.5 h-3.5 text-slate-400" />}
            <span>Number (0-9)</span>
          </div>
          <div className={`col-span-2 flex items-center gap-1.5 ${hasSpecial ? (isDark ? 'text-emerald-400 font-semibold' : 'text-emerald-800 font-semibold') : (isDark ? 'text-slate-500' : 'text-slate-500')}`}>
            {hasSpecial ? <Check className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} /> : <X className="w-3.5 h-3.5 text-slate-400" />}
            <span>Special character (!@#$%^&*)</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PasswordInput;
