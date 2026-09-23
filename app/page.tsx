import type { Metadata } from 'next';
import HeroSection from '@/components/hero/HeroSection';
import TrustIndicators from '@/components/sections/TrustIndicators';
import WhyNaradi from '@/components/sections/WhyNaradi';
import TopCategories from '@/components/sections/TopCategories';
import LocationSearch from '@/components/sections/LocationSearch';
import HowItWorks from '@/components/sections/HowItWorks';
import FeaturedProperties from '@/components/sections/FeaturedProperties';
import NRIServices from '@/components/sections/NRIServices';
import WhyInvest from '@/components/sections/WhyInvest';
import WhoWeAre from '@/components/sections/WhoWeAre';
import StatsCounter from '@/components/sections/StatsCounter';
import Testimonials from '@/components/sections/Testimonials';
import AwardsSection from '@/components/sections/AwardsSection';
import FAQSection from '@/components/sections/FAQSection';
import BlogSection from '@/components/sections/BlogSection';
import ContactFormSection from '@/components/sections/ContactFormSection';

export const metadata: Metadata = {
  title: 'Naradi Developers — India\'s Trusted Broker-Free Marketplace for Verified Lands & Properties',
  description:
    'Buy, sell, and invest in verified land, residential, commercial, warehouse, and NRI-friendly properties across India with complete legal transparency. 12,500+ BDA & DTCP verified listings.',
  alternates: {
    canonical: 'https://naradidevelopers.com',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fafaf9] overflow-x-hidden">
      {/* 1. Hero Section (100vh, Drone Video/Image, Glass Search Card, Quick Filters, CTAs, Trust Chips) */}
      <HeroSection />

      {/* 2. Trust Strip (Immediately below hero, 4 trust metrics in green circular backgrounds) */}
      <TrustIndicators />

      {/* 3. Why Thousands Trust Naradi (4 premium service cards with icons & learn more) */}
      <WhyNaradi />

      {/* 4. Featured Land Categories (7 category cards with landscape images & hover zoom) */}
      <TopCategories />

      {/* 5. Property Search by Location (Interactive state cards: Karnataka, Telangana, Maharashtra, TN, AP, Kerala) */}
      <LocationSearch />

      {/* 6. Buying Land Made Simple (4-step horizontal timeline with connector line animation) */}
      <HowItWorks />

      {/* 7. Featured Properties (Luxury carousel with large cards, slider, verified badges, action buttons) */}
      <FeaturedProperties />

      {/* 8. NRI Services (Luxury dark green section, 3 large cards, bottom consultation banner) */}
      <NRIServices />

      {/* 9. Why Invest Through Naradi (Two-column layout with left visual illustration & 6 benefits list) */}
      <WhyInvest />

      {/* 10. Who We Are (Image collage, Founder & CEO G.R Narendra Reddy story, Mission, Vision, Values) */}
      <WhoWeAre />

      {/* 11. Statistics Section (Animated counters for 12,500+ listings, ₹2,400Cr+ deals, etc.) */}
      <StatsCounter />

      {/* 12. Testimonials (Large luxury carousel with customer photo, location, property, rating) */}
      <Testimonials />

      {/* 13. Certifications & Awards + Investor/Partner Section (RERA, Legal audits, Banking & Developer logos) */}
      <AwardsSection />

      {/* 14. FAQ Section (Accordion with 5 core questions) */}
      <FAQSection />

      {/* 15. Blog / Knowledge Section (Latest property insights, featured article + smaller cards) */}
      <BlogSection />

      {/* 16. Contact Section (Left: Quick Enquiry Form; Right: Contact cards + Headquarters Map) */}
      <ContactFormSection />
    </main>
  );
}
