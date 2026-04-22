import { notFound } from "next/navigation"
import { GetDetailsSingleProduct } from "@/api/serves/route"
import ProductdetailsLayout from "@/app/_Components/ProductdetailsLayout/ProductdetailsLayout"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const product = await GetDetailsSingleProduct(id)

  if (!product) {
    notFound()
  }

  return <ProductdetailsLayout product={product} />
}