import DesktopNav from "./DesktopNav";
import { User } from "@supabase/supabase-js";

type Props = {
  user:User | null
}

const Navbar = ({user}:Props) => {

  console.log({user})

  return (
    <nav className="bg-black ">
      <div className="container">
        <DesktopNav user={user} />
      </div>
    </nav>
  );
};
export default Navbar;
