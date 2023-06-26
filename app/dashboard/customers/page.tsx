import { getProfiles } from "@/lib/getUser";
import CustomersTable from "./CustomersTable";
import Pagination from "@/components/Layout/Pagination";

const page = async ({searchParams: {page}}:{searchParams:{page: string}}) => {

  const currentPage = +page || 1;

  const {profiles, count} = await getProfiles(currentPage,8)

   const lastPage = Math.ceil(count! / 8);


  return (
    <div className="w-1/2">
      <CustomersTable profiles={profiles} />
      <Pagination currentPage={currentPage} lastPage={lastPage} total={count!} />
    </div>
  );
};
export default page;
