import ProductItem from "@/components/Products/ProductItem";
import { Separator } from "@/components/ui/separator";

import { createClient } from "@/utils/supabase/server";



const page = async () => {
	const supabase = createClient();

	const { data: wishlist, error } = await supabase
		.from("wishlist")
		.select("*, product_id(*)");

	console.log(wishlist);

	return (
		<main className="container py-10">
			<h1 className="text-3xl font-semibold">Wishlist</h1>
			<Separator className="my-4" />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{wishlist?.map((item, idx) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<ProductItem key={idx} product={item?.product_id} />
				))}
			</div>
		</main>
	);
};
export default page;
