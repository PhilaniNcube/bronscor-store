import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getOrderById, updateOrderStatus } from "@/lib/orders";
import Link from "next/link";
import Image from 'next/image'
import { formatCurrency } from "@/lib/utils";

const page = async ({searchParams: {order_id}}:{searchParams:{order_id:string}}) => {

  console.log({id:order_id})

const order = await getOrderById(order_id)

const updatedOrder = await updateOrderStatus(order)

// const mail = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     email: updatedOrder.shipping_address.email,
//     first_name: updatedOrder.customer_id.first_name,
//     last_name: updatedOrder.customer_id.last_name,
//     satatus: updatedOrder.status,
//   }),
// }).then(res => res.json()).catch(err => console.log(err))

// console.log("Mail",mail)

  return (
    <div className="container my-6">
      <h1 className="text-2xl md:text-3xl font-medium mb-4">
        Thank you for your order{" "}
      </h1>

      <Separator className="my-4" />
      <Link className="mt-4" href="/account">
        <Button className="bg-gray-800 text-white" type="button">
          Go to My Account
        </Button>
      </Link>
      <div className="w-full mt-6">
        <h2 className="text-2xl md:text-3xl font-medium mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <p className="text-lg font-medium">
              {order.customer_id.first_name} {order.customer_id.last_name}{" "}
              <span className="text-xs">{order.shipping_address.email}</span>
            </p>
            <p className="text-lg font-medium">
              Status: <span className="uppercase">{order.status}</span>
            </p>
            <p className="text-lg font-medium flex flex-col gap-1 mt-4">
              <span>Address:</span>
              <div className="flex flex-col">
                <p className="text-sm text-slate-300">
                  {order.shipping_address.street_address}
                </p>
                <p className="text-sm text-slate-300">
                  {order.shipping_address.local_area}
                </p>
                <p className="text-sm text-slate-300">
                  {order.shipping_address.city}
                </p>
                <p className="text-sm text-slate-300">
                  {order.shipping_address.zone}
                </p>
                <p className="text-sm text-slate-300">
                  {order.shipping_address.code}
                </p>
                <p className="text-sm text-slate-300">
                  {order.shipping_address.phone}
                </p>
              </div>
            </p>
          </div>
          <div className="w-full">
            <h2 className="text-xl font-medium mb-4">
              Order Items
            </h2>
            <div className="w-full">
              {order.order_items.map((item) => (
                <div key={item.product.id} className="w-full flex gap-2">
                  <Image src={item.product.image} width={50} height={50} alt={item.product.name} className="w-20 h-20 aspect-square object-cover" />
                  <div className="flex-1">
                   <p className="text-lg font-medium">{item.product.name}</p>
                   <p className="text-sm text-slate-300">Qty: {item.quantity}</p>
                   <p className="text-sm text-slate-300">Sub Total: {formatCurrency(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
