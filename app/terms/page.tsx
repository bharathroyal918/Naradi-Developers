import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Naradi Developers',
  description: 'Naradi Developers Terms of Service — rules and guidelines for using our property marketplace.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 py-14">
        <div className="container-xl">
          <h1 className="font-display text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-emerald-200">Last updated: January 2024</p>
        </div>
      </div>
      <div className="container-xl max-w-4xl py-12">
        <div className="space-y-8">
          {[
            {
              title: '1. Acceptance of Terms',
              content: 'By using Naradi Developers platform, you agree to these Terms of Service. If you do not agree, please do not use our services.',
            },
            {
              title: '2. Platform Nature',
              content: 'Naradi Developers is a broker-free marketplace connecting property owners directly with buyers. We are not a real estate broker or agent. We facilitate connections but are not party to any property transaction.',
            },
            {
              title: '3. User Obligations',
              content: 'You must provide accurate information, not misrepresent properties, complete KYC verification, not engage in fraudulent activities, and comply with all applicable laws when using our platform.',
            },
            {
              title: '4. Property Listings',
              content: 'Property owners must ensure all listed information is accurate, provide genuine documents for verification, have legal right to sell/lease the property, and disclose all known defects or encumbrances.',
            },
            {
              title: '5. Verification Disclaimer',
              content: 'While we conduct thorough verification, Naradi does not guarantee clear title or absence of disputes. Buyers are advised to conduct independent legal due diligence before finalizing any transaction.',
            },
            {
              title: '6. Limitation of Liability',
              content: 'Naradi shall not be liable for disputes between buyers and sellers, inaccuracies in listings, failed transactions, or any consequential damages arising from property transactions conducted on our platform.',
            },
            {
              title: '7. Governing Law',
              content: 'These terms are governed by the laws of India. Disputes shall be resolved through arbitration in Bengaluru, Karnataka, in accordance with the Arbitration and Conciliation Act, 1996.',
            },
          ].map((section) => (
            <div key={section.title} className="border-b border-gray-100 pb-6">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
