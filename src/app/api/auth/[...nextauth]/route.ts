import NextAuth from "next-auth"
import { authConfig } from "@/config/nextconfig"

export const {
  handlers: { GET, POST },
} = NextAuth(authConfig)