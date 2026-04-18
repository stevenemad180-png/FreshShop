"use server"
import { RegisterFormData } from './type_register';
export async function Myregister( data: RegisterFormData )
{
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const finalres = await res.json();
    
    console.log("API response:", finalres);
    
    if (!res.ok) {
      console.log("Error:", finalres.message);
      
    }
    
    return finalres;
    
  } catch (error) {
    console.log("Network error:", error);
  }
}