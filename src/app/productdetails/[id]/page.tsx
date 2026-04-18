import { notFound } from "next/navigation";
import { GetDetailsSingleProduct } from "@/api/serves/route";
import ProductdetailsLayout from "@/app/_Components/ProductdetailsLayout/ProductdetailsLayout";

export default async function Page(
  props: PageProps<"/productdetails/[id]">
) {
  const { id } = await props.params;
  const product = await GetDetailsSingleProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductdetailsLayout product={product} />;
}