/* eslint-disable @next/next/no-img-element */
import { Separator } from "@/components/ui/separator";
import { Database } from "@/schema";
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

const Footer = ({categories}:Props) => {
  return (
    <footer className="bg-black text-amber-600">
      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between">
                  <img
                    src="/images/visa_logo.svg"
                    alt="Visa"
                    className="w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <img
                    src="/images/mc.svg"
                    alt="Visa"
                    className="w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <img
                    src="/images/payfast_white.svg"
                    alt="Payfast"
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Grid Two */}
          <div className="w-full">
            <h3 className="text-xl font-medium">Categories</h3>

            <ul className="space-y-2 mt-8 flex flex-col">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="text-amber-600 hover:text-slate-100 text-sm font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </ul>
          </div>

          {/* Grid Three */}
          <div className="w-full">
            <h3 className="text-xl font-medium">Information</h3>
            <ul className="space-y-2 mt-8 flex flex-col">
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  href={`${link.href}`}
                  className="text-amber-600 hover:text-slate-100 text-sm font-medium"
                >
                  {link.title}
                </Link>
              ))}
            </ul>
          </div>

          {/* Grid Four */}
          <div className="w-full">
            <h3 className="text-xl font-medium">Contact Us</h3>
            <ul className="space-y-2 mt-8 flex flex-col">
              <li className="text-amber-600 flex items-center justify-start space-x-4 hover:text-slate-100 text-sm font-medium">
                <PhoneCallIcon className="w-5 h-5 mr-2" />
                <a href="tel:+27 11 568 0421">+27 11 568 0421</a>
              </li>
              <li className="text-amber-600 flex items-center justify-start space-x-4 hover:text-slate-100 text-sm font-medium">
                <MailIcon className="w-5 h-5 mr-2" />
                <a href="mailto:onlinestore@bronscorcc.co.za">
                  onlinestore@bronscorcc.co.za
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
