import { getSteelProducts } from "@/lib/products";
import Image from "next/image"

const page = async () => {

  const steel = await getSteelProducts();

  return (
    <main className="container py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {steel.map((item) => (
          <article
            key={item.id}
            className="w-full bg-slate-900 rounded-md shadow-md"
          >
            <Image
              width={400}
              height={400}
              src={item.image}
              alt={item.title}
              className="w-full object-cover aspect-video"
            />
            <div className="p-3">
              <h2 className="mt-2 text-lg">{item.title}</h2>
              <p className="text-slate-200 text-xs">{item.length}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};
export default page;
