import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Naradi Developers',
  description: 'Naradi Developers Privacy Policy — how we collect, use, and protect your personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 py-14">
        <div className="container-xl">
          <h1 className="font-display text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-emerald-200">Last updated: January 2024</p>
        </div>
      </div>
      <div className="container-xl max-w-4xl py-12 prose prose-gray max-w-none">
        <div className="space-y-8">
          {[
            {
              title: '1. Information We Collect',
              content: 'We collect information you provide when registering (name, email, phone, address), property details when listing, transaction data, device and usage information, and communication records. We also collect location data when you use property search features.',
            },
            {
              title: '2. How We Use Your Information',
              content: 'Your information is used to provide our marketplace services, verify property listings, connect buyers and sellers, process transactions, send notifications about property enquiries and updates, improve our platform, and comply with legal obligations.',
            },
            {
              title: '3. Information Sharing',
              content: 'We share your property listing details with interested buyers and your contact information with parties you engage with. We do not sell your personal data to third parties. We may share data with our legal partners for verification purposes.',
            },
            {
              title: '4. Data Security',
              content: 'We implement industry-standard security measures including SSL encryption, secure data storage, access controls, and regular security audits to protect your personal information.',
            },
            {
              title: '5. Your Rights',
              content: 'You have the right to access, correct, or delete your personal data. You may opt out of marketing communications. You may request data portability. Contact privacy@naradidevelopers.com for any data-related requests.',
            },
            {
              title: '6. Cookies',
              content: 'We use cookies to enhance your browsing experience, remember preferences, and analyze site traffic. You may disable cookies through your browser settings, though some features may not work correctly.',
            },
            {
              title: '7. Contact',
              content: 'For privacy concerns, contact our Data Protection Officer at privacy@naradidevelopers.com or write to Naradi Developers, 8th Main Rd, Judicial Layout, Yelahanka, Bengaluru, Karnataka 560065, India.',
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
