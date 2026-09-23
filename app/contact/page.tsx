import type { Metadata } from 'next';
import ContactFormSection from '@/components/sections/ContactFormSection';

export const metadata: Metadata = {
  title: 'Contact Naradi Developers — Headquartered in Yelahanka, Bengaluru',
  description: 'Get in touch with Naradi Developers — call, WhatsApp, or visit our headquarters at 8th Main Rd, Judicial Layout, Yelahanka, Bengaluru, Karnataka 560065. Expert property advisors ready to help.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 py-14">
          <div className="container-xl text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">Contact Us</h1>
            <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
              Our team of expert property advisors are available Monday to Saturday, 9 AM to 7 PM. Get in touch today.
            </p>
          </div>
        </div>
        <ContactFormSection />
      </div>
    </div>
  );
}
