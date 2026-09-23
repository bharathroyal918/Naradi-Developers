import { Metadata } from 'next';
import { CategoryMarketplaceView } from '@/components/properties/CategoryMarketplaceView';
import { propertyService } from '@/services/property';

export const metadata: Metadata = {
  title: 'Independent Houses & Duplex Residences for Sale — Naradi Developers',
  description: 'Verified independent houses, duplex homes, and private bungalows with clear ownership titles and private parking.',
};

export default async function IndividualHousePage() {
  const properties = await propertyService.getProperties({ category: 'individual-houses' });

  const specialPills = [
    { id: '3bhk', label: '3+ BHK' },
    { id: 'parking', label: 'Private Car Parking' },
    { id: 'east', label: 'East / North Facing' },
  ];

  return (
    <CategoryMarketplaceView
      category="individual-houses"
      categoryTitle="Independent Houses & Duplexes"
      categorySubtitle="Enjoy complete ownership of your roof and land with verified independent houses, private gardens, and peaceful residential neighborhoods."
      heroImage="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=85&auto=format&fit=crop"
      badge="Private Living"
      specialPills={specialPills}
      properties={properties}
    />
  );
}
