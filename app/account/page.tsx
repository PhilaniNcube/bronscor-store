import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getMyOrders } from "@/lib/orders";
import { formatCurrency } from "@/lib/utils";
import type { Database } from "@/schema";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";



const page = async () => {

  const supabase = createClient();

  const {data: {session}} = await supabase.auth.getSession();

  if (!session || !session.user) {
			console.error("Session or user is undefined");
			redirect("/");
		}

		const { data: profile, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", session.user.id)
			.single();

  const {data:admin, error:adminError} = await supabase.rpc('is_admin').single();

  if (error || adminError) {
    console.error(error || adminError);
    redirect("/")
  }

  const orders = await getMyOrders(profile.id);

  return (
    <main className="container my-6">
      <div className="w-full min-h-[700px]">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-semibold">My Account</h1>
          {admin === true && (
            <Link href="/dashboard" className="">
              <Button type="button" className="text-black bg-amber-600 hover:bg-amber-500">
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
              className="flex w-full gap-10 py-4 border-b border-slate-50"
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
              <div className="flex flex-col items-end flex-1">
                <div className="flex justify-end w-full">
                  {order.order_items.map((item, i) => (
                    <p key={item.product.id} className="text-md">
                      {item.product.name} x {item.quantity}
                    </p>
                  ))}
                </div>
                <Link href={`/account/orders/${order.id}`} className="mt-6">
                  <Button className="text-black bg-amber-600 hover:text-amber-600" type="button">View Order</Button>
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
