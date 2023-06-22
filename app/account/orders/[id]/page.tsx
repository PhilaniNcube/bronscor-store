import { getOrderById } from "@/lib/orders";

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

  console.log(res)

  return (
    <div className="my-6">
      <div className="container mx-auto">
        <pre>{JSON.stringify(res, null, 2)}</pre>
      </div>
    </div>
  );
};
export default page;
