import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <div className="w-full flex justify-end">
        <Link href="/dashboard/products/create">
          <Button className="bg-bronscor hover:shadow-md hover:bg-bronscor/90 text-black flex space-x-3 items-center justify-center"><PlusIcon />Add Product</Button>
        </Link>
      </div>
    </div>
  );
};
export default page;
