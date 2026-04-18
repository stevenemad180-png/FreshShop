import { GetDetailsSingleProduct } from "@/api/serves/route";
import { ProductType } from "@/api/Types";
import ProductdetailsLayout from "@/app/_Components/ProductdetailsLayout/ProductdetailsLayout";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default async function ProductDetails(props: { params: Promise<{ id: string }> }):Promise<ProductType | undefined>
{

  const params =props.params
  const id = (await params).id;

  const product = await GetDetailsSingleProduct(id);
  console.log("Product ID:", id);


  
  return(
    <ProductdetailsLayout product={product}/>
  )
}