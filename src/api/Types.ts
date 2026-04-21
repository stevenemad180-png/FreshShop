import { Carter_One } from "next/font/google";

export interface ProductType {
  sold: number | null;
  images: string[];
  subcategory: SubcategoryType[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: CategoryType;
  brand: BrandType;
  ratingsAverage: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  reviews?: ReviewType[];
  id: string;
}

export interface SubcategoryType {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}


export interface BrandType {
  _id: string
  name: string
  slug: string
  image: string
  createdAt?: string
  updatedAt?: string
}



export interface ReviewUserType {
  _id: string;
  name: string;
}

export interface ReviewType {
  _id: string;
  review?: string;
  rating: number;
  product: string;
  user: ReviewUserType;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface productprops {
  product: ProductType;
}
////cart
// cart.data?.products?._id
export interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartProduct {
  count: number;
  _id: string;
  product: ProductType;
  price: number;
}


export interface cashorder{
  
    shippingAddress: {
      details: string;
      phone: string;
      city: string;
      postalCode ?: string;
    }
  
}
export interface WishlistResponse {
  status: string
  count: number
  data: ProductType[]
}

