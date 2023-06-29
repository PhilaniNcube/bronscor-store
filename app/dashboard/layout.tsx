import { ReactNode } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { BoxSelectIcon, BoxesIcon, LassoSelectIcon, LucideShoppingCart, Users2 } from "lucide-react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props ={
  children: ReactNode
}
const layout = async ({children}:Props) => {

   const supabase = createServerComponentClient({ cookies });



   const {
     data: { user },
   } = await supabase.auth.getUser();

  return (
    <div className="flex flex-nowrap">
      <aside className="relative isolate bg-gray-950">
        <div className="sticky top-0 flex flex-col items-center justify-between h-[calc(100vh-75px)] w-64 bg-gray-950 border-t border-white">
          <div className="flex flex-col items-center justify-start space-y-4 py-4 h-full w-full">
            <Link href="/">
              <Image
                src="/images/logo.png"
                width={822}
                height={303}
                alt="Bronscor"
                className="w-3/4 object-cover"
              />
            </Link>
            <Separator className="w-full text-bronscor" />
            <div className="flex flex-col px-4 items-center justify-center space-y-4 w-full">
              <Link
                href="/dashboard/products"
                className="flex space-x-4 text-bronscor px-3 py-2 hover:bg-gray-900 rounded w-full"
              >
                <BoxesIcon className="w-6 h-6" />
                <span>Products</span>
              </Link>
              <Link
                href="/dashboard/categories"
                className="flex space-x-4 text-bronscor px-3 py-2 hover:bg-gray-900 rounded w-full"
              >
                <BoxSelectIcon className="w-6 h-6" />
                <span>Categories</span>
              </Link>
              <Link
                href="/dashboard/customers"
                className="flex space-x-4 text-bronscor px-3 py-2 hover:bg-gray-900 rounded w-full"
              >
                <Users2 className="w-6 h-6" />
                <span>Customers</span>
              </Link>
              {/* <Link
                href="/dashboard/brands"
                className="flex space-x-4 text-bronscor px-3 py-2 hover:bg-gray-900 rounded w-full"
              >
                <LassoSelectIcon className="w-6 h-6" />
                <span>Brands</span>
              </Link> */}
              <Link
                href="/dashboard/orders"
                className="flex space-x-4 text-bronscor px-3 py-2 hover:bg-gray-900 rounded w-full"
              >
                <LucideShoppingCart className="w-6 h-6" />
                <span>Orders</span>
              </Link>
            </div>
            <Separator className="w-full text-bronscor" />
            <div className="flex-1 flex  w-full flex-col h-full px-4 items-center justify-end">
              <div className="flex flex-col items-center justify-center space-y-4 w-full">
                <p className="w-full bg-gray-800 px-3 py-2 rounded text-white">
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
