import Link from "next/link";
import Image from 'next/image'
import { getProductBySlug } from "@/lib/products";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: {
    slug: string;
  }
}

const page = async({params: {slug}}:PageProps) => {

const product = await getProductBySlug(slug)

  return (
    <main className="container my-6">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <div className="p-2 border rounded-lg md:p-4 border-bronscor overflow-clip">
          <Image
            src={product.image}
            width={500}
            height={500}
            quality={100}
            alt={product.name}
            className="object-cover w-full"
          />
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-medium text-black md:text-4xl">
            {product.name}
          </h1>
          <h1 className="my-2 text-3xl font-medium text-slate-800">
            {formatCurrency(product.price)}
          </h1>
          <p className="mt-3 text-md text-slate-600">
            {product.description}
          </p>
          <Separator className="my-4" />
          <p className="text-xl font-medium">Product Details</p>
          <div className="w-full mt-2">
            {product.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-center justify-between w-full py-2 border-b border-slate-300"
              >
                <p className="font-medium text-md text-slate-700">
                  {detail.key}
                </p>
                <p className="font-medium text-md text-slate-700">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
          {/* <Separator className="my-4" /> */}
          <p className="mt-6 text-xl font-medium">Dimensions</p>
          <div className="w-full mt-2">
            <div className="flex items-center justify-between w-full py-2 border-b border-slate-300">
              <p className="font-medium text-md text-slate-700">Width</p>
              <p className="font-medium text-md text-slate-700">
                {product.dimensions?.width}cm
              </p>
            </div>
            <div className="flex items-center justify-between w-full py-2 border-b border-slate-300">
              <p className="font-medium text-md text-slate-700">Height</p>
              <p className="font-medium text-md text-slate-700">
                {product.dimensions?.height}cm
              </p>
            </div>
            <div className="flex items-center justify-between w-full py-2 border-b border-slate-300">
              <p className="font-medium text-md text-slate-700">Depth</p>
              <p className="font-medium text-md text-slate-700">
                {product.dimensions?.depth}cm
              </p>
            </div>
            <div className="flex items-center justify-between w-full py-2 border-b border-slate-300">
              <p className="font-medium text-md text-slate-700">Weight</p>
              <p className="font-medium text-md text-slate-700">
                {product.dimensions?.weight} grams
              </p>
            </div>
          </div>

          <Button type="button" className="w-full mt-6 text-white bg-black hover:text-bronscor">Add To Cart</Button>
        </div>
      </div>
    </main>
  );
};
export default page;
