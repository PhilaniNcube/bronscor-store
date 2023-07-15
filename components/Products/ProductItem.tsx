"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/utils";
import { Database } from "@/schema";
import Image from 'next/image'
import { useAppDispatch } from "@/app/store/store";
import {
  addToCart,
} from "@/app/store/features/cartSlice";

type ProductProps = {
  product: Database["public"]["Tables"]["products"]["Row"];
};

const ProductItem = ({ product }: ProductProps) => {

 const dispatch = useAppDispatch();


  return (
    <div className="relative rounded-md text-white overflow-clip bg-zinc-800 shadow-md hover:shadow-lg flex flex-col @container ">
      <div className="flex w-full flex-col @sm:flex-row @lg:flex-col">
        <Image
          src={product.image}
          width={600}
          height={600}
          alt={product.name}
          className=" w-full @sm:w-1/3 @sm:p-2 h-full object-cover aspect-square"
        />
        <div className=" z-10 flex flex-col @sm:justify-center w-full p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm">{formatCurrency(product.price)}</p>
          <Button type="button" onClick={() => {
              dispatch(
                addToCart({
                  product: product,
                  quantity: 1,
                })
              );
          }} className="mt-3 bg-amber-500 hover:shadow-md hover:bg-gray-700 w-full">
           Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};


export default ProductItem;
