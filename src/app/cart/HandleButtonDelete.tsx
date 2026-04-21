'use client'

import React, { useState } from 'react'
import { usecart } from '@/_provider/Providercart'
import { Handledelete } from '../_Components/CartAction/CartAction'
import { toast } from 'sonner'
import { Trash2, Loader2 } from 'lucide-react'

type HandleButtonDeleteProps = {
  id: string
}

export default function HandleButtonDelete({ id }: HandleButtonDeleteProps) {
  const { setnumberofcart } = usecart()
  const [isLoading, setIsLoading] = useState(false)

  async function handleRemove() {
    if (isLoading) return

    try {
      setIsLoading(true)
      const res = await Handledelete(id)

      if (res) {
        setnumberofcart((res as { numOfCartItems?: number }).numOfCartItems ?? 0)
        toast.success('Removed successfully')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to remove item')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={isLoading}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-red-200/60 bg-gradient-to-r from-red-500 via-rose-500 to-red-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(239,68,68,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(239,68,68,0.38)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="relative flex items-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Removing...
          </>
        ) : (
          <>
            <Trash2 className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
            Remove
          </>
        )}
      </span>
    </button>
  )
}