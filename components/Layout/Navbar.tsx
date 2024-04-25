import type { Database } from "@/schema";
import DesktopNav from "./DesktopNav";
import type { User } from "@supabase/supabase-js";
import MobileNav from "./MobileNav";
import { createClient } from "@/utils/supabase/server";
import { getCategories } from "@/lib/categories";

type Props = {
  user:User | null
  categories: Database['public']['Tables']['categories']['Row'][]

}

const Navbar = async () => {

  const supabase = createClient()

 const userData = supabase.auth.getUser();

	const categoriesData = getCategories();

	const [
		{
			data: { user },
		},
		categories,
	] = await Promise.all([userData, categoriesData]);

	return (
		<nav className="bg-black ">
			<div className="container">
				<DesktopNav user={user} categories={categories} />
				<MobileNav user={user} categories={categories} />
			</div>
		</nav>
	);
};
export default Navbar;
