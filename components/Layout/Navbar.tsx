import { Database } from "@/schema";
import DesktopNav from "./DesktopNav";
import { User } from "@supabase/supabase-js";

type Props = {
  user:User | null
  categories: Database['public']['Tables']['categories']['Row'][]

}

const Navbar = ({user, categories}:Props) => {

  console.log({user})

  return (
    <nav className="bg-black ">
      <div className="container">
        <DesktopNav user={user} categories={categories}  />
      </div>
    </nav>
  );
};
export default Navbar;
