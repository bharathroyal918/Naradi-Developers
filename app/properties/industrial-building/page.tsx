import { Metadata } from 'next';
import { CategoryMarketplaceView } from '@/components/properties/CategoryMarketplaceView';
import { propertyService } from '@/services/property';

export const metadata: Metadata = {
  title: 'Industrial Buildings & Manufacturing Plants — Naradi Developers',
  description: 'Heavy engineering industrial buildings, KIADB factories, and industrial processing plants with HT power and pollution clearances.',
};

export default async function IndustrialBuildingPage() {
  const properties = await propertyService.getProperties({ category: 'industrial-building' });

  const specialPills = [
    { id: 'power', label: 'High Power Substation' },
    { id: 'crane', label: 'Overhead Gantry Ready' },
    { id: 'noc', label: 'Pollution / Fire NOC' },
  ];

  return (
    <CategoryMarketplaceView
      category="industrial-building"
      categoryTitle="Industrial Buildings & Manufacturing Plants"
      categorySubtitle="Turnkey manufacturing facilities in authorized industrial development zones with verified high-tension power, effluent handling approvals, and wide-turning truck corridors."
      heroImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=85&auto=format&fit=crop"
      badge="Industrial Hubs"
      specialPills={specialPills}
      properties={properties}
    />
  );
}
