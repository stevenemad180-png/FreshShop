import { BrandType } from '../Types'

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1'

export async function getallbrands(): Promise<BrandType[]> {
  try {
    const res = await fetch(`${BASE_URL}/brands`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    return data?.data ?? []
  } catch (error) {
    console.error('getallbrands error:', error)
    return []
  }
}

export async function Getspecificbrand(id: string): Promise<BrandType | null> {
  try {
    const res = await fetch(`${BASE_URL}/brands/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data?.data ?? null
  } catch (error) {
    console.error('Getspecificbrand error:', error)
    return null
  }
}