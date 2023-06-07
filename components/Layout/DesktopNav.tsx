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
import { ShoppingBag, UserMinusIcon } from "lucide-react";
import SignUp from "../Modals/SignUp";
import { useSupabase } from "@/Providers/SupabaseProvider";
import getUser from "@/lib/getUser";
import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import SignIn from "../Modals/SignIn";

type Props = {
  user: User|null;
};


const categories = [
  {
    id: 1,
    name: "Angle Grinders",
    slug: "angle-grinders",
  },
  {
    id: 2,
    name: "Bench Grinders",
    slug: "bench-grinders",
  },
  {
    id: 3,
    name: "Bench Vices",
    slug: "bench-vices",
  },
  {
    id: 4,
    name: "Hardware",
    slug: "hardware",
  },
  {
    id: 5,
    name: "Power Drills",
    slug: "power-drills",
  },
  {
    id: 6,
    name: "Power Saws",
    slug: "power-saws",
  },
  {
    id: 7,
    name: "Lamps",
    slug: "lamps",
  },
  {
    id: 8,
    name: "Welding Machines",
    slug: "welding-machines",
  },
  {
    id: 9,
    name: "Welding Accessories",
    slug: "welding-accessories",
  },
  {
    id: 10,
    name: "Welding Consumables",
    slug: "welding-consumables",
  },
  {
    id: 11,
    name: "Safety Clothing",
    slug: "safety-clothing",
  },
  {
    id: 12,
    name: "Hand Tools",
    slug: "hand-tools",
  },
  {
    id: 13,
    name: "Wrenches",
    slug: "wrenches",
  },
  {
    id: 14,
    name: "Sockets",
    slug: "sockets",
  },
  {
    id: 15,
    name: "Spanners",
    slug: "spanners",
  },
  {
    id: 16,
    name: "Screwdrivers",
    slug: "screwdrivers",
  },
  {
    id: 17,
    name: "Pliers",
    slug: "pliers",
  },
  {
    id: 18,
    name: "Hammers",
    slug: "hammers",
  },
  {
    id: 19,
    name: "Measuring Tools",
    slug: "measuring-tools",
  },
  {
    id: 20,
    name: "Tool Boxes",
    slug: "tool-boxes",
  },
  {
    id: 21,
    name: "Castings",
    slug: "castings",
  },
  {
    id: 22,
    name: "3D Printing",
    slug: "3d-printing",
  },
  {
    id: 23,
    name: "Steel",
    slug: "steel",
  }
]



const DesktopNav = ({user}:Props) => {

const {supabase } = useSupabase();
const signOut = async () => {
 const data = await supabase.auth.signOut();
 console.log(data)
}

  return (
    <div className="hidden md:flex justify-between items-center">
      <Link href="/">
        <Image
          src="/images/logo.png"
          width={822}
          height={303}
          alt="Bronscor"
          className="w-40 object-cover py-2"
        />
      </Link>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink className="bg-black  text-bronscor">
                  Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-black text-bronscor hover:bg-bronscor">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent className="z-20">
                <ul className="w-[600px] grid grid-cols-3 gap-6 p-4">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/categories/${category.slug}`}
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink className="hover:text-bronscor px-3 py-2 rounded hover:bg-slate-100 text-sm">
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
          <Button onClick={() => {
           supabase.auth.signOut();
          }} variant="ghost" className="text-bronscor">
            Logout&nbsp; <UserMinusIcon size={16} />
          </Button>
        ) : (
          <>
            <SignIn />
            <SignUp />
          </>
        )}

        <Link href="/cart">
          <ShoppingBag />
        </Link>
      </div>
    </div>
  );
};
export default DesktopNav;
