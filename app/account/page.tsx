import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Database } from "@/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

const page = async () => {

  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log('user', user?.id);

  const {data:profile, error} = await supabase.from('profiles').select('*').eq('id', user?.id).single();

  const {data:admin, error:adminError} = await supabase.rpc('is_admin').single();

  console.log('profile', profile, admin);

  return (
    <main className="container my-6">
      <div className="w-full">
        <h1 className="text-3xl font-semibold">My Account</h1>
        <Separator className="my-4" />
        <div className="flex w-full justify-start space-x-5 items-center">
          {admin === true && (
            <Link href="/dashboard" className="">
              <Button type="button" className="bg-bronscor hover:bg-black">Dashboard</Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};
export default page;
