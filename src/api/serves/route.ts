import { decodetoken } from "@/app/utils"
import { CartResponse, CategoryType, ProductType, wishlistRepone } from "../Types"
import { revalidatePath } from "next/cache"

export async function getallproduct(): Promise<ProductType[] | undefined> {
   
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
                cache:"reload"

       
      })
      
        const finalresult = await res.json()
        
        // console.log(finalresult.data) 
     
        return finalresult.data
    } catch (error) {
        console.log(error)
  }
  
}


export async function GetDetailsSingleProduct(id: string)  {
     try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        const finalresult = await res.json()
     
        // console.log(finalresult.data)
     
        return finalresult.data
    } catch (error) {
       console.log(error)
       return undefined
    }
}
  

export async function CategoriesItems(): Promise<CategoryType[] | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );

    const finalresult = await res.json();

    // console.log(finalresult.data);

    return finalresult.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
export async function GETCART(): Promise< CartResponse | undefined> {
  try {
    const usertoken = await decodetoken()
    if (usertoken) {

      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart`
        , { headers: { token: usertoken } }
      );

      const finalresult = await res.json();
    

      console.log('cart', finalresult);

      return finalresult;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}



export async function GETWISHLIST() {
  try {
    const usertoken = await decodetoken()
    if (usertoken) {

      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist`
        , { headers: { token: usertoken } }
      );

      const finalresult = await res.json();
    

      console.log('cart', finalresult);

      return finalresult;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

 

export async function getallbrands() {
   
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
                cache:"reload"

       
      })
      
        const finalresult = await res.json()
        
        // console.log(finalresult.data) 
     
        return finalresult.data
    } catch (error) {
        console.log(error)
  }
  
}

export async function Getspecificbrand(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    const finalresult = await res.json()
     
    console.log(finalresult.data)
     
    return finalresult.data
       
  } catch (error) {
    console.log(error)
    return undefined
  }
}



export async function getallCategories() {
   
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, {
        cache:"force-cache"
       
      })
      
        const finalresult = await res.json()
        
        // console.log(finalresult.data) 
     
        return finalresult.data
    } catch (error) {
        console.log(error)
  }
  
}


export async function GetspecificCategories(id: string) {
  try {
    const usertoken = await decodetoken();

    if (!usertoken) {
      console.error("User token missing");
      return null;
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
      headers: { token: usertoken },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("API error:", errorData?.message || res.statusText);
      return null;
    }

    const finalresult = await res.json();
    console.log("GetspecificCategories:", finalresult.data);

    return finalresult.data;
  } catch (error) {
    console.error("GetspecificCategories error:", error);
    return null;
  }
}