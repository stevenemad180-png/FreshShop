import { GETCART } from "@/api/serves/route";
import Image from "next/image";
import Link from "next/link";
import HandleButtonDelete from "./HandleButtonDelete";
import HandleButtonClear from "./HandleClearButton";
import UpdateCount from "./UpdateCount";

export default async function Page() {
  const cart = await GETCART();

  if (!cart || !cart.data) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-zinc-100 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[32px] border border-zinc-200/70 bg-white/90 p-10 text-center shadow-[0_20px_70px_rgba(0,0,0,0.08)] backdrop-blur">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-3xl">
              🛒
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
              Your cart is empty
            </h1>

            <p className="mt-3 text-base leading-7 text-zinc-500">
              Looks like you haven’t added anything yet. Start exploring and add
              your favorite products.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const products = cart.data.products || [];
  const cartid = cart.cartId;

  if (!products.length) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-zinc-100 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[32px] border border-zinc-200/70 bg-white/90 p-10 text-center shadow-[0_20px_70px_rgba(0,0,0,0.08)] backdrop-blur">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-3xl">
              🛒
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
              Your cart is empty
            </h1>

            <p className="mt-3 text-base leading-7 text-zinc-500">
              Looks like you haven’t added anything yet. Start exploring and add
              your favorite products.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 px-4 py-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-[32px] border border-zinc-200/80 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.06)]">
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 px-6 py-8 text-white md:px-8">
            <p className="text-sm font-medium text-zinc-300">Home / Cart</p>

            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                  Shopping Cart
                </h1>
                <p className="mt-2 text-sm text-zinc-300 md:text-base">
                  You have{" "}
                  <span className="font-semibold text-white">
                    {cart.numOfCartItems}
                  </span>{" "}
                  item{cart.numOfCartItems > 1 ? "s" : ""} in your cart
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm text-zinc-300">Total Price</p>
                  <p className="text-2xl font-bold text-white">
                    {cart.data.totalCartPrice} EGP
                  </p>
                </div>

                <div className="[&>button]:rounded-2xl [&>button]:border [&>button]:border-white/20 [&>button]:bg-white/10 [&>button]:px-5 [&>button]:py-3 [&>button]:text-sm [&>button]:font-semibold [&>button]:text-white [&>button]:transition hover:[&>button]:bg-white/20">
                  <HandleButtonClear />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            {products.map((item) => {
              const subtotal = item.price * item.count;

              return (
                <div
                  key={item._id}
                  className="group rounded-[30px] border border-zinc-200/80 bg-white p-4 shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[24px] bg-zinc-100 sm:h-32 sm:w-32">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        sizes="128px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <h2 className="line-clamp-2 text-lg font-bold leading-7 text-zinc-900 md:text-xl">
                            {item.product.title}
                          </h2>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.product.brand?.name && (
                              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
                                {item.product.brand.name}
                              </span>
                            )}

                            {item.product.category?.name && (
                              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
                                {item.product.category.name}
                              </span>
                            )}
                          </div>

                          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                            <span className="rounded-xl bg-emerald-50 px-3 py-2 font-medium text-emerald-700">
                              Unit Price: {item.price} EGP
                            </span>
                            <span className="rounded-xl bg-blue-50 px-3 py-2 font-medium text-blue-700">
                              Quantity: {item.count}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 rounded-2xl bg-zinc-50 px-4 py-3 text-left md:min-w-[140px] md:text-right">
                          <p className="text-xs uppercase tracking-wide text-zinc-500">
                            Subtotal
                          </p>
                          <p className="mt-1 text-2xl font-bold text-zinc-900">
                            {subtotal} EGP
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-4 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="inline-flex w-fit items-center rounded-2xl border border-zinc-200 bg-zinc-50 p-1.5 shadow-sm">
                          <UpdateCount id={item.product._id} newcount={item.count - 1} />
                          <span className="flex min-w-[48px] items-center justify-center text-base font-bold text-zinc-900">
                            {item.count}
                          </span>
                          <UpdateCount
                            Isincrement
                            id={item.product._id}
                            newcount={item.count + 1}
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            href={`/productdetails/${item.product._id}`}
                            className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
                          >
                            View Product
                          </Link>

                          <HandleButtonDelete id={item.product.id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-[30px] border border-zinc-200/80 bg-zinc-950 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] lg:sticky lg:top-6">
            <div className="border-b border-white/10 pb-5">
              <h3 className="text-2xl font-bold">Order Summary</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Review your order details before checkout
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Items</span>
                <span className="font-semibold text-white">
                  {cart.numOfCartItems}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Shipping</span>
                <span className="font-semibold text-emerald-400">Free</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Discount</span>
                <span className="font-semibold text-white">0 EGP</span>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                <span className="text-zinc-400">Estimated Tax</span>
                <span className="font-semibold text-white">Included</span>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
              <p className="text-sm text-zinc-400">Grand Total</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                {cart.data.totalCartPrice} EGP
              </p>
            </div>

            <Link href={`/cart/${cartid}`}>
              <button className="mt-6 w-full rounded-2xl bg-white px-5 py-4 text-sm font-bold text-zinc-900 transition hover:-translate-y-0.5 hover:bg-zinc-200">
                Proceed to Checkout
              </button>
            </Link>

            <Link
              href="/"
              className="mt-3 block w-full rounded-2xl border border-white/15 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Continue Shopping
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-zinc-500">
              Secure checkout experience with a clean and modern layout
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}