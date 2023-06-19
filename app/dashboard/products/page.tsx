import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProducts } from "@/lib/products";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import ProductsTable from "./ProductsTable";
import { Metadata } from "next";
import Pagination from "@/components/Layout/Pagination";

export const metadata: Metadata = {
  title: "Bronscor",
  description:
    "Suppliers of Special Steels, Castings, 3D Printing Works and Tools & Hardware",
  assets: ["/images/logo.png"],
};

const page = async ({ searchParams }: { searchParams: { page: string } }) => {

   const page = searchParams.page ? parseInt(searchParams.page) : 1;




   const productsData = getProducts(page, 8);

   const [data] = await Promise.all([productsData]);
   const lastPage = Math.ceil(data?.count! / 8);

  return (
    <div>
      <div className="flex justify-end w-full">
        <Link href="/dashboard/products/create">
          <Button className="flex items-center justify-center space-x-3 text-black bg-bronscor hover:shadow-md hover:bg-bronscor/90">
            <PlusIcon />
            Add Product
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <div>
        <ProductsTable products={data.products} />
        <Pagination currentPage={page} lastPage={lastPage} total={data.count!} />
      </div>
    </div>
  );
};
export default page;
