import { getallCategories } from '@/api/serves/route'
import Image from 'next/image'
import Link from 'next/link'
import { CategoryType } from '@/api/Types'

export const dynamic = 'force-dynamic'

export default async function Categories() {
  const categories: CategoryType[] = await getallCategories()

  if (categories.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No categories found 😔
      </div>
    )
  }

  return (
    <section className="px-6 py-12 md:px-12 xl:px-24 bg-gray-50 min-h-screen">
      <h1 className="mb-10 text-4xl font-extrabold text-gray-800 text-center">
        Explore Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="flex flex-col items-center gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-gray-100 shadow-inner">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain"
              />
            </div>

            <span className="text-lg font-semibold text-gray-900 text-center">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}