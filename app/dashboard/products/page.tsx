import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProducts } from "@/lib/products";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import ProductsTable from "./ProductsTable";

const page = async () => {

  const productsData = getProducts()

  const [data] = await Promise.all([productsData]);

  return (
    <div>
      <div className="w-full flex justify-end">
        <Link href="/dashboard/products/create">
          <Button className="bg-bronscor hover:shadow-md hover:bg-bronscor/90 text-black flex space-x-3 items-center justify-center">
            <PlusIcon />
            Add Product
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <div>
        <ProductsTable products={data.products} />
      </div>
    </div>
  );
};
export default page;
