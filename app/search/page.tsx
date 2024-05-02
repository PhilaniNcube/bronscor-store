import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";


const page = async ({
	searchParams,
}: {
	searchParams: {
		query: string;
	};
}) => {

  const supabase = createClient();
  const { query } = searchParams;

  const { data, error } = await supabase.from("products").select("*").ilike("name", `%${query}%`);

  console.log({ data, error });

  if (error || data === null || data.length === 0) {
    console.log(error);
    return (
      <div className="min-h-[500px] container">
        <h1>There are no products matching your search term</h1>
      </div>
    );
  }


	return (
		<div className="container py-10">
			<h1 className="text-xl font-bold">
				Search results for <span className="underline">{query}</span>
			</h1>
			<Separator className="my-3" />
			<div className="grid grid-cols-1 gap-4">
				{data.map((product) => (
					<Link
						href={`/products/${product.slug}`}
						prefetch={false}
						className="flex items-start justify-between px-3 py-2 gap-x-6 hover:bg-slate-800"
						key={product.id}
					>
						<div className="flex items-center justify-start gap-4">
							<img
								src={product.image}
								alt={product.name}
								className="object-cover w-20 h-20"
							/>
							<div className="flex flex-col gap-y-2">
								<h2>{product.name}</h2>
								<p className="text-xs line-clamp-2">{product.description}</p>
							</div>
						</div>
						<p className="text-lg font-semibold">
							{formatCurrency(product.price)}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
};
export default page;
