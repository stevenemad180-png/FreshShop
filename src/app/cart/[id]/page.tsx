"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { createOnlineOrderAction, HandleCash } from "@/app/_Components/CartAction/CartAction";
import { usecart } from "@/_provider/Providercart";

export default function CheckoutComponent() {
  const { setnumberofcart } = usecart();
  const router = useRouter();
  const params = useParams();

  const cartIdParam = params.id;
  const cartId =
    typeof cartIdParam === "string"
      ? cartIdParam
      : Array.isArray(cartIdParam)
      ? cartIdParam[0]
      : undefined;

  const [form, setForm] = useState({
    details: "",
    phone: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "visa">("cash");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!cartId) {
      toast.error("Cart id not found ❌");
      return;
    }

    if (!form.details || !form.phone || !form.city) {
      toast.error("Please fill all required fields ❌");
      return;
    }

    setIsLoading(true);

    try {
      if (paymentMethod === "visa") {
        const session = await createOnlineOrderAction(cartId, {
          shippingAddress: form,
        });

        toast.success("Redirecting to payment ✅");
        window.location.href = session.session.url;
      } else {
        await HandleCash(cartId, { shippingAddress: form });
        toast.success("Order placed successfully ✅");
        setnumberofcart(0);
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setIsLoading(false);
    }
  }
//
  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 p-6 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-2xl font-bold mb-2">Shipping Address</h1>
        <p className="text-sm text-slate-500 mb-6">Enter your delivery details</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["details", "phone", "city", "postalCode"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field as keyof typeof form]}
              onChange={handleChange}
              placeholder={
                field === "postalCode"
                  ? "Postal code (optional)"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-400 transition"
            />
          ))}

          <div className="flex gap-4 mt-4">
            {[
              { id: "cash", label: "Cash 💵" },
              { id: "visa", label: "Visa 💳" },
            ].map((option) => (
              <div
                key={option.id}
                className={`flex-1 text-center py-3 rounded-xl cursor-pointer border ${
                  paymentMethod === option.id
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white border-slate-300"
                }`}
                onClick={() => setPaymentMethod(option.id as "cash" | "visa")}
              >
                {option.label}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-4 bg-emerald-600 text-white font-semibold rounded-xl disabled:opacity-70 transition hover:bg-emerald-700"
          >
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </section>
  );
}