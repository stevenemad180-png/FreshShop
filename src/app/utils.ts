import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

type AppJwt = {
  id?: string;
  usertoken?: string;
};

export async function decodetoken(): Promise<string | undefined> {
  const cookieStore = await cookies();

  const secureAuthjsToken = cookieStore.get("__Secure-authjs.session-token")?.value;
  const authjsToken = cookieStore.get("authjs.session-token")?.value;
  const secureNextAuthToken = cookieStore.get("__Secure-next-auth.session-token")?.value;
  const nextAuthToken = cookieStore.get("next-auth.session-token")?.value;

  const sessionToken =
    secureAuthjsToken ||
    authjsToken ||
    secureNextAuthToken ||
    nextAuthToken;

  const salt = secureAuthjsToken
    ? "__Secure-authjs.session-token"
    : authjsToken
    ? "authjs.session-token"
    : secureNextAuthToken
    ? "__Secure-next-auth.session-token"
    : nextAuthToken
    ? "next-auth.session-token"
    : undefined;

  if (!sessionToken || !salt) {
    return undefined;
  }

  const jwtdecode = await decode<AppJwt>({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
    salt,
  });

  return typeof jwtdecode?.usertoken === "string"
    ? jwtdecode.usertoken
    : undefined;
}