import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="container my-6">
      <h1 className="text-2xl md:text-3xl font-medium">Order Failed</h1>

      <Link className="mt-4" href="/">
        <Button className="bg-gray-800 text-white" type="button">Go back to the homepage</Button>
      </Link>
    </div>
  );
};
export default page;
