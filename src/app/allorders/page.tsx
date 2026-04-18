import { getallproduct } from '@/api/serves/route'
import { ProductType } from '@/api/Types'
import ProductCard from '../_Components/ProductCard/ProductCard'

export default async function ProductsPage() {
  const products = await getallproduct()

  if (!products || products.length === 0) {
    return <div className="text-center py-20 text-gray-500 text-lg">No products found 😔</div>
  }

  return (
    <section className="px-6 py-12 md:px-12 xl:px-24 bg-gray-50 min-h-screen">
      <h1 className="mb-10 text-4xl font-extrabold text-gray-800 text-center">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}