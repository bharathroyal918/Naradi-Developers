// lib/utils.ts — Utility functions

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  } else if (price >= 1000) {
    return `₹${(price / 1000).toFixed(0)}K`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatArea(area: number, unit: string): string {
  return `${area.toLocaleString('en-IN')} ${unit}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(dateString);
}

export const categoryLabels: Record<string, string> = {
  'plots': 'Residential Plot',
  'commercial-land': 'Commercial Land',
  'agricultural-land': 'Agricultural Land',
  'farm-house': 'Farm House',
  'warehouse': 'Warehouse',
  'industrial-building': 'Industrial Building',
  'individual-houses': 'Individual House',
  'apartments': 'Apartment',
  'villas': 'Villa',
};

export const categoryColors: Record<string, string> = {
  'plots': 'bg-emerald-100 text-emerald-800',
  'commercial-land': 'bg-blue-100 text-blue-800',
  'agricultural-land': 'bg-green-100 text-green-800',
  'farm-house': 'bg-lime-100 text-lime-800',
  'warehouse': 'bg-orange-100 text-orange-800',
  'industrial-building': 'bg-gray-100 text-gray-800',
  'individual-houses': 'bg-purple-100 text-purple-800',
  'apartments': 'bg-pink-100 text-pink-800',
  'villas': 'bg-yellow-100 text-yellow-800',
};
