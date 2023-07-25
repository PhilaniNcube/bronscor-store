import { getPaidOrders } from "@/lib/orders";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bronscor",
  description:
    "Suppliers of Special Steels, Castings, 3D Printing Works and Tools & Hardware",
  assets: ["/images/logo.png"],
};

const page = async () => {

  const {orders, count} = await getPaidOrders()

  const orderTotal = orders.reduce((total, order) => total + order.total_amount, 0)

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {orders.length} Orders
            </CardTitle>
            <CardContent>
              <CardDescription className="text-sm font-semibold">
                <p>Total Value: {formatCurrency(orderTotal)}</p>
              </CardDescription>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
export default page;
