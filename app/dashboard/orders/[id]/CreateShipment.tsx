"use client"

import { Button } from "@/components/ui/button";
import { Database } from "@/schema";

const CreateShipment = ({order}:{order:Database['public']['Tables']['orders']['Row']}) => {

  const createShipment = async () => {


    let items = order.order_items;

    let group: any = [];
    const dimensions = items.map((item) => {
      let i = 1;
      while (i <= item.quantity) {
        group.push({
          width: item.product.dimensions?.width,
          height: item.product.dimensions?.height,
          length: item.product.dimensions?.depth,
          weight: item.product.dimensions?.weight! / 1000,
        });
        i++;
      }

      return group;
    });

    const url = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/api/shipment`);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: order.shipping_address.type,
        company: order.shipping_address.company,
        street_address: order.shipping_address.street_address,
        city: order.shipping_address.city,
        zone: order.shipping_address.zone,
        country: order.shipping_address.country,
        code: order.shipping_address.code,
        phone: order.shipping_address.phone,
        email: order.shipping_address.email,
        parcels: dimensions,
        first_name: order.customer_id.first_name,
        last_name: order.customer_id.last_name,
        orderValue: order.total_amount,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    console.log(res);
  };

  return <Button onClick={createShipment}>Create Shipment</Button>;
};
export default CreateShipment;
