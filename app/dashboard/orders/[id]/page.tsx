import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getOrderById } from "@/lib/orders";
import CreateShipment from "./CreateShipment";

const page = async ({params: {id}}:{params:{id:string}}) => {

  const order = await getOrderById(id)



  return <div className="container">
    <h1 className="text-2xl font-semibold">{order.customer_id.first_name} {order.customer_id.last_name}</h1>
    <p className="text-md">{order.shipping_address.email}, {order.shipping_address.phone}</p>
    <Separator className="my-4" />
    <h2 className="text-xl font-semibold">Order Summary</h2>
    <p className="text-md">Status: {order.status}</p>
    <p className="text-md">Address: {order.shipping_address.street_address}</p>
    <p className="text-md">City: {order.shipping_address.city}</p>
    <p className="text-md">Suburb: {order.shipping_address.local_area}</p>
    <p className="text-md">Province: {order.shipping_address.zone}</p>

    <Separator className="my-4" />
   <CreateShipment order={order} />
  </div>;
};
export default page;
