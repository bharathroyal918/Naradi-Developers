import { Metadata } from 'next';
import { CategoryMarketplaceView } from '@/components/properties/CategoryMarketplaceView';
import { propertyService } from '@/services/property';

export const metadata: Metadata = {
  title: 'Luxury Farmhouses & Countryside Estates — Naradi Developers',
  description: 'Verified weekend farmhouses with private pools, fruit plantations, and club amenities within 90 minutes of Bengaluru and Chennai.',
};

export default async function FarmHousePage() {
  const properties = await propertyService.getProperties({ category: 'farm-house' });

  const specialPills = [
    { id: 'pool', label: 'Private Swimming Pool' },
    { id: 'garden', label: 'Fruit Orchard / Garden' },
    { id: 'fenced', label: 'Compounded & Secure' },
  ];

  return (
    <CategoryMarketplaceView
      category="farm-house"
      categoryTitle="Luxury Farmhouses & Country Estates"
      categorySubtitle="Escape city congestion with bespoke luxury farmhouses, private swimming pools, and manicured plantations crafted for peace of mind and family gatherings."
      heroImage="https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1600&q=85&auto=format&fit=crop"
      badge="Private Retreats"
      specialPills={specialPills}
      properties={properties}
    />
  );
}
