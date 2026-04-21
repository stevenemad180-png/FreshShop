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

export default function HandleAddWishlist({
  id,
  children,
  className = "",
}: Props) {
  const { setnumberofWhishlist } = usecart();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (status === "loading" || isLoading) return;

    if (status !== "authenticated") {
      toast.info("Please login first");
      signIn(undefined, { callbackUrl: window.location.href });
      return;
    }

    try {
      setIsLoading(true);

      const res = await AddWishlist(id);

      if (res) {
        setnumberofWhishlist(res.data?.length ?? 0);
        toast.success("Added to wishlist ✅");
      }
    } catch (error: any) {
      console.error(error);

      const message = error?.message || "Something went wrong ❌";

      if (
        message === "Please login first" ||
        message === "Session expired, please login again" ||
        message === "Invalid Token. please login again"
      ) {
        toast.error("Session expired, please login again");
        signIn(undefined, { callbackUrl: window.location.href });
        return;
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      aria-label="Add to wishlist"
      title="Add to wishlist"
      className={`
        ${className}
        flex h-10 w-10 items-center justify-center rounded-full
        border border-slate-200 bg-white/95 text-slate-600
        shadow-md backdrop-blur transition-all duration-300
        hover:-translate-y-1 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500
        disabled:cursor-not-allowed disabled:opacity-70
      `}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : children ? (
        children
      ) : (
        <Heart className="h-5 w-5 fill-current" />
      )}
    </button>
  );
}