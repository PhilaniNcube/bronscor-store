/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  addToCart,
  removeFromCart,
  openCart, closeCart,
  deleteFromCart,
  totalPriceSelector,
  totalCartItemsSelector,
} from "@/app/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { MinusSquare, PlusSquare, ShoppingBag, ShoppingCartIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";


const CartSlide = () => {

    const router = useRouter();

    const [open, setOpen] = useState(false);


    // const qty = useSelector(totalCartItemsSelector);
    const isOpen = useAppSelector((state) => state.cart.open);
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const totalPrice = useAppSelector(totalPriceSelector);
    const dispatch = useAppDispatch();

    const toggleCart = () => {
      if(isOpen === true) {
        dispatch(closeCart())
      } else {
        dispatch(openCart())
      }
    }



  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      {/* <SheetTrigger asChild>
        <Button className="text-amber-600 outline-none relative isolate">
          <ShoppingBag className="text-amber-600" />
          {qty > 0 && (
            <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full -top-2 -right-2">
              {qty}
            </span>
          )}
        </Button>
      </SheetTrigger> */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>See the items in your cart</SheetDescription>
        </SheetHeader>
        <div className="w-full max-w-lg">
          {cartItems.length === 0 ? (
            <div>
              <p className="text-center">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <ScrollArea className="h-[600px] w-full">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="w-full gap-2 flex relative border-b-2 py-3 border-gray-200"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-40 aspect-square object-cover"
                    />
                    <div className="flex-1 flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          {item.product.name}
                        </h3>
                        <p className="text-lg font-bold">
                          {formatCurrency(item.product.price)}
                        </p>
                      </div>
                      <p className="text-md mt-2">{item.product.name}</p>
                      <div className="flex items-center justify-between">
                        <p>
                          Subtotal{" "}
                          {formatCurrency(item.quantity * item.product.price)}
                        </p>
                        <div className="flex items-center gap-2">
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
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="mt-4 bg-black p-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(totalPrice)}
                  </p>

                  <Link href="/cart">
                    <Button
                      type="button"
                      className="w-full bg-amber-600 text-black"
                    >
                      Place Order
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}



export default CartSlide;
