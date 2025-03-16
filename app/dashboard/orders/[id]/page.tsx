
import { Separator } from "@/components/ui/separator";
import { getOrderById } from "@/lib/orders";
import CreateShipment from "./CreateShipment";
import { Badge } from "@/components/ui/badge";

const page = async ({ params: { id } }: { params: { id: string } }) => {

  const order = await getOrderById(id)



  return <div className="container">
    <h1 className="text-2xl font-semibold">{order.customer_id.first_name} {order.customer_id.last_name}</h1>
    <p className="text-md">{order.shipping_address.email}, {order.shipping_address.phone}</p>
    <Separator className="my-4" />
    <h2 className="text-xl font-semibold">Order Summary {order.status === "paid" ? <Badge className="bg-green-500 uppercase">
      {order.status}
    </Badge> : <Badge variant="destructive" className="uppercase">
      {order
        .status}
    </Badge>}</h2>
    <p className="text-md flex items-center "></p>
    <p className="text-md">Address: {order.shipping_address.street_address}</p>
    <p className="text-md">City: {order.shipping_address.city}</p>
    <p className="text-md">Suburb: {order.shipping_address.local_area}</p>
    <p className="text-md">Province: {order.shipping_address.zone}</p>

    <Separator className="my-4" />
    <h2 className="text-xl font-semibold">Order Items</h2>
    <div className="mt-4">
      {order.order_items && order.order_items.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {order.order_items.map((item: any, index: number) => (
            <div key={index} className="border rounded-md p-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img src={item.product?.image || '/product-image-placeholder.svg'} alt={item.product?.name || 'Product Image'} className="w-16 h-16 object-cover" />
                <div>
                  <p className="font-semibold">{item.product?.name || 'Product Name Unavailable'}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  {item.product_variant && (
                    <p className="text-sm text-gray-500">Variant: {item.product_variant}</p>
                  )}
                </div>
              </div>

              <p className="font-medium">R {item.product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No order items available</p>
      )}
    </div>

    <Separator className="my-4" />
    <CreateShipment order={order} />
  </div>;
};
export default page;
