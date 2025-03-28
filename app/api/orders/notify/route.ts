
import { createClient } from "@/utils/supabase/service";
import { createServerClient } from "@supabase/ssr";
import { sub } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest, res: Response) {
	const supabase = createClient();


	const formData = await req.formData();

	const values = Object.fromEntries(formData.entries());

	console.log(JSON.stringify(values, null, 2));

	const id = values.item_name as string;
	const status = values.payment_status as string;
	const pf_payment_id = values.pf_payment_id as string;

	if (status !== "COMPLETE") {
		return NextResponse.json({ data: values });
	}

  if (status === "COMPLETE") {
  const { data: order, error } = await supabase
			.from("orders")
			.update({
				status: "paid",
			})
			.eq("id", id)
			.select("*, customer_id(*)")
			.single();

    if (error || order === null) {
      return NextResponse.json({ message: error.message || 'Error updating the order' });
    }



  const orderItems = order?.order_items.map((item) => {
    return {
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      subtotal: item.product.price * item.quantity,
    }
  });

		const { data: orderProducts, error: orderItemsError } = await supabase.from('order_items').insert(orderItems);



    await resend.batch.send([
			{
				from: "Bronscor <onlinestore@bronscorcc.co.za>",
				to: [					
					"countersales@bronscorcc.co.za",
					order.shipping_address.email,
				],
				subject: "Order Confirmation",
				text: `Thank you for your order. Your order has been received and is being processed. Your order number is ${order.id}.`,
				html: `<div style="max-width: 500px; margin: auto;">
                    <h1 style="font-size: 22px; font-weight: bold;">Order Confirmation</h1>
                    <p>Thank you for your order. Your order has been received and is being processed. Your order number is ${order.id}.</p>
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/account">View your account</a>
                 </div>`,
			},
			{
				from: "Bronscor <onlinestore@bronscorcc.co.za>",
				to: [
					"onlinestore@bronscorcc.co.za",
					"countersales@bronscorcc.co.za",
					// order.shipping_address.email,
					"ncbphi001@gmail.com",
				],
				subject: "New Order Received",
				text: `You have just received a new order. Order number is ${order.id}.`,
				html: `<div style="max-width: 500px; margin: auto;">
                    <h1 style="font-size: 22px; font-weight: bold;">New Order</h1>
                    <p>You have received a new order. The order number is ${order.id}.</p>
                    <h2>Total: R${order.total_amount}.</h2>
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/orders/${order.id}">View order</a>
                    <div>
                      <h3>Customer Details</h3>
                      <p>${order.customer_id.first_name} ${order.customer_id.last_name}</p>
                      <p>${order.shipping_address.email}</p>
                      <p>${order.shipping_address.phone}</p>
                    </div>
                 </div>`,
			},
		]);


    return NextResponse.json({ data: order });
  }



	return NextResponse.json({ data: formData });
}
