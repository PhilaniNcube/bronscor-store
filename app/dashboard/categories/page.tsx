import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/lib/categories";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const page = async () => {

  const categoriesData = getCategories()

  const [categories] = await Promise.all([categoriesData]);

  return (
    <div>
      <h1 className="text-3xl font-medium">Categories</h1>
      <Separator className="my-4" />
      <div className="flex w-full justify-between items-center mt-4">
        <Link href="/dashboard/categories/create">
          <Button className="bg-amber-500 hover:bg-amber-500/80 hover:shadow-md">
            <PlusIcon /> Create Category
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle> {category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <Link href={`/dashboard/categories/${category.id}`}>
                  <Button className="bg-amber-500">
                    View
                  </Button>
                </Link>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default page;
