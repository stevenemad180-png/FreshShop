import React from "react"
import { GETWISHLIST } from "@/api/serves/route"
import { ProductType } from "@/api/Types"
import Image from "next/image"
import HandleAddCard from "../_Components/HandleAddCard/HandleAddCard"
import HandleButtonDeleteWishlist from "./HandleButtonDeleteWishlist"

export const dynamic = "force-dynamic"

export default async function WishlistPage() {
  const res = await GETWISHLIST()
  const wishlist: ProductType[] = res?.data ?? []

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        Your wishlist is empty 💔
      </div>
    )
  }

  return (
    <section className="px-4 py-10 md:px-8 xl:px-16">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
          >
            <div className="relative mb-3 h-52 w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="mb-3">
              <h3 className="text-sm font-semibold text-slate-800 mb-1 line-clamp-2">
                {product.title}
              </h3>

              <p className="text-xs text-slate-500 mb-1">
                {product.category?.name}
              </p>

              <span className="font-bold text-slate-900">
                {product.priceAfterDiscount ?? product.price} EGP
              </span>
            </div>

            <div className="flex gap-2 mt-auto">
              <HandleButtonDeleteWishlist id={product._id} />

              <HandleAddCard
                id={product._id}
                className="flex-1 h-10 rounded-xl bg-emerald-600 text-white font-semibold transition hover:bg-emerald-700"
              >
                Add to Cart
              </HandleAddCard>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}