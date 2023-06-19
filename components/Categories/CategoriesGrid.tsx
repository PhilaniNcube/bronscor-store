import { Database } from "@/schema";
import Link from "next/link";

type Props = {
  categories: Database["public"]["Tables"]["categories"]["Row"][];
}

const CategoriesGrid = ({categories}:Props) => {
  return (
    <section className="py-8">
      <div className="container w-full">
        <h2 className="text-2xl font-bold mb-4">Shop By Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.slug}`}
              key={category.id}
              className="overflow-clip hover:shadow-md flex items-center justify-center rounded-md p-3 border border-slate-200"
            >
              <h3 className="text-lg font-semibold text-black">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CategoriesGrid;
