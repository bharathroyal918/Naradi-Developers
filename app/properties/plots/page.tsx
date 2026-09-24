import { Metadata } from 'next';
import { CategoryMarketplaceView } from '@/components/properties/CategoryMarketplaceView';
import { propertyService } from '@/services/property';

export const metadata: Metadata = {
  title: 'Residential Plots & BDA/DTCP Approved Layouts — Naradi Developers',
  description: 'Explore verified residential plots for sale across Bengaluru and South India with DTCP, BDA, and RERA approvals. 100% legally verified titles with zero brokerage.',
};

export default async function PlotsPage() {
  const properties = await propertyService.getProperties({ category: 'plots' });

  const specialPills = [
    { id: 'bda', label: 'BDA Approved' },
    { id: 'rera', label: 'RERA Certified' },
    { id: 'gated', label: 'Gated Community' },
    { id: 'corner', label: 'Corner Plots' },
    { id: 'wide-road', label: '40ft+ Wide Roads' },
  ];

  const faqs = [
    {
      q: 'Are all plots on Naradi Developers legally verified?',
      a: 'Yes, every residential plot undergoes a rigorous 30-year title due diligence, survey sketch verification, encumbrance audit, and local development authority confirmation (BDA/DTCP/BMRDA).',
    },
    {
      q: 'Can I get a bank loan for purchasing residential plots?',
      a: 'Absolutely. Because our plots have clear title deeds and statutory approvals, they are pre-eligible for composite plot purchase and construction loans from SBI, HDFC, ICICI, and Canara Bank.',
    },
    {
      q: 'What is the standard procedure for booking a site visit?',
      a: 'Simply click "Schedule Visit" on any plot. You can select an on-ground accompanied visit with our certified land surveyor (₹2,000 commitment token, 100% adjustable against booking) or a free live virtual 360° tour with a relationship manager.',
    },
  ];

  return (
    <CategoryMarketplaceView
      category="plots"
      categoryTitle="Residential Plots & Gated Layouts"
      categorySubtitle="Discover 100% legally clear, BDA and DTCP approved residential land parcels with wide asphalt roads, underground utilities, and guaranteed zero brokerage."
      heroImage="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=1600&q=85&auto=format&fit=crop"
      badge="Land First Marketplace"
      specialPills={specialPills}
      properties={properties}
      faqs={faqs}
    />
  );
}
