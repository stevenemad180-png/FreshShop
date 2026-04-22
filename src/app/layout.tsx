import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Mynav from "./_Components/Navbar/Navbar";
import Top_nav from "./_Components/top_nav/Top_nav";
import { Toaster } from "@/components/ui/sonner"
import SessionProviderwell from "./_Components/sessionprovider/SessionProviderwell";
import Providercart from "@/_provider/Providercart";
import { GETCART, GETWISHLIST } from "@/api/serves/route";
import { CartResponse, WishlistResponse } from "@/api/Types";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreshCart",
  description: "Modern Grocery Store",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cart = await GETCART();
  const wishlist = await GETWISHLIST();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providercart res={cart} wishlist={wishlist}>
          <SessionProviderwell>
            <Top_nav />
            <Mynav />
            <Toaster richColors position="top-center" />
            {children}
          </SessionProviderwell>
        </Providercart>
      </body>
    </html>
  );
}