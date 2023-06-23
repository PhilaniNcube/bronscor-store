import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getOrderById } from "@/lib/orders";
import { formatCurrency } from "@/lib/utils";

type PageProps = {
  params: {
    id:string
  }
}

const page = async ({params:{id}}:PageProps) => {

  const order = await getOrderById(id)

  const items = order.order_items

  let group:any = []
  const dimensions = items.map((item) => {


    let i = 1
    while (i <= item.quantity) {
      group.push({
        width: item.product.dimensions?.width,
        height: item.product.dimensions?.height,
        length: item.product.dimensions?.depth,
        weight: item.product.dimensions?.weight! / 1000,
      });
      i++
    }

    return group

  })



  const url = new URL(`http://localhost:3000/api/shipping`)

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: order.shipping_address.type,
      company: order.shipping_address.company,
      street_address: order.shipping_address.street_address,
      city: order.shipping_address.city,
      zone: order.shipping_address.zone,
      country: order.shipping_address.country,
      code: order.shipping_address.code,
      parcels: dimensions
    })
  }).then(res => res.json()).catch((err) => console.log(err))

  const shippingCost = res.data.rates[0].base_rate.charge

  console.log(res)

  return (
    <div className="my-6">
      <div className="container mx-auto">
        <pre>{shippingCost}</pre>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <h1 className="text-2xl md:text-4xl font-medium">Order Details</h1>
            <Separator />

            <div className="w-full">
              {/* <h2 className="text-2xl md:text-4xl font-medium">Order ID: {order.id}</h2> */}
              {/* <h2 className="text-2xl md:text-4xl font-medium">Order Date: {order.created_at}</h2> */}
              <h2 className="text-xl mb-1 mt-4">
                {order.customer_id.first_name} {order.customer_id.last_name}
              </h2>
              <h2 className="text-xl my-1 ">{order.shipping_address.phone}</h2>
              <h2 className="text-xl my-1 ">
                {order.shipping_address.street_address}
              </h2>
              <h2 className="text-xl my-1 ">
                {order.shipping_address.local_area}
              </h2>
              <h2 className="text-xl my-1 ">{order.shipping_address.city}</h2>
              <h2 className="text-xl my-1 ">{order.shipping_address.zone}</h2>
              <h2 className="text-xl my-1 ">{order.shipping_address.code}</h2>
              <h2 className="text-xl my-1 ">
                {order.shipping_address.country}
              </h2>
            </div>
          </div>
          <div className="w-full p-4 bg-slate-700 rounded-md">
            <div className="w-full">
              {/* <h2 className="text-2xl md:text-4xl font-medium">Order ID: {order.id}</h2> */}
              {/* <h2 className="text-2xl md:text-4xl font-medium">Order Date: {order.created_at}</h2> */}
              <h2 className="text-lg my-2 font-medium ">
                Order Status: <span className="uppercase">{order.status}</span>
              </h2>
              {/* <h2 className="text-lg my-2 font-medium">Order Items</h2> */}
              <h2 className="text-lg my-2 font-medium">
                Order Sub Total: {formatCurrency(order.sub_total)}
              </h2>
              <h2 className="text-lg my-2 font-medium">
                Order Shipping: {formatCurrency(shippingCost)}
              </h2>
              <Separator />
              <h2 className="text-lg my-2 font-medium">
                Order Total: {formatCurrency(shippingCost + order.sub_total)}
              </h2>

              <Button type="submit" className="bg-slate-900 mt-8 text-white w-full">Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
