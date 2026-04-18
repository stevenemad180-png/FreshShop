"use client";

import { ReactNode, useState } from "react";
import { AddWishlist } from "../_Components/CartAction/CartAction";
import { usecart } from "@/_provider/Providercart";
import { toast } from "sonner";
import { Loader2, Heart } from "lucide-react";
import { useSession, signIn } from "next-auth/react";

type Props = {
  id: string;
  children?: ReactNode;
  className?: string;
};

export default function HandleAddWishlist({ id, children, className = "" }: Props) {
  const { numberofWhishlist, setnumberofWhishlist } = usecart();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (status !== "authenticated") {
      toast.info("Please login or register first");
      signIn(undefined, { callbackUrl: window.location.href });
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await AddWishlist(id);
        if (res) {
            console.log('Added to wishlist ✅  ',res)
            setnumberofWhishlist(res.data.length)
            toast.success("Added to wishlist ✅");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        ${className} 
        flex h-10 w-10 items-center justify-center rounded-full 
        border border-slate-200 bg-white/95 text-slate-600 
        shadow-md backdrop-blur transition-transform duration-300
        hover:scale-110 hover:text-rose-500 
        disabled:opacity-70 disabled:cursor-not-allowed
      `}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : children ? (
        children
      ) : (
        <Heart size={18} />
      )}
    </button>
  );
}