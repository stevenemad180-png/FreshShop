import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", process.env.NEXTAUTH_URL)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/card"] 
};