import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string
    tokennext?: string
  }

  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
    usertoken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    usertoken?: string
  }
}