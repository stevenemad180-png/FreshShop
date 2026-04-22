import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode"

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "fresh",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          )

          const finalres = await res.json()
          console.log("signin response", finalres)

          if (!res.ok || finalres.message !== "success") {
            return null
          }

          const { name, email } = finalres.user
          const data: { id: string } = jwtDecode(finalres.token)

          return {
            id: data.id,
            name,
            email,
            tokennext: finalres.token,
          }
        } catch (error) {
          console.error("Auth fetch error:", error)
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.usertoken = user.tokennext
        token.id = user.id
      }
      return token
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id
      }

      if (token.usertoken) {
        session.usertoken = token.usertoken
      }

      return session
    },
  },

  pages: {
    signIn: "/login",
  },
}