"use client"
import { useState } from "react"
import Image from "next/image"
import { MenuIcon, ShoppingBag, UserIcon, UserMinusIcon } from "lucide-react";
import SignUp from "../Modals/SignUp";
import { useSupabase } from "@/Providers/SupabaseProvider";
import getUser from "@/lib/getUser";
import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import SignIn from "../Modals/SignIn";
import { Database } from "@/schema";
import { useAppDispatch } from "@/app/store/store";
import { totalCartItemsSelector } from "@/app/store/features/cartSlice";
import { useSelector } from "react-redux";
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
  user: User | null;
  categories: Database["public"]["Tables"]["categories"]["Row"][];
};

const MobileNav = ({user, categories}:Props) => {
  const { supabase } = useSupabase();
  const [open, setOpen] = useState(false)
 const qty = useSelector(totalCartItemsSelector);
  return (
    <nav className="flex py-2 justify-center items-center md:hidden bg-black z-[9999]">
      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            width={822}
            height={303}
            alt="logo"
            className="w-24 object-cover"
          />
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <Link href="/cart" className="relative">
            <ShoppingBag className="text-bronscor" />
            {qty > 0 && (
              <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full -top-2 -right-2">
                {qty}
              </span>
            )}
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="" variant="ghost">
                <MenuIcon className="text-bronscor" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent className="text-gray-900 w-[300px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="w-full p-3 flex flex-col space-y-4">
                {categories.map((category) => (
                  <Link key={category.id} href={`/categories/${category.slug}`}>
                    {category.name}
                  </Link>
                ))}
                <Link href="/steel">Steel</Link>
                <SheetFooter>
                  {user === null || !user ? (
                    <div>
                      <SignIn />
                      <SignUp />
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <Link href="/account" className="flex space-x-2">
                        <UserIcon className="border rounded-full text-gray-900 border-gray-900" />
                        <span>My Account</span>
                      </Link>
                      <Button
                        onClick={() => {
                          supabase.auth.signOut();
                        }}

                        className="text-gray-900 bg-bronscor"
                      >
                        Logout&nbsp; <UserMinusIcon size={16} />
                      </Button>
                    </div>
                  )}
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
export default MobileNav;
