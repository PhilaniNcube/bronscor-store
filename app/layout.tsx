import Navbar from '@/components/Layout/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseProvider from '@/Providers/SupabaseProvider'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getCategories } from '@/lib/categories'
import { Metadata } from "next";
import Footer from './Footer'
import CartProvider from '@/components/Providers/CartProvider'
import { Toaster } from "@/components/ui/toaster";
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

const supabase = createServerComponentClient({ cookies });

const userData =  supabase.auth.getUser();

const categoriesData =  getCategories();

const [{data: { user },}, categories] = await Promise.all([userData, categoriesData]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <CartProvider>
            <Navbar user={user} categories={categories} />
            <CartSlide />
            {children}
            <Footer categories={categories} />
            <Toaster />
          </CartProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
