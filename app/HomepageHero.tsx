import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomepageHero = () => {
  return (
    <div className="w-full flex relative h-[70vh] md:h-[60vh] isolate">

      <Image src="/images/action.webp" width={1920} height={620} alt="Hero Image" className="w-full h-full object-cover absolute inset-0 z-0" />
      <div className="bg-slate-300/60 flex w-full z-10">
        <div className="container flex flex-col justify-center items-center">
          <div className="flex items-center justify-center space-x-4 bg-black p-6">
      <Image src="/images/express.png" width={1920} height={620} alt="Hero Image" className="w-52 object-cover" />
      <Image src="/images/ingco.webp" width={1920} height={620} alt="Hero Image" className="w-52 object-cover" />
          </div>
          <Link href="/products">
            <Button className="bg-amber-600 hover:shadow-md hover:bg-amber-500 text-black uppercase font-semibold text-lg flex space-x-3 items-center justify-center mt-4">Shop Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomepageHero;
