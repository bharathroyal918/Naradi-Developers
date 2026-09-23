import { Metadata } from 'next';
import { CategoryMarketplaceView } from '@/components/properties/CategoryMarketplaceView';
import { propertyService } from '@/services/property';

export const metadata: Metadata = {
  title: 'Industrial Warehouses & Logistics Hubs for Sale / Lease — Naradi Developers',
  description: 'Verified industrial warehouses with high ceilings, multiple loading bays, fire NOC, and heavy vehicle turning access along arterial corridors.',
};

export default async function WarehousePage() {
  const properties = await propertyService.getProperties({ category: 'warehouse' });

  const specialPills = [
    { id: 'docks', label: 'Multiple Loading Docks' },
    { id: 'height', label: '30ft+ Ceiling Height' },
    { id: 'fire', label: 'Fire Hydrant & NOC' },
    { id: 'power', label: 'Heavy HT Power Grid' },
  ];

  return (
    <CategoryMarketplaceView
      category="warehouse"
      categoryTitle="Industrial Warehouses & Logistics Parks"
      categorySubtitle="Modern grade-A supply chain infrastructure with heavy floor loading capacity, dock levelers, ESFR sprinkler compliance, and prime freight connectivity."
      heroImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=85&auto=format&fit=crop"
      badge="Supply Chain & Logistics"
      specialPills={specialPills}
      properties={properties}
    />
  );
}
