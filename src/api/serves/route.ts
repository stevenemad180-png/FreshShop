import { decodetoken } from "@/app/utils"
import {
  CartResponse,
  CategoryType,
  ProductType,
  WishlistResponse,
  BrandType,
} from "../Types"
import { revalidatePath } from "next/cache"

const BASE_URL = "https://ecommerce.routemisr.com/api/v1"
const BASE_URL_V2 = "https://ecommerce.routemisr.com/api/v2"

export async function getallproduct(): Promise<ProductType[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return []
    }

    const finalresult = await res.json()
    return finalresult?.data ?? []
  } catch (error) {
    console.log("getallproduct error:", error)
    return []
  }
}

export async function GetDetailsSingleProduct(
  id: string
): Promise<ProductType | null> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const finalresult = await res.json()
    return finalresult?.data ?? null
  } catch (error) {
    console.log("GetDetailsSingleProduct error:", error)
    return null
  }
}

export async function CategoriesItems(): Promise<CategoryType[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return []
    }

    const finalresult = await res.json()
    return finalresult?.data ?? []
  } catch (error) {
    console.log("CategoriesItems error:", error)
    return []
  }
}

export async function GETCART(): Promise<CartResponse | null> {
  try {
    const usertoken = await decodetoken()

    if (!usertoken) {
      return null
    }

    const res = await fetch(`${BASE_URL_V2}/cart`, {
      headers: { token: usertoken },
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const finalresult: CartResponse = await res.json()
    return finalresult
  } catch (error) {
    console.log("GETCART error:", error)
    return null
  }
}

export async function GETWISHLIST(): Promise<WishlistResponse | null> {
  try {
    const usertoken = await decodetoken()

    if (!usertoken) {
      return null
    }

    const res = await fetch(`${BASE_URL}/wishlist`, {
      headers: { token: usertoken },
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const finalresult: WishlistResponse = await res.json()
    return finalresult
  } catch (error) {
    console.log("GETWISHLIST error:", error)
    return null
  }
}

export async function getallbrands(): Promise<BrandType[]> {
  try {
    const res = await fetch(`${BASE_URL}/brands`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    return data?.data ?? []
  } catch (error) {
    console.error("getallbrands error:", error)
    return []
  }
}

export async function Getspecificbrand(id: string): Promise<BrandType | null> {
  try {
    const res = await fetch(`${BASE_URL}/brands/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const finalresult = await res.json()
    return finalresult?.data ?? null
  } catch (error) {
    console.log("Getspecificbrand error:", error)
    return null
  }
}

export async function getallCategories(): Promise<CategoryType[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return []
    }

    const finalresult = await res.json()
    return finalresult?.data ?? []
  } catch (error) {
    console.log("getallCategories error:", error)
    return []
  }
}

export async function GetspecificCategories(
  id: string
): Promise<CategoryType | null> {
  try {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const finalresult = await res.json()
    return finalresult?.data ?? null
  } catch (error) {
    console.error("GetspecificCategories error:", error)
    return null
  }
}