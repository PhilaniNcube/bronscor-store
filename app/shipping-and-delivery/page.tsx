const page = () => {
  return (
			<div className="container py-6 md:py-10">
				<h1 className="text-2xl font-semibold md:text-4xl">
					Shipping and Delivery
				</h1>
				<p className="py-4 text-lg font-medium">We deliver to all areas in the South Africa.</p>
				<ul className="list-disc list-inside">
					<li>
						Once an order has been received, we will process your order
						internally.
					</li>
					<li>
						Once the order is ready, a waybill will be sent to the customer.
					</li>{" "}
					<li>
						The order will be shipped to the customer. Depending on location or
						area, this will take between 1 to 3 days.
					</li>
					<li>Orders are delivered Monday to Friday.</li>
					<li>Orders are delivered via courier.</li>
					<li>Orders are delivered to the address provided by the customer.</li>
					<li>Orders are delivered during working hours.</li>


				</ul>
			</div>
		);
};
export default page;
