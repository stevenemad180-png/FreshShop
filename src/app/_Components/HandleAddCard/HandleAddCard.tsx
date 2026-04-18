"use client";

import { ReactNode, useState } from "react";
import { Addproduct } from "../CartAction/CartAction";
import { usecart } from "@/_provider/Providercart";
import { toast } from "sonner";
import { Loader2, ShoppingCart } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (status !== "authenticated") {
      toast.info("Please login or register first");

      signIn(undefined, {
        callbackUrl: window.location.href,
      });

      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);

      const res = await Addproduct(id);

      if (res) {
        setnumberofcart(res.numOfCartItems);
        toast.success("Added to cart ✅");
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
      className={`${className} disabled:opacity-70`}
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