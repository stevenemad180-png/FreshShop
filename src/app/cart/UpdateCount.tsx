'use client'

import React, { useState } from 'react'
import { HandleUpdate } from '../_Components/CartAction/CartAction'
import { usecart } from '@/_provider/Providercart'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function UpdateCount({
    Isincrement = false,
    id,
    newcount,
}: {
    Isincrement?: boolean
    id: string
    newcount: number
    }) {
    
    const { setnumberofcart } = usecart()
    const [isLoading, setIsLoading] = useState(false)

    async function update() {
        if (!Isincrement && newcount < 1) {
            toast.warning('Minimum quantity is 1 ⚠️')
            return
        }

        if (isLoading) return

        try {
            setIsLoading(true)

            const res = await HandleUpdate(id, newcount)

            if (res) {
                setnumberofcart((res as { numOfCartItems?: number }).numOfCartItems ?? 0)

                toast.success(
                    Isincrement
                        ? 'Item increased ✅'
                        : 'Item decreased ✅'
                )
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to update ❌')
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <button
      onClick={update}
          disabled={!Isincrement && newcount < 1}
          
      className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-semibold text-zinc-700 transition hover:bg-white disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : Isincrement ? (
        '+'
      ) : (
        '-'
      )}
    </button>
  )
}