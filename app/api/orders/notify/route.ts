
import { createClient } from "@/utils/supabase/service";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

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
			.select("*")
			.single();

		console.log({ order, error });

    if (error) {
      return NextResponse.json({ data: error });
    }

    return NextResponse.json({ data: order });
  }



	return NextResponse.json({ data: formData });
}
