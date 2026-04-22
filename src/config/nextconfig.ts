import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from 'jwt-decode'

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
          const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          })

          const finalres = await res.json()
          console.log("signin response", finalres)

          if (!res.ok || finalres.message !== 'success') {
            return null
          }

          const { name, email } = finalres.user
          const data: { id: string } = jwtDecode(finalres.token)

          return {
            name,
            email,
            id: data.id,
            tokennext: finalres.token,
          }

        } catch (error) {
          console.error('Auth fetch error:', error)
          return null
        }
      },
    }),
  ],

  callbacks: {
    jwt: function (param) {
      if (param.user) {
        console.log('jwparambefore', param)
        param.token.usertoken = param.user.tokennext
        param.token.id = param.user.id
        console.log('jwparam', param)
      }
      return param.token
    },

    session: function (param) {
      console.log('param session before', param)
      param.session.user.id = param.token.id
      console.log('param session', param)
      return param.session
    },
  },

  pages: {
    signIn: "/login",
  },
}
// 