"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Database } from "@/schema";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import {
  totalPriceSelector,
  addToCart,
  removeFromCart,
  deleteFromCart,
  productQtySelector,
} from "@/app/store/features/cartSlice";
import { MinusSquare, PlusSquare } from "lucide-react";
import { useSelector } from "react-redux";


type ComponentProps = {
  product: Database["public"]["Tables"]["products"]["Row"];
};

const ProductDetails = ({product}:ComponentProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  //  const qty = useSelector(productQtySelector);

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
        <h1 className="text-2xl font-medium md:text-4xl">{product.name}</h1>
        <h1 className="my-2 text-3xl font-medium text-amber-600">
          {formatCurrency(product.price)}
        </h1>
        <p className="mt-3 text-md text-amber-600">{product.description}</p>
        <div className="flex items-center justify-between w-full mt-2 space-x-4">
          <Button
            variant="secondary"
            type="button"
            onClick={() =>
              dispatch(
                removeFromCart({
                  product: product,
                  quantity: 1,
                })
              )
            }
          >
            <MinusSquare />
          </Button>
          <Button
            type="button"
            className="w-full text-amber-600 bg-gray-900 hover:text-amber-500"
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
          <Button
            variant="secondary"
            type="button"
            onClick={() =>
              dispatch(
                addToCart({
                  product: product,
                  quantity: 1,
                })
              )
            }
          >
            <PlusSquare />
          </Button>
        </div>

        <Separator className="my-4" />
        <p className="text-xl font-medium">Product Details</p>
        <div className="w-full mt-2">
          {product.details.map((detail, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full py-2 border-b border-slate-300"
            >
              <p className="font-medium text-md text-amber-600">{detail.key}</p>
              <p className="font-medium text-md text-amber-600">{detail.value}</p>
            </div>
          ))}
        </div>
        {/* <Separator className="my-4" /> */}
        <p className="mt-6 text-xl font-medium">Dimensions</p>
        <div className="w-full mt-2">
          <div className="flex items-center justify-between w-full py-2 border-b border-slate-300">
            <p className="font-medium text-md text-amber-600">Width</p>
            <p className="font-medium text-md text-amber-600">
              {product.dimensions?.width}cm
            </p>
          </div>
          <div className="flex items-center justify-between w-full py-2 border-b border-slate-300">
            <p className="font-medium text-md text-amber-600">Height</p>
            <p className="font-medium text-md text-amber-600">
              {product.dimensions?.height}cm
            </p>
          </div>
          <div className="flex items-center justify-between w-full py-2 border-b border-slate-300">
            <p className="font-medium text-md text-amber-600">Depth</p>
            <p className="font-medium text-md text-amber-600">
              {product.dimensions?.depth}cm
            </p>
          </div>
          <div className="flex items-center justify-between w-full py-2 border-b border-slate-300">
            <p className="font-medium text-md text-amber-600">Weight</p>
            <p className="font-medium text-md text-amber-600">
              {product.dimensions?.weight} grams
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;

