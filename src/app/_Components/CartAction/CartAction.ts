"use server";

import { cashorder } from "@/api/Types";
import { decodetoken } from "@/app/utils";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

type ApiError = {
  message?: string;
};

async function getAuthToken() {
  const tokenuser = await decodetoken();

  if (!tokenuser) {
    throw new Error("Please login first");
  }

  return tokenuser;
}

async function getBaseUrl() {
  const headerList = await headers();

  const forwardedProto = headerList.get("x-forwarded-proto");
  const forwardedHost = headerList.get("x-forwarded-host");
  const host = forwardedHost || headerList.get("host");

  if (host) {
    return `${forwardedProto || "http"}://${host}`;
  }

  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

async function parseJsonSafe<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function getErrorMessage(
  res: Response,
  data: ApiError | null,
  fallback: string
) {
  if (
    res.status === 401 ||
    data?.message === "Invalid Token. please login again"
  ) {
    return "Session expired, please login again";
  }

  return data?.message || fallback;
}

export async function Addproduct(id: string) {
  if (!id) {
    throw new Error("Product ID is required");
  }

  const usertoken = await getAuthToken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "POST",
    headers: {
      token: usertoken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
    cache: "no-store",
  });

  const finalres = await parseJsonSafe<ApiError & { numOfCartItems?: number }>(res);

  if (!res.ok) {
    throw new Error(getErrorMessage(res, finalres, "Failed to add product"));
  }

  revalidatePath("/cart");
  return finalres;
}

export async function Handledelete(id: string) {
  if (!id) {
    throw new Error("Product ID is required");
  }

  const tokenuser = await getAuthToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
    method: "DELETE",
    headers: {
      token: tokenuser,
    },
    cache: "no-store",
  });

  const data = await parseJsonSafe<ApiError>(res);

  if (!res.ok) {
    throw new Error(getErrorMessage(res, data, "Failed to delete product"));
  }

  revalidatePath("/cart");
  return data;
}

export async function HandleClear() {
  const tokenuser = await getAuthToken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "DELETE",
    headers: {
      token: tokenuser,
    },
    cache: "no-store",
  });

  const data = await parseJsonSafe<ApiError>(res);

  if (!res.ok) {
    throw new Error(getErrorMessage(res, data, "Failed to clear cart"));
  }

  revalidatePath("/cart");
  return data;
}

export async function HandleUpdate(id: string, newcount: number) {
  if (!id) {
    throw new Error("Product ID is required");
  }

  if (newcount < 1) {
    throw new Error("Quantity must be at least 1");
  }

  const tokenuser = await getAuthToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
    method: "PUT",
    headers: {
      token: tokenuser,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count: newcount }),
    cache: "no-store",
  });

  const data = await parseJsonSafe<ApiError>(res);

  if (!res.ok) {
    throw new Error(getErrorMessage(res, data, "Failed to update cart"));
  }

  revalidatePath("/cart");
  return data;
}

export async function HandleCash(id: string, body: cashorder) {
  if (!id || typeof id !== "string") {
    throw new Error(`Invalid cart ID: ${id}`);
  }

  const tokenuser = await getAuthToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${id}`, {
    method: "POST",
    headers: {
      token: tokenuser,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await parseJsonSafe<ApiError>(res);

  if (!res.ok) {
    throw new Error(getErrorMessage(res, data, "Failed to create cash order"));
  }

  revalidatePath("/cart");
  revalidatePath("/allorders");
  return data;
}

export async function AddWishlist(id: string) {
  if (!id) {
    throw new Error("Product ID is required");
  }

  const tokenuser = await getAuthToken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      token: tokenuser,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
    cache: "no-store",
  });

  const data = await parseJsonSafe<ApiError & { data?: unknown[] }>(res);

  if (!res.ok) {
    throw new Error(getErrorMessage(res, data, "Failed to add to wishlist"));
  }

  revalidatePath("/wishlist");
  return data;
}

export async function HandledeleteWishlist(id: string) {
  if (!id) {
    throw new Error("Wishlist item ID is required");
  }

  const tokenuser = await getAuthToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
    method: "DELETE",
    headers: {
      token: tokenuser,
    },
    cache: "no-store",
  });

  const data = await parseJsonSafe<ApiError>(res);

  if (!res.ok) {
    throw new Error(
      getErrorMessage(res, data, "Failed to delete wishlist item")
    );
  }

  revalidatePath("/wishlist");
  return data;
}

export type OrderPlaceType = {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
    postalCode?: string;
  };
};

export async function createOnlineOrderAction(
  cartId: string,
  bodyObject: OrderPlaceType
) {
  if (!cartId) {
    throw new Error("Cart ID is required");
  }

  const tokenuser = await getAuthToken();
  const baseUrl = await getBaseUrl();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(
      baseUrl
    )}`,
    {
      method: "POST",
      headers: {
        token: tokenuser,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
      cache: "no-store",
    }
  );

  const data = await parseJsonSafe<ApiError & {
    status?: string;
    session?: {
      url?: string;
      success_url?: string;
      cancel_url?: string;
    };
  }>(res);

  if (!res.ok) {
    throw new Error(
      getErrorMessage(res, data, "Failed to create online order")
    );
  }

  revalidatePath("/cart");
  revalidatePath("/allorders");
  return data;
}