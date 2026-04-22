import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    tokennext?: string
    id?: string
  }

  interface Session {
    user: {
      id?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    usertoken?: string
    id?: string
  }
}