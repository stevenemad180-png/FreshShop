import { getallbrands } from '@/api/serves/route'
import Image from 'next/image'
import Link from 'next/link'
import { BrandType } from '@/api/Types'

export const dynamic = 'force-dynamic'

export default async function BrandsPage() {
  const brands: BrandType[] = await getallbrands()

  if (brands.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No brands found 😔
      </div>
    )
  }

  return (
    <section className="px-6 py-12 md:px-12 xl:px-24 bg-gray-50 min-h-screen">
      <h1 className="mb-10 text-4xl font-extrabold text-gray-800 text-center">
        Explore All Brands
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="flex flex-col items-center gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-gray-100 shadow-inner">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>

            <span className="text-lg font-semibold text-gray-900 text-center">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}