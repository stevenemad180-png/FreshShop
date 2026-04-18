'use client'

import Link from "next/link";
import React from "react";

interface DealCardProps {
  label: string;       // Deal of the Day / New Arrivals
  title: string;       // Fresh Organic Fruits / Exotic Vegetables
  description: string; // Short description
  discount?: string;   // 40% OFF
  code?: string;       // ORGANIC40
  gradientFrom: string; // Hex color
  gradientTo: string;   // Hex color
  btnText: string;      // Shop Now / Explore Now
  btnLink: string;      // URL
}

export default function DealCard({
  label,
  title,
  description,
  discount,
  code,
  gradientFrom,
  gradientTo,
  btnText,
  btnLink,
}: DealCardProps) {
  return (
    <div
      className="relative flex flex-col justify-between p-6 rounded-2xl shadow-xl text-white transition-transform hover:scale-[1.02] duration-300"
      style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
    >
      <div>
        <p className="text-xs font-semibold uppercase opacity-80 mb-2">{label}</p>
        <h3 className="text-2xl md:text-3xl font-bold leading-snug mb-2">{title}</h3>
        <p className="text-sm md:text-base mb-2">{description}</p>
        {discount && code && (
          <p className="text-sm">
            <span className="font-bold">{discount}</span> | Use code: <span className="font-mono">{code}</span>
          </p>
        )}
      </div>

      <Link
        href={btnLink}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-800 shadow-neumorph hover:shadow-inner transition-transform hover:scale-105"
      >
        {btnText} <span className="text-emerald-600">&rarr;</span>
      </Link>
    </div>
  );
}