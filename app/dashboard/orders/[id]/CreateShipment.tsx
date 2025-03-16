"use client"

import { Button } from "@/components/ui/button";
import type { Database } from "@/schema";
import type { Shipment } from "@/types";
import { createShipment } from "@/utils/actions/create-shipment";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";


const CreateShipment = ({ order }: { order: Database['public']['Tables']['orders']['Row'] }) => {

	const [pending, startTransition] = useTransition()

	const trackingNumber = order.tracking_number

	const router = useRouter()


	return (
		<form
			action={() => {
				startTransition(() => {
					createShipment(order);
					toast("Please wait while we create your shipment");
					router.refresh()
				});
			}}
		>
			{trackingNumber ? (
				<p>Tracking Number: {trackingNumber}</p>
			) : (
				<Button type="submit" className="bg-white text-black">
					{pending ? "Wait..." : "Create Shipment"}
				</Button>
			)}
		</form>
	);
};
export default CreateShipment;
