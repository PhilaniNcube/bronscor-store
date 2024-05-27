import { getProfiles } from "@/lib/getUser";
import CustomersTable from "./CustomersTable";
import Pagination from "@/components/Layout/Pagination";

const page = async ({searchParams: {page}}:{searchParams:{page: string}}) => {

  const currentPage = +page || 1;

  const {profiles, count} = await getProfiles(currentPage,8)

  const newCount = count || 0;

   const lastPage = Math.ceil(newCount / 8) || 1;


  return (
    <div className="w-full">
      <CustomersTable profiles={profiles} />
      <Pagination currentPage={currentPage} lastPage={lastPage} total={newCount} />
    </div>
  );
};
export default page;
