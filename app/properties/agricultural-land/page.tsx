import { Metadata } from 'next';
import { CategoryMarketplaceView } from '@/components/properties/CategoryMarketplaceView';
import { propertyService } from '@/services/property';

export const metadata: Metadata = {
  title: 'Agricultural Land & Organic Farmland for Sale — Naradi Developers',
  description: 'Verified agricultural land, agro-forestry estates, and fertile farmland with borewell water and road access in Karnataka & Tamil Nadu.',
};

export default async function AgriculturalLandPage() {
  const properties = await propertyService.getProperties({ category: 'agricultural-land' });

  const specialPills = [
    { id: 'borewell', label: 'Borewell & Water Ready' },
    { id: 'road', label: 'Tar Road Access' },
    { id: 'large', label: '3+ Acres' },
  ];

  const faqs = [
    {
      q: 'Who can buy agricultural land in Karnataka & Tamil Nadu?',
      a: 'Following recent land reforms, any Indian citizen or authorized entity can purchase agricultural land, subject to local ceiling norms. Our legal team assists with title mutations and RTC/Pahani verification.',
    },
    {
      q: 'Is conversion to non-agricultural status possible?',
      a: 'Our team evaluates DC conversion feasibility under Section 95 of Karnataka Land Revenue Act for qualifying parcels.',
    },
  ];

  return (
    <CategoryMarketplaceView
      category="agricultural-land"
      categoryTitle="Agricultural Land & Farmland"
      categorySubtitle="Fertile agricultural acreage, organic farm parcels, and agro-forestry land with confirmed water sources and road connectivity."
      heroImage="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=85&auto=format&fit=crop"
      badge="Verified Farmland"
      specialPills={specialPills}
      properties={properties}
      faqs={faqs}
    />
  );
}
