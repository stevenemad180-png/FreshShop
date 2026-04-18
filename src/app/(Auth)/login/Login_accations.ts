// "use server"
// import { cookies } from 'next/headers';
// import { LoginFormData } from './type_login';
// export async function Myregister( data: LoginFormData )
// {
//   try {
//     const res = await fetch(
//       "https://ecommerce.routemisr.com/api/v1/auth/signin",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );
//     const finalres = await res.json();
    
//     console.log("API response:", finalres);
    
//     if (res.ok) {
//       const cookie = await cookies()
//       cookie.set('tkn', finalres.token,
//         {
//           httpOnly: true,
//           sameSite: "lax",
//           maxAge:60*60*24,
          
//         }
//       )
//       return true

      
      
//     }
    
    
    
//   } catch (error) {
//     console.log("Network error:", error);
//     return false
//   }
// }