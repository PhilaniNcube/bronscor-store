"use client";

import type { Database } from "@/schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { deleteProductById } from "@/utils/actions/product-actions";
import { Button } from "@/components/ui/button";

type ProductsTableProps = {
  products: Database['public']['Tables']['products']['Row'][]
};

const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="">Name</TableHead>
						<TableHead className="">SKU/ID</TableHead>
						<TableHead className="">Brand</TableHead>
						<TableHead className="">Category</TableHead>
						<TableHead className="">Price</TableHead>
						<TableHead className="">In Stock</TableHead>
						<TableHead className="">Featured</TableHead>
						<TableHead className="">View</TableHead>
						<TableHead className="">Delete</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product) => (
						<TableRow key={product.id}>
							<TableCell>{product.name}</TableCell>
							<TableCell>{product.item_id}</TableCell>
							<TableCell>{product.brand_id.name}</TableCell>
							<TableCell>{product.category_id.name}</TableCell>
							<TableCell>{formatCurrency(product.price)}</TableCell>
							<TableCell>
								<Toggle
									id={product.id}
									checked={product.in_stock}
									attr="in_stock"
								/>
							</TableCell>
							<TableCell>
								<Toggle
									id={product.id}
									checked={product.featured}
									attr="featured"
								/>
							</TableCell>
							<TableCell>
								<Link href={`/dashboard/products/${product.id}`}>
									<EyeIcon />
								</Link>
							</TableCell>
							<TableCell>
								<form action={deleteProductById}>
									<input type="hidden" name="id" value={product.id} />
									<Button variant="destructive" size="sm" type="submit">
                    <Trash2Icon />
                  </Button>

								</form>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
};
export default ProductsTable;


const Toggle = ({ checked, id, attr }:{checked:boolean, id:string, attr:string}) => {

  const router = useRouter();

const supabase = createClient();

const [isChecked, setIsChecked] = useState(checked);


async function toggleChecked() {

    if(attr === 'in_stock') {
      const { data, error } = await supabase
      .from('products')
      .update({ in_stock: !isChecked })
      .eq('id', id).select('*')

       console.log({ data, error });
      if (error) console.log(error);
      if (data) {
        setIsChecked(!isChecked);
            router.refresh();
      };


    } else if(attr === 'featured') {
      const { data, error } = await supabase
        .from("products")
        .update({ featured: !isChecked })
        .eq("id", id)
        .select("*");


      console.log({ data, error });
      if (error) console.log(error);
      if (data) {
        setIsChecked(!isChecked);
        router.refresh();
      }
    }



  return;
}

  return (
    <Switch
      key={id}
      defaultChecked={isChecked}
      checked={isChecked}
      onClick={toggleChecked}
      id={id}
    />
  );

}
