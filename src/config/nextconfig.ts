import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  id: string;
};

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "fresh",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const finalres = await res.json();
          console.log("signin response", finalres);

          if (!res.ok || !finalres?.token || !finalres?.user) {
            return null;
          }

          const decoded = jwtDecode<DecodedToken>(finalres.token);

          return {
            id: decoded.id,
            name: finalres.user.name,
            email: finalres.user.email,
            usertoken: finalres.token,
          };
        } catch (error) {
          console.error("authorize error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.usertoken = (user as { usertoken?: string }).usertoken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      (session as typeof session & { usertoken?: string }).usertoken =
        token.usertoken as string | undefined;

      return session;
    },
  },

  // 
  pages: {
    signIn: "/login",
  },

  debug: true,
};