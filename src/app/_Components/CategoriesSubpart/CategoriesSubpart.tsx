import { CategoriesItems } from "@/api/serves/route";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import DealCard from "../offers/Offers";

export default async function CategoriesSubpart() {
  const allCategoriesSubpart = await CategoriesItems();

  return (
    <section className="relative overflow-hidden px-4 py-14 md:px-8 xl:px-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-slate-50 to-white" />
      <div className="absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-sky-100/30 blur-3xl" />

      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-3 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
            Explore Collections
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl xl:text-5xl">
            Shop by <span className="text-emerald-600">Category</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
            Discover a wide range of categories curated to help you find exactly
            what you need with a cleaner and more modern shopping experience.
          </p>
        </div>

        <Link
          
          href="/categories"
          className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-md"
        >
          View All Categories
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {allCategoriesSubpart?.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-5 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]"
          >
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-emerald-50/70 to-transparent" />

            <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_8px_25px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 transition duration-300 group-hover:scale-105 group-hover:ring-emerald-100">
              <div className="flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full bg-slate-50">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={88}
                  height={88}
                  className="h-[88px] w-[88px] rounded-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <h3 className="text-base font-bold tracking-tight text-slate-800 transition group-hover:text-emerald-600 md:text-lg">
              {category.name}
            </h3>

            <p className="mt-2 text-xs font-medium text-slate-400 md:text-sm">
              Explore products
            </p>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-10">
  <DealCard
    label="Deal of the Day"
    title="Fresh Organic Fruits"
    description="Get up to 40% off on selected organic fruits"
    discount="40% OFF"
    code="ORGANIC40"
    gradientFrom="#10b981"
    gradientTo="#047857"
    btnText="Shop Now"
    btnLink="/allorders"
  />

  <DealCard
    label="New Arrivals"
    title="Exotic Vegetables"
    description="Discover our latest collection of premium vegetables"
    discount="25% OFF"
    code="FRESH25"
    gradientFrom="#f97316"
    gradientTo="#ef4444"
    btnText="Explore Now"
    btnLink="/allorders"
  />
</div>
    </section>
  );
}