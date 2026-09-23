import { Metadata } from 'next';
import { CategoryMarketplaceView } from '@/components/properties/CategoryMarketplaceView';
import { propertyService } from '@/services/property';

export const metadata: Metadata = {
  title: 'Luxury Gated Community Villas & Private Estates — Naradi Developers',
  description: 'Verified luxury villas, independent duplexes, and private garden homes with private pools and smart home amenities in Bengaluru.',
};

export default async function VillasPage() {
  const properties = await propertyService.getProperties({ category: 'villas' });

  const specialPills = [
    { id: 'pool', label: 'Private Swimming Pool' },
    { id: 'gated', label: 'Gated Villa Enclave' },
    { id: 'luxury', label: 'Ultra Luxury 4BHK+' },
  ];

  return (
    <CategoryMarketplaceView
      category="villas"
      categoryTitle="Luxury Gated Community Villas"
      categorySubtitle="Exclusive private villa enclaves crafted with expansive landscaped gardens, individual private swimming pools, and dedicated round-the-clock concierge services."
      heroImage="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=85&auto=format&fit=crop"
      badge="Signature Villa Estates"
      specialPills={specialPills}
      properties={properties}
    />
  );
}
