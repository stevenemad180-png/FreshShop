'use client'

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface SessionProviderwellProps {
  children: ReactNode
}

export default function SessionProviderwell({ children }: SessionProviderwellProps) {
  return <SessionProvider>{children}</SessionProvider>
}