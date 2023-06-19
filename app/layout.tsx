import Navbar from '@/components/Layout/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseProvider from '@/Providers/SupabaseProvider'
import { createClient } from '@supabase/supabase-js'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getCategories } from '@/lib/categories'
import { Metadata } from "next";
import Footer from './Footer'


const inter = Inter({ subsets: ['latin'] })


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




const UserData =  supabase.auth.getUser();

  //  let { data: admin, error } = await supabase.rpc("is_admin");

   const categoriesData =  getCategories();

   const [{
     data: { user },
   }, categories] = await Promise.all([ UserData, categoriesData]);




  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <Navbar user={user} categories={categories}  />
          {children}
          <Footer categories={categories} />
        </SupabaseProvider>
      </body>
    </html>
  );
}
