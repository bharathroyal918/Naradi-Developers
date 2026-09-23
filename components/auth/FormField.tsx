'use client';

import React from 'react';

interface FormFieldProps {
  id?: string;
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  dark?: boolean;
  children: React.ReactNode;
}

export function FormField({
  id,
  label,
  error,
  hint,
  required = false,
  dark = false,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex items-center justify-between text-xs font-semibold">
          <label
            htmlFor={id}
            className={`block ${dark ? 'text-slate-200' : 'text-slate-800'}`}
          >
            {label}
            {required && <span className="text-rose-500 ml-1">*</span>}
          </label>
          {hint && (
            <span className={dark ? 'text-slate-400 font-normal' : 'text-slate-500 font-normal'}>
              {hint}
            </span>
          )}
        </div>
      )}

      <div>{children}</div>

      {error && (
        <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
          <span>•</span> {error}
        </p>
      )}
    </div>
  );
}
