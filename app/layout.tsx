import Navbar from '@/components/Layout/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from "next";
import Footer from './Footer'
import CartProvider from '@/components/Providers/CartProvider'
import { Toaster } from "@/components/ui/sonner";
import CartSlide from '@/components/Cart/CartSlide'




const inter = Inter({ subsets: ['latin'] })

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bronscor",
  description:
    "Suppliers of Special Steels, Castings, 3D Printing Works and Tools & Hardware",
  assets: ["/images/logo.png"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {





  return (
    <html lang="en">
      <body className={inter.className}>

          <CartProvider>
            <Navbar  />
            <CartSlide />
            {children}
            <Footer  />
            <Toaster />
          </CartProvider>

      </body>
    </html>
  );
}
