import Image from "next/image";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { ProductType } from "@/api/Types";
import {
  FiShare2,
  FiShoppingCart,
  FiZap,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi";
import HandleAddCard from "../HandleAddCard/HandleAddCard";
import UpdateCount from "@/app/cart/UpdateCount";
import HandleAddWishlist from "@/app/wishlist/HandleAddWhishlist";

export default function ProductdetailsLayout({
  product,
}: {
  product: ProductType;
}) {
  const finalPrice = product.priceAfterDiscount ?? product.price;

  const hasDiscount =
    !!product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0;

  const isInStock = product.quantity > 0;
  const rating = Math.round(product.ratingsAverage || 0);
  console.log('id fromlayout',product._id)

  return (
  <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-10">
  <div className="container mx-auto px-4">
    <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
        {/* Images */}
        <div className="border-b border-slate-200/70 bg-slate-50 p-4 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="space-y-4">
            <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-b from-white to-slate-100 sm:h-[520px]">
              {product.priceAfterDiscount && (
                <span className="absolute left-4 top-4 z-20 rounded-full bg-gradient-to-r from-rose-500 to-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  -{Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}% OFF
                </span>
              )}

                  <HandleAddWishlist id={product._id } />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_55%)]" />

              <Image
                src={product.imageCover}
                alt={product.title}
                width={500}
                height={500}
                priority
                className="relative z-10 h-[360px] w-auto object-contain transition duration-500 hover:scale-105 sm:h-[440px]"
              />
            </div>

            {!!product.images?.length && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((img, index) => (
                  <div
                    key={index}
                    className="group flex h-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-emerald-300 hover:shadow-md sm:h-28"
                  >
                    <Image
                      src={img}
                      alt={`${product.title}-${index}`}
                      width={120}
                      height={120}
                      className="h-20 w-auto object-contain transition duration-300 group-hover:scale-105 sm:h-24"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="p-5 sm:p-7 lg:p-10 space-y-6">
          {/* Category + Brand */}
          <div className="flex flex-wrap items-center gap-3">
            {product.category?.name && (
              <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                {product.category.name}
              </span>
            )}
            {product.brand?.name && (
              <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
                {product.brand.name}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
              {product.title}
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Premium product details with clean presentation and modern layout
            </p>
          </div>

          {/* Rating + Stock */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    className={index < Math.round(product.ratingsAverage || 0) ? "text-[15px] text-yellow-400" : "text-[15px] text-slate-300"}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700">
                {product.ratingsAverage || 0} ({product.ratingsQuantity || 0} reviews)
              </span>
            </div>

            <div
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                product.quantity > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
              }`}
            >
              <FiCheckCircle />
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          {/* Price */}
          <div className="rounded-[28px] bg-slate-50 p-5 ring-1 ring-slate-200/70">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                {product.priceAfterDiscount ?? product.price} EGP
              </h2>
              {product.priceAfterDiscount && (
                <>
                  <span className="text-xl font-medium text-slate-400 line-through">
                    {product.price} EGP
                  </span>
                  <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                    Save {Math.round(((product.price - product.priceAfterDiscount)/product.price)*100)}%
                  </span>
                </>
              )}
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Tax included. Shipping calculated at checkout.
            </p>
          </div>

          {/* Description */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="mb-3 text-lg font-bold text-slate-900">
              Description
            </h3>
            <p className="whitespace-pre-line text-base leading-8 text-slate-600">
              {product.description}
            </p>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">

              <span className="text-sm font-medium text-slate-500">
                {product.quantity} available in stock
              </span>
            </div>

            {/* Add to Cart button */}
            <HandleAddCard
              id={product._id}
              className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 text-lg font-bold text-white shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-emerald-300"
            >
              <FiShoppingCart size={22} />
              Add to Cart
            </HandleAddCard>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4 shadow-sm">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FiTruck size={20} />
              </div>
              <p className="font-bold text-slate-800">Free Delivery</p>
              <p className="mt-1 text-sm text-slate-500">Orders over 50 EGP</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 shadow-sm">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FiRefreshCw size={20} />
              </div>
              <p className="font-bold text-slate-800">Easy Returns</p>
              <p className="mt-1 text-sm text-slate-500">30 days return policy</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 shadow-sm">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FiShield size={20} />
              </div>
              <p className="font-bold text-slate-800">Secure Payment</p>
              <p className="mt-1 text-sm text-slate-500">100% protected checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
} 