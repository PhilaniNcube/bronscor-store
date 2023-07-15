import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getMyOrders } from "@/lib/orders";
import { formatCurrency } from "@/lib/utils";
import { Database } from "@/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";
import { cookies } from "next/headers";
import Link from "next/link";

const page = async () => {

  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log('user', user?.id);

  const {data:profile, error} = await supabase.from('profiles').select('*').eq('id', user?.id).single();

  const {data:admin, error:adminError} = await supabase.rpc('is_admin').single();

  const orders = await getMyOrders(profile?.id!);

  return (
    <main className="container my-6">
      <div className="w-full min-h-[700px]">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-3xl font-semibold">My Account</h1>
          {admin === true && (
            <Link href="/dashboard" className="">
              <Button type="button" className="bg-amber-600 text-black hover:bg-amber-500">
                Dashboard
              </Button>
            </Link>
          )}
        </div>
        <Separator className="my-4" />
        <div className="w-full">
          {orders.map((order) => (
            <div
              key={order.id}
              className="w-full flex gap-10 py-4 border-b border-slate-50"
            >
              <div className="">
                <p className="text-lg">Order ID: {order.id.split("-")[0]}</p>
                <p className="text-lg">
                  Order Date: {format(new Date(order.created_at), "PPP")}
                </p>
              </div>
              <div>
                <p className="text-lg">Order Status: {order.status}</p>
                <p className="text-lg">
                  Order Amount: {formatCurrency(order.total_amount)}
                </p>
              </div>
              <div className="flex flex-col flex-1 items-end">
                <div className="w-full flex justify-end">
                  {order.order_items.map((item, i) => (
                    <p key={i} className="text-md">
                      {item.product.name} x {item.quantity}
                    </p>
                  ))}
                </div>
                <Link href={`/account/orders/${order.id}`} className="mt-6">
                  <Button className="bg-amber-600 text-black hover:text-amber-600" type="button">View Order</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default page;
