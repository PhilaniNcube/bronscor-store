"use client";

import { Database } from "@/schema";
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
import { EyeIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useSupabase } from "@/Providers/SupabaseProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
          <TableHead className="">In Stock</TableHead>
          <TableHead className="">Featured</TableHead>
          <TableHead className="">View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.item_id}</TableCell>
            <TableCell>{product.brand_id.name}</TableCell>
            <TableCell>{product.category_id.name}</TableCell>
            <TableCell>
              <Toggle id={product.id} checked={product.in_stock} attr="in_stock" />
            </TableCell>
            <TableCell>
              <Toggle id={product.id} checked={product.featured} attr="featured" />
            </TableCell>
            <TableCell>
              <Link href={`/dashboard/products/${product.id}`}>
                <EyeIcon />
              </Link>
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

const {supabase} = useSupabase();

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
