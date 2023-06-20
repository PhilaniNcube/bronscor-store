"use client";

import { useSupabase } from "@/Providers/SupabaseProvider";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../store/store";
import { totalPriceSelector, addToCart, removeFromCart, deleteFromCart } from "../store/features/cartSlice";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MinusSquare, PlusSquare } from "lucide-react";
import { LucideTrash } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import SignIn from "@/components/Modals/SignIn";

type ComponentProps = {
  user: User | null
}

const CartDetails = ({user}:ComponentProps) => {

  console.log('Cart Page',user)

  const { supabase } = useSupabase();
  const router = useRouter();

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(totalPriceSelector);

  const dispatch = useAppDispatch();


  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Cart Details</h1>
      <Separator className="my-4" />
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <div className="w-full">
          {cartItems.length === 0 ? (
            <div>
              <p className="text-xl font-medium text-center">
                Your cart is empty...
              </p>

                <Button onClick={() => router.back()} variant="outline"><ArrowLeft />Back </Button>

            </div>
          ) : (
            cartItems.map((item) => (
              <div
                className="flex items-start w-full pb-4 space-x-3 border-b border-slate-200"
                key={item.product.id}
              >
                <Image
                  src={item.product.image}
                  width={200}
                  height={200}
                  alt={item.product.name}
                  className="object-cover w-24 h-24 shadow md:h-32 md:w-32 aspect-square"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-md">{item.product.name}</h3>
                  <p className="text-sm font-medium">
                    Quantiy: {item.quantity}
                  </p>

                  <div className="flex items-center justify-start w-full mt-2 space-x-4">
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => dispatch(removeFromCart(item))}
                    >
                      <MinusSquare />
                    </Button>
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => dispatch(addToCart(item))}
                    >
                      <PlusSquare />
                    </Button>
                  </div>

                  <p className="mt-4 text-xl font-medium">{formatCurrency(item.quantity * item.product.price)}</p>
                </div>
                <div className="">
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => dispatch(deleteFromCart(item))}
                  >
                    <LucideTrash />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-full">
          {user === null || user === undefined ? (<div className="flex justify-center w-full py-4 bg-black rounded-md"><SignIn /></div>) : (
            <div className="flex flex-col items-start w-full space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartDetails;
