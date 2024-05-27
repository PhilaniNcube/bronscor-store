import Pagination from "@/components/Layout/Pagination";
import { getAllOrders } from "@/lib/orders";
import OrdersTable from "./OrdersTable";

const page = async ({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) => {

   const currentPage = +page || 1;

   const { orders, count } = await getAllOrders(currentPage, 8);

   const newCount = count || 0;

   const lastPage = Math.ceil(newCount / 8);

  return (
    <div>

      <OrdersTable orders={orders} />
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        total={newCount}
      />
    </div>
  );
};
export default page;
