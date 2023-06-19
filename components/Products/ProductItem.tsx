
import Image from "next/image";
import { Database } from "@/schema";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ProductProps = {
  product: Database["public"]["Tables"]["products"]["Row"];
};

const ProductItem = ({ product }: ProductProps) => {
  return (
    <div className="relative rounded-md text-white overflow-clip border border-slate-300 flex flex-col @container ">
      <div className="flex w-full flex-col @sm:flex-row @lg:flex-col">
        <div className="p-2">
          <Image
            src={product.image}
            width={600}
            height={600}
            alt={product.name}
            className=" w-full @sm:w-1/3 @sm:p-2 h-full object-cover aspect-square"
          />
        </div>

        <div className=" z-10 flex flex-col @sm:justify-center w-full p-4">
          <h3 className="text-lg font-semibold text-black">{product.name}</h3>
          <p className="text-md font-medium text-gray-700">
            {formatCurrency(product.price)}
          </p>
          <Link href={`/products/${product.slug}`}>
            <Button className="mt-3 bg-bronscor hover:shadow-md hover:bg-black">
              View Product
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default ProductItem;
