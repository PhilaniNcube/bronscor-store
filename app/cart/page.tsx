import getUser from "@/lib/getUser";
import CartDetails from "./CartDetails";

const page = async () => {

  const user = await getUser()

  return <main className="container my-6">
    <CartDetails user={user} />
  </main>;
};
export default page;
