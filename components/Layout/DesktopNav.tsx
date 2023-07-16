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
import { Heart, ShoppingBag, UserIcon, UserMinusIcon } from "lucide-react";
import SignUp from "../Modals/SignUp";
import { useSupabase } from "@/Providers/SupabaseProvider";
import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import SignIn from "../Modals/SignIn";
import { Database } from "@/schema";
import { useAppDispatch } from "@/app/store/store";
import { totalCartItemsSelector } from "@/app/store/features/cartSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AccountDropDown from "./AccountDropDown";

type Props = {
  user: User | null;
  categories: Database["public"]["Tables"]["categories"]["Row"][];
};

const DesktopNav = ({user, categories}:Props) => {

  const qty = useSelector(totalCartItemsSelector);

  const router = useRouter()

const {supabase } = useSupabase();
const signOut = async () => {
 const data = await supabase.auth.signOut();
 router.push('/')
//  console.log(data)
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
        <NavigationMenu className="">
          <NavigationMenuList>
            {/* <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink className="bg-black text-amber-500">
                  Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-black text-amber-500 hover:bg-amber-500">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="w-[600px] grid grid-cols-2 gap-6 p-4 ">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/categories/${category.slug}`}
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink className="px-3 py-2 text-sm rounded hover:text-amber-500 hover:bg-slate-100">
                          {category.name}
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <Link href="/account">
              <UserIcon className="border rounded-full text-black border-amber-600 bg-amber-600" />
            </Link>
            <Link href="/wishlist">
              <Heart className="border rounded-full text-red-600 border-white bg-white" />
            </Link>

            <Button
              onClick={signOut}
              variant="ghost"
              className="text-amber-500"
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
          <ShoppingBag className="text-amber-500" />
          {qty > 0 && (
            <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full -top-2 -right-2">
              {qty}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};
export default DesktopNav;
