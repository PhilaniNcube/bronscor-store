import type { ReactNode } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { BoxSelectIcon, BoxesIcon, LassoSelectIcon, LucideShoppingCart, Users2 } from "lucide-react";

import { cookies, headers } from "next/headers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export const dynamic = "force-dynamic";

type Props ={
  children: ReactNode
}
const layout = async ({children}:Props) => {

   const supabase = createClient()

  const data = await supabase.rpc('is_admin')

  if(data === null || data.data === false) {
     redirect('/')
  }

  const {data: {user}} = await supabase.auth.getUser()

  return (
    <div className="flex flex-nowrap">
      <aside className="relative isolate bg-gray-950">
        <div className="sticky top-0 flex flex-col items-center justify-between h-[calc(100vh-75px)] w-64 bg-gray-950 border-t border-white">
          <div className="flex flex-col items-center justify-start w-full h-full py-4 space-y-4">
            <Link href="/">
              <Image
                src="/images/logo.png"
                width={822}
                height={303}
                alt="Bronscor"
                className="object-cover w-3/4"
              />
            </Link>
            <Separator className="w-full text-amber-500" />
            <div className="flex flex-col items-center justify-center w-full px-4 space-y-4">
              <Link
                href="/dashboard/products"
                className="flex w-full px-3 py-2 space-x-4 rounded text-amber-500 hover:bg-gray-900"
              >
                <BoxesIcon className="w-6 h-6" />
                <span>Products</span>
              </Link>
              <Link
                href="/dashboard/categories"
                className="flex w-full px-3 py-2 space-x-4 rounded text-amber-500 hover:bg-gray-900"
              >
                <BoxSelectIcon className="w-6 h-6" />
                <span>Categories</span>
              </Link>
              <Link
                href="/dashboard/customers"
                className="flex w-full px-3 py-2 space-x-4 rounded text-amber-500 hover:bg-gray-900"
              >
                <Users2 className="w-6 h-6" />
                <span>Customers</span>
              </Link>
              {/* <Link
                href="/dashboard/brands"
                className="flex w-full px-3 py-2 space-x-4 rounded text-amber-500 hover:bg-gray-900"
              >
                <LassoSelectIcon className="w-6 h-6" />
                <span>Brands</span>
              </Link> */}
              <Link
                href="/dashboard/orders"
                className="flex w-full px-3 py-2 space-x-4 rounded text-amber-500 hover:bg-gray-900"
              >
                <LucideShoppingCart className="w-6 h-6" />
                <span>Orders</span>
              </Link>
            </div>
            <Separator className="w-full text-amber-500" />
            <div className="flex flex-col items-center justify-end flex-1 w-full h-full px-4">
              <div className="flex flex-col items-center justify-center w-full space-y-4">
                <p className="w-full px-3 py-2 text-xs text-white bg-gray-800 rounded">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 container h-[calc(100vh-75px)]">
        <ScrollArea className="py-4 w-full h-[calc(100vh-75px)] px-4">
          {children}
        </ScrollArea>
      </main>
    </div>
  );
};
export default layout;
