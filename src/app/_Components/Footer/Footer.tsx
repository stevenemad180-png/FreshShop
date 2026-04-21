'use client'

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-[1600px] px-6 py-12 md:px-10 xl:px-16">

        {/* Top */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
              Fresh<span className="text-emerald-600">Cart</span>
            </h2>
            <p className="text-sm text-slate-500 leading-6">
              Your modern grocery store. Fresh products, fast delivery, and premium quality everyday.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-neumorph hover:shadow-inner transition hover:scale-105 cursor-pointer"
                >
                  <Icon size={18} className="text-slate-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
              <li><Link href="/shop" className="hover:text-emerald-600">Shop</Link></li>
              <li><Link href="/categories" className="hover:text-emerald-600">Categories</Link></li>
              <li><Link href="/brands" className="hover:text-emerald-600">Brands</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Help</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-emerald-600">FAQ</Link></li>
              <li><Link href="#" className="hover:text-emerald-600">Shipping</Link></li>
              <li><Link href="#" className="hover:text-emerald-600">Returns</Link></li>
              <li><Link href="#" className="hover:text-emerald-600">Support</Link></li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Contact</h3>

            <div className="space-y-3 text-sm text-slate-600 mb-5">
              <div className="flex items-center gap-2">
                <Phone size={16} /> +20 100 123 4567
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} /> support@freshcart.com
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> Cairo, Egypt
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">
                Subscribe to Newsletter
              </p>
              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-neumorph">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-[1px] bg-slate-200" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Steven Emad. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-emerald-600">Privacy</Link>
            <Link href="#" className="hover:text-emerald-600">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}