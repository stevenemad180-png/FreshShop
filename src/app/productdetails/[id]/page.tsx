import { GetDetailsSingleProduct } from "@/api/serves/route";
import ProductdetailsLayout from "@/app/_Components/ProductdetailsLayout/ProductdetailsLayout";
import { notFound } from "next/navigation";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const product = await GetDetailsSingleProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductdetailsLayout product={product} />;
}