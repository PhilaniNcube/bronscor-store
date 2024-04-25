/* eslint-disable @next/next/no-img-element */
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/lib/categories";
import type { Database } from "@/schema";
import { MailIcon, PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


type Props = {
  categories: Database["public"]["Tables"]["categories"]["Row"][];
}

export const links = [
  {
    title: "About Us",
    href: "/about-us"
  },
  {
    title: "Contact Us",
    href: "/contact-us"
  },
  {
    title: "Terms & Conditions",
    href: "/terms-and-conditions"
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy"
  },
  {
    title: "Returns & Refunds",
    href: "/returns-and-refunds"
  },
  {
    title: "Shipping & Delivery",
    href: "/shipping-and-delivery"
  }
]

const Footer = async () => {

  const categories = await getCategories();

  return (
    <footer className="bg-black text-amber-600">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Grid One */}
          <div className="flex flex-col">
            <Image
              src="/images/express.png"
              width={822}
              height={303}
              alt="Logo"
              className="w-full max-w-[190px] object-cover"
            />

            {/* <p className="text-md text-amber-600 ">
              We have the tools and supplies you need to get the job done right.{" "}
            </p> */}

            <div className="w-full mt-4">
              <p className="text-xl font-medium">Accepted Payment Methods</p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="flex items-center justify-between">
                  <img
                    src="/images/visa_logo.svg"
                    alt="Visa"
                    className="object-cover w-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <img
                    src="/images/mc.svg"
                    alt="Visa"
                    className="object-cover w-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <img
                    src="/images/payfast_white.svg"
                    alt="Payfast"
                    className="object-cover w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Grid Two */}
          <div className="w-full">
            <h3 className="text-xl font-medium">Categories</h3>

            <ul className="flex flex-col mt-8 space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="text-sm font-medium text-amber-600 hover:text-slate-100"
                >
                  {category.name}
                </Link>
              ))}
            </ul>
          </div>

          {/* Grid Three */}
          <div className="w-full">
            <h3 className="text-xl font-medium">Information</h3>
            <ul className="flex flex-col mt-8 space-y-2">
              {links.map((link, idx) => (
                <Link
                  key={link.title}
                  href={`${link.href}`}
                  className="text-sm font-medium text-amber-600 hover:text-slate-100"
                >
                  {link.title}
                </Link>
              ))}
            </ul>
          </div>

          {/* Grid Four */}
          <div className="w-full">
            <h3 className="text-xl font-medium">Contact Us</h3>
            <ul className="flex flex-col mt-8 space-y-2">
              <li className="flex items-center justify-start space-x-4 text-sm font-medium text-amber-600 hover:text-slate-100">
                <PhoneCallIcon className="w-5 h-5 mr-2" />
                <a href="tel:+27822095367">+27 82 209 5367 (Whatsapp Only)</a>
              </li>
              <li className="flex items-center justify-start space-x-4 text-sm font-medium text-amber-600 hover:text-slate-100">
                <PhoneCallIcon className="w-5 h-5 mr-2" />
                <a href="tel:+27414531530">+27 41 453 1530 (PE)</a>
              </li>
              <li className="flex items-center justify-start space-x-4 text-sm font-medium text-amber-600 hover:text-slate-100">
                <PhoneCallIcon className="w-5 h-5 mr-2" />
                <a href="tel:+27217730908">+27 21 773 0908 (CPT)</a>
              </li>
              <li className="flex items-center justify-start space-x-4 text-sm font-medium text-amber-600 hover:text-slate-100">
                <PhoneCallIcon className="w-5 h-5 mr-2" />
                <a href="tel:+27106300501">+27 10 630 0501 (JHB)</a>
              </li>
              <li className="flex items-center justify-start space-x-4 text-sm font-medium text-amber-600 hover:text-slate-100">
                <MailIcon className="w-5 h-5 mr-2" />
                <a href="mailto:onlinestore@bronscorcc.co.za">
                  vimal@bronscorcc.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
