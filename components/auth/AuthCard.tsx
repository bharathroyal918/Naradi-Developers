'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface AuthCardProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark' | 'emerald';
  dark?: boolean;
}

export function AuthCard({ children, theme = 'light', dark = false }: AuthCardProps) {
  const isDark = dark || theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`rounded-3xl p-6 sm:p-8 shadow-xl border w-full ${
        isDark
          ? 'bg-slate-900/95 text-white border-slate-800 backdrop-blur-xl shadow-black/40'
          : 'bg-white text-slate-900 border-slate-100 shadow-emerald-950/10'
      }`}
    >
      {children}
    </motion.div>
  );
}

export default AuthCard;
