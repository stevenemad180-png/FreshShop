'use server'

import { usecart } from '@/_provider/Providercart'
import { cashorder } from '@/api/Types'
import { decodetoken } from '@/app/utils'
import { revalidatePath } from 'next/cache'

export async function Addproduct(id: string) {
  const usertoken = await decodetoken()

  const bodyobj = { productId: id }

  const res = await fetch('https://ecommerce.routemisr.com/api/v2/cart', {
    method: 'POST',
    headers: {
      token: usertoken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyobj),
  })

  const finalres = await res.json()
  console.log(finalres)

  if (!res.ok) {
    throw new Error(finalres?.message || 'Failed to add product')
  }

  return finalres
}

export async function Handledelete(id: string) {
  const tokenuser = await decodetoken()
console.log('iddd',id)
  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
    method: 'DELETE',
    headers: {
      token: tokenuser,
      
    },
  })

  const data = await res.json()
  console.log('delete', data)

  
  if (res.ok)
    console.log('delete resss', data)
  revalidatePath('/cart')
  {

  }
  if (!res.ok) {
    throw new Error(data?.message || 'Failed to delete product')
  }
return data

}
 export async function HandleClear() {
  const tokenuser = await decodetoken()
  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: 'DELETE',
    headers: {
      token: tokenuser,
      
    },
  })

  const data = await res.json()
   if (res.ok) {
     console.log('delete resss', res)
     revalidatePath('/cart')
   }


  if (!res.ok) {
    throw new Error(data?.message || 'Failed to delete cart')
  }
return data

}

 export async function HandleUpdate (id:string,newcount:number) {
  const tokenuser = await decodetoken()
  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ count:newcount}),
    headers: {
      token: tokenuser,
      'Content-Type': 'application/json',
      
    },
  })

  const data = await res.json()
   if (res.ok) {
     console.log('update resss', res)
     revalidatePath('/cart')
     
     return data
   }


  if (!res.ok) {
    throw new Error(data?.message || 'Failed to delete cart')
    return null
  }

} 
export async function HandleCash(id: string, body: cashorder) {
  if (!id || typeof id !== 'string') {
    throw new Error(`invalid ID ${id}`)
  }

  const tokenuser = await decodetoken()

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${id}`, {
    method: 'POST',
    headers: {
      token: tokenuser,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to create cash order')
  }

  return data
}



////////////////////////////Wishlist////////////////////////////////////////////////////////////
export async function AddWishlist(id: string) {
  if (!id) throw new Error('Product ID is required')

  const tokenuser = await decodetoken()

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/`, {
    method: 'POST',
    headers: {
      token: tokenuser,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: id }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to add to wishlist')
  }

  console.log('wishlist response', data)
  return data
}

export async function HandledeleteWishlist(id: string) {
  const tokenuser = await decodetoken()
  if (!tokenuser) throw new Error('User not authenticated')
  

  console.log('Deleting wishlist item id:', id)

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
    method: 'DELETE',
    headers: {
      token: tokenuser,
    },
  })

  const data = await res.json()
  console.log('Wishlist delete response:', data)


  revalidatePath('/wishlist')
  if (res.ok) {


    return data
  } else {
    throw new Error(data?.message || 'Failed to delete wishlist item')
  }
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
  if (!cartId) throw new Error("Cart ID is required");
  const tokenuser = await decodetoken()
  if (!tokenuser) throw new Error('User not authenticated')
  
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        headers: {
          token: tokenuser,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObject),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to create online order");
    }

    console.log("Online order created:", data);
    return data;
  } catch (error) {
    console.error("Error in createOnlineOrderAction:", error);
    throw error;
  }
}