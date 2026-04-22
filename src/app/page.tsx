import { getallproduct } from "@/api/serves/route";
import ProductCard from "./_Components/ProductCard/ProductCard";
import Myswiper from "./_Components/Myswiper/Myswiper";
import { lazy, Suspense } from "react";
import { BeatLoader } from "react-spinners";

const LazyCategoriesSubpart = lazy(() =>
  import("./_Components/CategoriesSubpart/CategoriesSubpart")
);

export const dynamic = "force-dynamic";

export default async function Home() {
  const allproducts = await getallproduct();

  return (
    <>
      <div className="p-10 m-3">
        <Myswiper
          imglist={[
            "/images/blog-img-1.jpeg",
            "/images/blog-img-2.jpeg",
            "/images/banner-4.jpeg",
          ]}
        />
      </div>

      <Suspense fallback={<BeatLoader />}>
        <LazyCategoriesSubpart />
      </Suspense>

      <section className="px-6 py-10 md:px-10 xl:px-16">
        <div className="mb-10 flex items-center gap-4">
          <span className="h-8 w-1 rounded-full bg-emerald-600" />
          <h2 className="text-4xl font-bold text-slate-900">
            Featured <span className="text-emerald-600">Products</span>
          </h2>
        </div>

        {allproducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No products found 😔
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {allproducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}