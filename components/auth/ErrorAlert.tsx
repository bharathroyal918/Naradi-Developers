'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ErrorAlertProps {
  message?: string | null;
  onDismiss?: () => void;
  dark?: boolean;
}

export function ErrorAlert({ message, onDismiss, dark = false }: ErrorAlertProps) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl p-3.5 flex items-start gap-3 border text-sm mb-4 ${
        dark
          ? 'bg-rose-950/40 border-rose-800/60 text-rose-300'
          : 'bg-rose-50 border-rose-200 text-rose-800'
      }`}
      role="alert"
    >
      <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${dark ? 'text-rose-400' : 'text-rose-600'}`} />
      <div className="flex-1 font-medium leading-relaxed">{message}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={`p-1 rounded-lg transition-colors ${
            dark
              ? 'hover:bg-rose-900/60 text-rose-400 hover:text-rose-200'
              : 'hover:bg-rose-100 text-rose-600 hover:text-rose-800'
          }`}
          aria-label="Dismiss error"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}
