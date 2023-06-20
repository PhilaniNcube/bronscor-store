import getUser, { getProfile } from "@/lib/getUser";
import CartDetails from "./CartDetails";

const page = async () => {

const profile = await getProfile()

  return (
    <main className="container my-6">
      <CartDetails user={profile} />
    </main>
  );
};
export default page;
