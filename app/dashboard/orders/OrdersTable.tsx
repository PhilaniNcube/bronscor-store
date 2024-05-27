import type { Database } from "@/schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {format} from "date-fns"
import { formatCurrency } from "@/lib/utils";
import { Link2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ComponentProps = {
  orders: Database['public']['Tables']['orders']['Row'][]
}

const OrdersTable = ({orders}:ComponentProps) => {
  return (
			<Table>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell>Order Email</TableCell>
					<TableCell>Order Date</TableCell>
					<TableCell>Order Status</TableCell>
					<TableCell>Order Total</TableCell>
					<TableCell>Shipping Address</TableCell>
					<TableCell>City</TableCell>
					<TableCell>Actions</TableCell>
				</TableRow>
				<TableBody>
					{orders.map((order) => (
						<TableRow key={order.id}>
							<TableCell>
								{order.customer_id.first_name} {order.customer_id.last_name}
							</TableCell>
							<TableCell>{order.shipping_address.email}</TableCell>
							<TableCell>{format(new Date(order.created_at), "PPP")}</TableCell>
							<TableCell>
								{order.status === "paid" ? (
									<Badge className="uppercase bg-green-600">{order.status}</Badge>
								) : (
									<Badge className="uppercase">{order.status}</Badge>
								)}
							</TableCell>
							<TableCell>{formatCurrency(order.total_amount)}</TableCell>
							<TableCell>{order.shipping_address.street_address}</TableCell>
							<TableCell>{order.shipping_address.city}</TableCell>
							<TableCell>
								<Link href={`/dashboard/orders/${order.id}`}>
									<Link2Icon />
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
};
export default OrdersTable;
