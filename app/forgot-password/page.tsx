import { createClient } from "@/utils/supabase/server";
import ForgotPassword from "./_components/ForgotPasswordForm";
import { redirect } from "next/navigation";

const page = async () => {

   const supabase = createClient();

  // get current user
  const {data: {user}} = await supabase.auth.getUser();

  if(user !== null) {
    redirect("/");
  }

  return <div className="flex items-center justify-center min-h-[80vh]">
    <ForgotPassword />
  </div>;
};
export default page;
