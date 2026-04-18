import { Getspecificbrand } from '@/api/serves/route';
import Image from 'next/image';

interface BrandPageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandPage(props: BrandPageProps) {
  const { id: brandid } = await props.params;
  const brand = await Getspecificbrand(brandid);

  if (!brand) {
    return <div className="flex items-center justify-center h-screen text-gray-500 text-xl">Brand Not Found 😔</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-sm w-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg mb-6">
          <Image src={brand.image} alt={brand.name} fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{brand.name}</h1>
        <p className="text-gray-500 text-center mb-6">Discover all products and collections of {brand.name}</p>
        <a
          href={`/brands`}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold text-lg hover:bg-emerald-700 transition"
        >
          Back to Brands
        </a>
      </div>
    </div>
  );
}