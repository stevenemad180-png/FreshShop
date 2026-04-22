'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react'
import { CartResponse, WishlistResponse } from '@/api/Types'

interface ProvidercartProps {
  children: ReactNode
  res: CartResponse | null
  wishlist: WishlistResponse | null
}

interface ContextCartType {
  numberofcart: number
  setnumberofcart: React.Dispatch<React.SetStateAction<number>>
  numberofWhishlist: number
  setnumberofWhishlist: React.Dispatch<React.SetStateAction<number>>
}

export const ContextCart = createContext<ContextCartType | undefined>(undefined)

export default function Providercart({ children, res, wishlist }: ProvidercartProps) {
  const [numberofcart, setnumberofcart] = useState<number>(
    () => res?.numOfCartItems ?? 0
  )

  const [numberofWhishlist, setnumberofWhishlist] = useState<number>(
    () => wishlist?.count ?? 0
  )

  return (
    <ContextCart.Provider
      value={{
        numberofcart,
        setnumberofcart,
        numberofWhishlist,
        setnumberofWhishlist,
      }}
    >
      {children}
    </ContextCart.Provider>
  )
}

export function usecart() {
  const context = useContext(ContextCart)
  if (!context) throw new Error('usecart must be used within Providercart')
  return context
}