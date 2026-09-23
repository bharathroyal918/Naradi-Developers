import { Metadata } from 'next';
import { CategoryMarketplaceView } from '@/components/properties/CategoryMarketplaceView';
import { propertyService } from '@/services/property';

export const metadata: Metadata = {
  title: 'Commercial Land & Highway Frontage Properties — Naradi Developers',
  description: 'Verified commercial land parcels for retail, tech parks, hospitals, and institutional developments across Bengaluru and Tamil Nadu.',
};

export default async function CommercialLandPage() {
  const properties = await propertyService.getProperties({ category: 'commercial-land' });

  const specialPills = [
    { id: 'highway', label: 'Highway Frontage' },
    { id: 'it-park', label: 'Near IT Corridors' },
    { id: 'high-far', label: 'High FAR / Mixed Use' },
  ];

  const faqs = [
    {
      q: 'What commercial land permits are verified?',
      a: 'We verify zoning classification (commercial/industrial/mixed use), master plan land-use alignment, road widening setbacks, and conversion NOCs.',
    },
    {
      q: 'Can corporate and institutional buyers request custom feasibility studies?',
      a: 'Yes, our advisory desk conducts soil load testing, FAR computations, and power/water infrastructure feasibility audits.',
    },
  ];

  return (
    <CategoryMarketplaceView
      category="commercial-land"
      categoryTitle="Commercial Land & Growth Corridors"
      categorySubtitle="Strategic highway-frontage parcels, high-FAR retail zones, and institutional land primed for maximum capital appreciation and rental yield."
      heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85&auto=format&fit=crop"
      badge="High ROI Commercial Zones"
      specialPills={specialPills}
      properties={properties}
      faqs={faqs}
    />
  );
}
