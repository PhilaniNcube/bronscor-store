"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Database } from "@/schema";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch } from "@/app/store/store";
import { addToCart } from "@/app/store/features/cartSlice";


type ComponentProps = {
  product: Database["public"]["Tables"]["products"]["Row"];
};

const ProductDetails = ({product}:ComponentProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

  const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
      <div className="p-2 rounded-lg md:p-4 overflow-clip">
        <Image
          src={product.image}
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={rgbDataURL(255, 255, 255)}
          quality={100}
          alt={product.name}
          className="object-cover w-full"
        />
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-medium text-black md:text-4xl">
          {product.name}
        </h1>
        <h1 className="my-2 text-3xl font-medium text-white">
          {formatCurrency(product.price)}
        </h1>
        <p className="mt-3 text-md text-white">{product.description}</p>
        <Button
          type="button"
          className="w-full mt-6 text-white bg-black hover:text-bronscor"
          onClick={() => {
            console.log("add to cart");
            dispatch(
              addToCart({
                product: product,
                quantity: 1,
              })
            );
          }}
        >
          Add To Cart
        </Button>
        <Separator className="my-4" />
        <p className="text-xl font-medium">Product Details</p>
        <div className="w-full mt-2">
          {product.details.map((detail, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full py-2 border-b border-slate-300"
            >
              <p className="font-medium text-md text-white">{detail.key}</p>
              <p className="font-medium text-md text-white">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
        {/* <Separator className="my-4" /> */}
        <p className="mt-6 text-xl font-medium">Dimensions</p>
        <div className="w-full mt-2">
          <div className="flex items-center justify-between w-full py-2 border-b border-slate-300">
            <p className="font-medium text-md text-white">Width</p>
            <p className="font-medium text-md text-white">
              {product.dimensions?.width}cm
            </p>
          </div>
          <div className="flex items-center justify-between w-full py-2 border-b border-slate-300">
            <p className="font-medium text-md text-white">Height</p>
            <p className="font-medium text-md text-white">
              {product.dimensions?.height}cm
            </p>
          </div>
          <div className="flex items-center justify-between w-full py-2 border-b border-slate-300">
            <p className="font-medium text-md text-white">Depth</p>
            <p className="font-medium text-md text-white">
              {product.dimensions?.depth}cm
            </p>
          </div>
          <div className="flex items-center justify-between w-full py-2 border-b border-slate-300">
            <p className="font-medium text-md text-white">Weight</p>
            <p className="font-medium text-md text-white">
              {product.dimensions?.weight} grams
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;

