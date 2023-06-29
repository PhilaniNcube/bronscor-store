import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomepageHero = () => {
  return (
    <div className="w-full flex relative h-[70vh] md:h-[60vh]">

      <Image src="/images/ingco.webp" width={1920} height={620} alt="Hero Image" className="w-40 object-cover absolute top-4 right-10 z-20" />
      <Image src="/images/action.webp" width={1920} height={620} alt="Hero Image" className="w-full h-full object-cover absolute inset-0 z-0" />
      <div className="bg-slate-300/60 flex w-full z-10">
        <div className="container flex flex-col justify-center items-start">
          <h1 className="text-black font-semibold text-3xl md:text-4xl lg:text-5xl max-w-[30ch]">
            Steels, Castings, 3D Printing Works and Tools &
            Hardware
          </h1>
          <Link href="/products">
            <Button className="bg-bronscor hover:shadow-md hover:bg-gray-800 text-white uppercase font-semibold text-lg flex space-x-3 items-center justify-center mt-4">Shop Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomepageHero;
