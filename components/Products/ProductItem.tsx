"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/utils";
import { Database } from "@/schema";
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import {
  addToCart,
  openCart,
} from "@/app/store/features/cartSlice";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import { useSupabase } from "@/Providers/SupabaseProvider";
import { toast } from "../ui/use-toast";

type ProductProps = {
  product: Database["public"]["Tables"]["products"]["Row"];
};

const ProductItem = ({ product }: ProductProps) => {

  const {supabase} = useSupabase()

 const dispatch = useAppDispatch();


  return (
    <div className="relative rounded-md text-white overflow-clip bg-zinc-800 group shadow-md hover:shadow-lg flex flex-col @container ">
      <Button
        onClick={() => {
          dispatch(
            addToCart({
              product: product,
              quantity: 1,
            })
          );
          dispatch(openCart());
        }}
        variant="ghost"
        className="absolute top-2 right-2  text-black rounded-full bg-slate-200 shadow group-hover:bg-amber-600 flex items-center justify-center p-2 transition-all duration-150"
      >
        <ShoppingCartIcon className="w-6 h-6" />
      </Button>
      <Button
        onClick={async () => {
          console.log("add to wishlist");
          const {
            data: { session },
          } = await supabase.auth.getSession();
          console.log(session);

          if (session === null) {
            toast({
              title: "You must be logged in to add to wishlist",
            });
          } else {
            const { data, error } = await supabase.from("wishlist").insert({
              user_id: session.user.id,
              product_id: product.id,
            });
            if (error) {
              console.log("error", error);
              toast({
                title: "Error adding to wishlist",
                description:
                  error.code === "23505"
                    ? "The product is already in your wishlist"
                    : error.message,
              });
            } else {
              toast({
                title: "Added to wishlist",
              });
            }
          }
        }}
        variant="ghost"
        className="absolute top-2 left-2  text-red-500 group-hover:text-white rounded-full bg-slate-200 shadow group-hover:bg-red-600 flex items-center justify-center p-2 transition-all duration-150"
      >
        <HeartIcon className="w-6 h-6" />
      </Button>
      <div className="flex w-full flex-col @sm:flex-row @lg:flex-col">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.image}
            width={600}
            height={600}
            alt={product.name}
            className=" w-full @sm:w-1/3 @sm:p-2 h-full object-cover aspect-square"
          />
        </Link>
        <div className=" z-10 flex flex-col @sm:justify-center w-full p-4">
          <h3 className="text-xs @sm:text-md @md:text-lg font-semibold line-clamp-1">{product.name}</h3>
          <p className="text-xs @sm:text-sm">{formatCurrency(product.price)}</p>
          <Link href={`/products/${product.slug}`}>
            <Button
              type="button"
              className="mt-3 bg-amber-500 hover:shadow-md hover:bg-gray-700 w-full text-xs"
              onClick={() => {
                dispatch(
                  addToCart({
                    product: product,
                    quantity: 1,
                  })
                );
                dispatch(openCart());
              }}
            >
            Add to Cart
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default ProductItem;
