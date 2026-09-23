'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
  onResend?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  theme?: 'light' | 'dark' | 'emerald';
  dark?: boolean;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  onResend,
  isLoading = false,
  disabled = false,
  theme = 'light',
  dark = false,
}: OTPInputProps) {
  const isDark = dark || theme === 'dark';
  const [digits, setDigits] = useState<string[]>(
    value ? value.split('').slice(0, length) : Array(length).fill('')
  );
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync external value if provided
  const [prevValue, setPrevValue] = useState(value);
  if (value !== undefined && value !== prevValue) {
    setPrevValue(value);
    const parts = value.split('').slice(0, length);
    while (parts.length < length) parts.push('');
    setDigits(parts);
  }

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const updateDigits = (newDigits: string[]) => {
    setDigits(newDigits);
    const code = newDigits.join('');
    if (onChange) onChange(code);
    if (code.length === length && !newDigits.includes('')) {
      if (onComplete) onComplete(code);
    }
  };

  const handleChange = (index: number, val: string) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    if (!cleaned) {
      const newDigits = [...digits];
      newDigits[index] = '';
      updateDigits(newDigits);
      return;
    }

    const newDigits = [...digits];
    // Handle multi-character paste or typed character
    if (cleaned.length > 1) {
      const pastedChars = cleaned.split('').slice(0, length - index);
      pastedChars.forEach((ch, i) => {
        newDigits[index + i] = ch;
      });
      updateDigits(newDigits);
      const nextFocus = Math.min(index + pastedChars.length, length - 1);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    newDigits[index] = cleaned[0];
    updateDigits(newDigits);

    // Auto-advance to next box
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        updateDigits(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, length);
    if (!pasted) return;

    const newDigits = Array(length).fill('');
    pasted.split('').forEach((ch, i) => {
      newDigits[i] = ch;
    });
    updateDigits(newDigits);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  const handleResendClick = () => {
    if (countdown > 0 || disabled || isLoading) return;
    setCountdown(60);
    if (onResend) onResend();
  };

  return (
    <div className="space-y-5">
      {/* 6 OTP Boxes */}
      <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digits[index] || ''}
            disabled={disabled || isLoading}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-2xl outline-none transition-all ${
              digits[index]
                ? isDark
                  ? 'border-emerald-500 bg-slate-900 text-white ring-2 ring-emerald-500/20'
                  : 'border-emerald-600 bg-white text-emerald-950 ring-2 ring-emerald-600/20 shadow-sm'
                : isDark
                ? 'border-slate-800 bg-slate-900/60 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                : 'border-slate-200 bg-slate-50/50 text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:bg-white'
            } border disabled:opacity-50`}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>

      {/* Countdown and Resend */}
      <div className="text-center text-xs text-slate-500">
        {countdown > 0 ? (
          <p>
            Resend OTP in <span className="font-bold text-emerald-700">{countdown}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendClick}
            disabled={disabled || isLoading}
            className={`inline-flex items-center gap-1.5 font-bold hover:underline transition-colors ${
              isDark ? 'text-emerald-400' : 'text-emerald-700'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Resend OTP Code</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default OTPInput;
