'use client'
import React, { useState } from "react";
import { toast } from "sonner";
import { HandledeleteWishlist } from "../_Components/CartAction/CartAction";
import { usecart } from "@/_provider/Providercart";

export default function HandleButtonDeleteWishlist({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
const {numberofcart, setnumberofcart, numberofWhishlist, setnumberofWhishlist }=usecart()
  async function handleRemove() {
    if (isLoading) return;
    try {
      setIsLoading(true);
     const res= await HandledeleteWishlist(id);
        toast.success("Removed from wishlist ✅");
        console.log('deleteeeeee',res) 
setnumberofWhishlist((res as { count?: number }).count ?? 0)        
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item ❌");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button onClick={handleRemove} disabled={isLoading} className="flex-1 h-10 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600">
      {isLoading ? "Removing..." : "Remove"}
    </button>
  );
}