'use server'

import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

export async function decodetoken(): Promise<string> {
  const cookieStore = await cookies()

  const nextauthToken =
    cookieStore.get('authjs.session-token')?.value ||
    cookieStore.get('__Secure-authjs.session-token')?.value

  if (!nextauthToken) {
    throw new Error('No auth token found')
  }

  const jwtdecode = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: nextauthToken,
    salt: 'authjs.session-token',
  })

  if (!jwtdecode?.usertoken) {
    throw new Error('Invalid token payload')
  }

  return jwtdecode.usertoken as string
}