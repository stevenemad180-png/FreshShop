import { ProductType } from "@/api/Types";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { Heart, Eye, Repeat2, ShoppingCart } from "lucide-react";
import HandleAddCard from "../HandleAddCard/HandleAddCard";
import HandleAddWishlist from "@/app/wishlist/HandleAddWhishlist";

export default function ProductCard({ product }: { product: ProductType }) {
  const finalPrice = product.priceAfterDiscount ?? product.price;

  const hasDiscount =
    !!product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0;

  const rating = Math.round(product.ratingsAverage || 0);

  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-slate-200/70 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_65px_rgba(15,23,42,0.12)]">
      {hasDiscount && (
        <span className="absolute left-4 top-4 z-30 rounded-full bg-gradient-to-r from-red-500 to-rose-500 px-3 py-1.5 text-xs font-bold tracking-wide text-white shadow-md">
          -{discountPercent}%
        </span>
      )}

      <div className="absolute right-4 top-4 z-30 flex translate-x-3 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <HandleAddWishlist id={product._id}>
          <Heart className="h-[18px] w-[18px] fill-current" />
        </HandleAddWishlist>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-sm backdrop-blur transition hover:scale-105 hover:text-emerald-600"
        >
          <Repeat2 size={17} />
        </button>

        <Link
          href={`/productdetails/${product._id}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-sm backdrop-blur transition hover:scale-105 hover:text-sky-600"
        >
          <Eye size={17} />
        </Link>
      </div>

      <Link href={`/productdetails/${product._id}`} className="block">
        <div className="relative mb-5 flex h-[260px] w-full items-center justify-center overflow-hidden rounded-[24px] bg-gradient-to-b from-slate-50 via-white to-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_55%)]" />

          <Image
            src={product.imageCover}
            alt={product.title}
            width={240}
            height={240}
            className="relative z-10 h-[220px] w-auto object-contain transition duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {product.category?.name || "Category"}
          </span>

          {product.brand?.name && (
            <span className="text-xs font-medium text-slate-400">
              {product.brand.name}
            </span>
          )}
        </div>

        <Link href={`/productdetails/${product._id}`}>
          <h3 className="line-clamp-2 min-h-[56px] text-[18px] font-bold leading-7 text-slate-900 transition group-hover:text-emerald-700">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < rating
                    ? "text-[14px] text-amber-400"
                    : "text-[14px] text-slate-200"
                }
              />
            ))}
          </div>

          <span className="text-sm font-medium text-slate-500">
            {product.ratingsAverage || 0}
          </span>

          <span className="text-sm text-slate-400">
            ({product.ratingsQuantity || 0})
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 pt-2">
          <div className="flex flex-col">
            <span className="text-[23px] font-extrabold tracking-tight text-slate-900">
              {finalPrice} EGP
            </span>

            {hasDiscount ? (
              <span className="text-sm font-medium text-slate-400 line-through">
                {product.price} EGP
              </span>
            ) : (
              <span className="text-sm text-transparent">.</span>
            )}
          </div>

          <HandleAddCard
            id={product._id}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition duration-300 hover:scale-[1.02] hover:from-emerald-700 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <ShoppingCart size={18} />
            <span>Add</span>
          </HandleAddCard>
        </div>
      </div>
    </div>
  );
}