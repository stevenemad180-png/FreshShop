"use client";

import { ReactNode, useState } from "react";
import { Addproduct } from "../CartAction/CartAction";
import { usecart } from "@/_provider/Providercart";
import { toast } from "sonner";
import { Loader2, ShoppingCart } from "lucide-react";
import { useSession, signIn } from "next-auth/react";

type Props = {
  id: string;
  children?: ReactNode;
  className?: string;
};

export default function HandleAddCard({
  id,
  children,
  className = "",
}: Props) {
  const { setnumberofcart } = usecart();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (status === "loading" || isLoading) return;

    if (status !== "authenticated") {
      toast.info("Please login or register first");
      signIn(undefined, { callbackUrl: window.location.href });
      return;
    }

    try {
      setIsLoading(true);

      const res = await Addproduct(id);

      if (res) {
        setnumberofcart(res.numOfCartItems);
        toast.success("Added to cart ✅");
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
      className={`${className} disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          <span>Adding...</span>
        </>
      ) : children ? (
        children
      ) : (
        <>
          <ShoppingCart size={18} />
          <span>Add</span>
        </>
      )}
    </button>
  );
}