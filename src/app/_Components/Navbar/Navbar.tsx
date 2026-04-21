'use client'

import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import {
  Menu, X, Search, Heart, ShoppingCart, User, ChevronDown, LogOut, LayoutGrid, Store, House
} from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { usecart } from "@/_provider/Providercart"

const navLinks = [
  { name: "Home", href: "/", icon: <House size={18} /> },
  { name: "Shop", href: "/allorders", icon: <Store size={18} /> },
  { name: "Brands", href: "/brands", icon: <LayoutGrid size={18} /> },
  { name: "Categories", href: "/categories", icon: <ChevronDown size={18} /> },
]

export default function NavbarFull() {
const{numberofcart, numberofWhishlist}=usecart()
  const { status, data,update } = useSession()
  const isUserAuthenticated = status === "authenticated"
  const username = data?.user?.name || "User"

  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [mobileOpen])

  if (status === "loading") return null

  return (
    <>
      {/* Desktop Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-xl border-b border-gray-200">
        <nav className="mx-auto max-w-[1600px] flex items-center justify-between px-4 py-3 md:px-8 lg:px-16 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-neumorph hover:scale-110 transition-transform duration-300">
              <ShoppingCart size={20} />
            </div>
            <div className="leading-tight">
              <span className="block font-extrabold text-xl text-slate-900 font-poppins tracking-tight">FreshCart</span>
              <span className="hidden text-sm text-gray-400 sm:block">Modern Grocery Store</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700 font-poppins">
            {navLinks.map(link => (
              <Link key={link.name} href={link.href} className="flex items-center gap-1 hover:text-emerald-600 transition-all duration-300 hover:scale-105">
                {link.icon} <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 relative">

            {/* Wishlist */}
            <Link href="/wishlist" className="flex relative z-50">
              <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-neumorph hover:shadow-inner transition-transform hover:scale-105">
                <Heart size={20} className="text-rose-500" />
                <span className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center rounded-full bg-emerald-600 text-[12px] text-white font-bold animate-pulse">{numberofWhishlist ?? 0}</span>
              </button>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="flex relative z-50">
              <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-neumorph hover:shadow-inner transition-transform hover:scale-105">
                <ShoppingCart size={20} className="text-emerald-600" />
                <span className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center rounded-full bg-emerald-600 text-[12px] text-white font-bold animate-pulse">{numberofcart ?? 0}</span>
              </button>
            </Link>

            {/* User Menu */}
            {isUserAuthenticated ? (
              <div className="relative hidden md:block z-50">
                <button onClick={() => setUserMenuOpen(prev => !prev)} className="flex items-center gap-3 rounded-full bg-white shadow-neumorph px-4 py-2 hover:shadow-inner transition-transform hover:scale-105">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold">{username.charAt(0).toUpperCase()}</div>
                  <span className="font-semibold text-gray-800">{username}</span>
                  <ChevronDown size={16} className={`${userMenuOpen ? "rotate-180" : ""} transition-transform duration-300`} />
                </button>
                <div className={`absolute right-0 top-full mt-2 w-52 bg-white shadow-xl rounded-xl border border-gray-200 p-3 transition-all duration-300 ${userMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 invisible"}`}>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 font-semibold">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => signIn()} className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-600 text-white font-semibold shadow-neumorph hover:shadow-inner transition-transform hover:scale-105">
                <User size={16} /> Sign In
              </button>
            )}

            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(true)} className="md:hidden h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-neumorph hover:shadow-inner transition-transform hover:scale-105 z-50">
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 ${mobileOpen ? "visible" : "invisible"}`}>
        <div onClick={() => setMobileOpen(false)} className={`absolute inset-0 bg-black/25 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`} />
        <aside className={`absolute top-0 left-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} relative`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-bold text-lg font-poppins flex items-center gap-2">
              <Menu size={20} /> Menu
            </h2>
            <button onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-gray-900"><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {navLinks.map(link => (
              <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 font-poppins font-semibold">
                {link.icon} {link.name}
              </Link>
            ))}
            <hr className="my-2" />
            {isUserAuthenticated ? (
              <div className="space-y-2">
                <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl font-semibold shadow-neumorph hover:shadow-inner transition-transform hover:scale-[1.02]">
                  <User size={18} /> {username}
                </button>
                <button onClick={() => { signOut({ callbackUrl: "/" }); setMobileOpen(false) }} className="w-full px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-transform hover:scale-[1.02] shadow-neumorph">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <button onClick={() => { signIn(); setMobileOpen(false) }} className="w-full px-4 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-transform hover:scale-[1.02] shadow-neumorph">
                <User size={18} /> Sign In
              </button>
            )}
          </div>
        </aside>
      </div>
    </>
  )
}