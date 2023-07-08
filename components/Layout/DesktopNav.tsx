"use client"
import Link from "next/link";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ShoppingBag, UserIcon, UserMinusIcon } from "lucide-react";
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

type Props = {
  user: User | null;
  categories: Database["public"]["Tables"]["categories"]["Row"][];
};




const DesktopNav = ({user, categories}:Props) => {

  const qty = useSelector(totalCartItemsSelector);

const {supabase } = useSupabase();
const signOut = async () => {
 const data = await supabase.auth.signOut();
 console.log(data)
}

  return (
    <div className="items-center justify-between hidden md:flex">
      <Link href="/">
        <Image
          src="/images/bronscor_logo.png"
          width={822}
          height={303}
          alt="Bronscor"
          className="object-cover w-40 py-2"
        />
      </Link>
      <div>
        <NavigationMenu className="z-[9999]">
          <NavigationMenuList>
            {/* <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink className="bg-black text-bronscor">
                  Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-black text-bronscor hover:bg-bronscor">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent className="z-20">
                <ul className="w-[600px] grid grid-cols-2 gap-6 p-4">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/categories/${category.slug}`}
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink className="px-3 py-2 text-sm rounded hover:text-bronscor hover:bg-slate-100">
                          {category.name}
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/steel" legacyBehavior passHref>
                <NavigationMenuLink className="bg-black text-bronscor">
                  Steel
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <Link href="/account">
              <UserIcon className="border rounded-full text-bronscor border-bronscor" />
            </Link>
            <Button
              onClick={() => {
                supabase.auth.signOut();
              }}
              variant="ghost"
              className="text-bronscor"
            >
              Logout&nbsp; <UserMinusIcon size={16} />
            </Button>

          </div>
        ) : (
          <>
            <SignIn />
            <SignUp />
          </>
        )}

        <Link href="/cart" className="relative">
          <ShoppingBag className="text-bronscor" />
          {qty > 0 && (<span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full -top-2 -right-2">{qty}</span>)}
        </Link>
      </div>
    </div>
  );
};
export default DesktopNav;
