import type { Metadata } from 'next';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'FAQ — Naradi Developers',
  description: 'Frequently asked questions about buying and selling property on Naradi Developers — legal, pricing, NRI services, verification, and more.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 py-14">
          <div className="container-xl text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">Frequently Asked Questions</h1>
            <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
              Answers to the most common questions about buying, selling, and investing through Naradi Developers.
            </p>
          </div>
        </div>
        <FAQSection />
      </div>
    </div>
  );
}
