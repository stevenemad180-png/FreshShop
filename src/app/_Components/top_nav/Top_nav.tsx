"use client";

import { Gift, Truck, Phone, Mail } from "lucide-react";

export default function Top_nav() {
  return (
    <div className="border-b border-slate-200/80 bg-gradient-to-r from-white via-slate-50 to-white text-slate-600">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-2.5 text-xs sm:text-sm md:flex-row md:items-center md:justify-between lg:px-10 xl:px-16">
        {/* Left */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 font-medium text-emerald-700">
            <Truck className="h-4 w-4" />
            <span>Free Shipping over 500 EGP</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 font-medium text-amber-700">
            <Gift className="h-4 w-4" />
            <span>New Arrivals Daily</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-3 text-slate-500 md:justify-end">
          <a
            href="tel:+1800123"
            className="inline-flex items-center gap-1.5 transition hover:text-emerald-600"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>+1 (800) 123</span>
          </a>

          <span className="hidden text-slate-300 sm:inline">|</span>

          <a
            href="mailto:support@freshcart.com"
            className="inline-flex items-center gap-1.5 transition hover:text-emerald-600"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">support@freshcart.com</span>
            <span className="sm:hidden">Support Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}