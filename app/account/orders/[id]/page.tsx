import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getOrderById } from "@/lib/orders";
import { formatCurrency } from "@/lib/utils";



export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    id:string
  }
}

const page = async ({params:{id}}:PageProps) => {

  const order = await getOrderById(id)



  return (
    <div className="my-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="w-full">
            <h1 className="text-2xl font-medium md:text-4xl">Order Details</h1>
            <Separator className="my-3" />

            <div className="w-full">
              {/* <h2 className="text-2xl font-medium md:text-4xl">Order ID: {order.id}</h2> */}
              {/* <h2 className="text-2xl font-medium md:text-4xl">Order Date: {order.created_at}</h2> */}
              <h2 className="mt-4 mb-1 text-xl">
                {order.customer_id.first_name} {order.customer_id.last_name}
              </h2>
              <h2 className="my-1 text-xl ">{order.shipping_address.phone}</h2>
              <h2 className="my-1 text-xl ">
                {order.shipping_address.street_address}
              </h2>
              <h2 className="my-1 text-xl ">
                {order.shipping_address.local_area}
              </h2>
              <h2 className="my-1 text-xl ">{order.shipping_address.city}</h2>
              <h2 className="my-1 text-xl ">{order.shipping_address.zone}</h2>
              <h2 className="my-1 text-xl ">{order.shipping_address.code}</h2>
              <h2 className="my-1 text-xl ">
                {order.shipping_address.country}
              </h2>
            </div>
          </div>
          <div className="w-full p-4 text-black rounded-md bg-amber-600">
            <div className="w-full">
              {/* <h2 className="text-2xl font-medium md:text-4xl">Order ID: {order.id}</h2> */}
              {/* <h2 className="text-2xl font-medium md:text-4xl">Order Date: {order.created_at}</h2> */}
              <h2 className="my-2 text-lg font-medium ">
                Order Status: <span className="uppercase">{order.status}</span>
              </h2>
              {/* <h2 className="my-2 text-lg font-medium">Order Items</h2> */}
              <h2 className="my-2 text-lg font-medium">
                Order Sub Total: {formatCurrency(order.sub_total)}
              </h2>
              <h2 className="my-2 text-lg font-medium">
                Order Shipping: {formatCurrency(order.shipping_cost)}
              </h2>
              <Separator />
              <h2 className="my-2 text-lg font-medium">
                Order Total: {formatCurrency(order.total_amount)}
              </h2>

              {order.status.toLowerCase() === "pending" && (
                <form
                  action="https://sandbox.payfast.co.za/eng/process"
                  className="w-full"
                >
                  <input type="hidden" name="merchant_id" value="10000100" />
                  <input
                    type="hidden"
                    name="merchant_key"
                    value="46f0cd694581a"
                  />
                  <input
                    type="hidden"
                    name="amount"
                    value={order.total_amount}
                  />
                  <input
                    type="hidden"
                    name="item_name"
                    value={order.id}
                  />
                  <input
                    type="hidden"
                    name="return_url"
                    value={`${process.env.NEXT_PUBLIC_PAYFAST_RETURN_URL}?order_id=${order.id}`}
                  />
                  <input
                    type="hidden"
                    name="cancel_url"
                    value={process.env.NEXT_PUBLIC_PAYFAST_CANCEL_URL}
                  />
                  <input
                    type="hidden"
                    name="notify_url"
                    value={`${process.env.NEXT_PUBLIC_PAYFAST_NOTIFY_URL}?order_id=${order.id}`}
                  />
                  <input
                    type="hidden"
                    name="name_first"
                    value={order.customer_id.first_name}
                  />
                  <input
                    type="hidden"
                    name="name_last"
                    value={order.customer_id.last_name}
                  />
                  <input
                    type="hidden"
                    name="email_address"
                    value={order.shipping_address.email}
                  />
                  <input
                    type="hidden"
                    name="cell_number"
                    value={order.shipping_address.phone}
                  />
                  <Button
                    type="submit"
                    className="w-full mt-8 bg-black text-amber-600"
                  >
                    Checkout
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
