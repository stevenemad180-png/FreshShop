'use client'

import React from 'react'
import { usecart } from '@/_provider/Providercart'
import { HandleClear, Handledelete } from '../_Components/CartAction/CartAction'
import { toast } from 'sonner'


export default function HandleButtonClear() {
  const { setnumberofcart } = usecart()

  async function handleclear() {
    try {
      const res = await HandleClear()
      console.log('rssssssss', res)

      if (res) {
        setnumberofcart(res.numOfCartItems)
        toast.success('clear Cart successfully')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to clear Cart')
    }
  }

  return (
    <button
      type="button"
      onClick={handleclear}
      className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
    >
      clear Cart
    </button>
  )
}