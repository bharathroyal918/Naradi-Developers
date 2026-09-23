import { Metadata } from 'next';
import { CategoryMarketplaceView } from '@/components/properties/CategoryMarketplaceView';
import { propertyService } from '@/services/property';

export const metadata: Metadata = {
  title: 'Luxury Apartments & High-Rise Living — Naradi Developers',
  description: 'Verified gated community apartments, penthouses, and high-rise residences with clubhouse, swimming pool, and 100% RERA compliance.',
};

export default async function ApartmentsPage() {
  const properties = await propertyService.getProperties({ category: 'apartments' });

  const specialPills = [
    { id: 'rera', label: 'RERA Certified Only' },
    { id: 'clubhouse', label: 'Clubhouse & Amenities' },
    { id: 'pool', label: 'Swimming Pool' },
    { id: '3bhk', label: '3 & 4 BHK Luxury' },
  ];

  return (
    <CategoryMarketplaceView
      category="apartments"
      categoryTitle="Luxury Apartments & Penthouses"
      categorySubtitle="Modern high-rise residential towers equipped with comprehensive clubhouse lifestyle amenities, EV charging, 24/7 power backup, and strict RERA registration."
      heroImage="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85&auto=format&fit=crop"
      badge="Modern High-Rise Living"
      specialPills={specialPills}
      properties={properties}
    />
  );
}
