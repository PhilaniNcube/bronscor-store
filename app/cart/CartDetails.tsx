"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
	totalPriceSelector,
	addToCart,
	removeFromCart,
	deleteFromCart,
	clearCart,
} from "../store/features/cartSlice";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MinusSquare, PlusSquare } from "lucide-react";
import { LucideTrash } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import SignIn from "@/components/Modals/SignIn";
import type { Database } from "@/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import SignUp from "@/components/Modals/SignUp";
import { createClient } from "@/utils/supabase/client";

const provinces = [
	"Eastern Cape",
	"Free State",
	"Gauteng",
	"KwaZulu-Natal",
	"Limpopo",
	"North West",
	"Northern Cape",
	"Mpumalanga",
	"Western Cape",
] as const;

const formSchema = z.object({
	street_address: z.string().min(2).max(50),
	company: z.string().nullable(),
	type: z.enum(["business", "residential", "school"]),
	local_area: z.string(),
	city: z.string(),
	zone: z.enum(provinces),
	country: z.string(),
	code: z.string(),
	email: z.string().email(),
	phone: z
		.string()
		.min(10, { message: "Phone number must be 10 digits" })
		.max(10, { message: "Phone number must be 10 digits" }),
});

type ComponentProps = {
	userId: string | undefined;
};

type Group = {
	width?: number;
	height?: number;
	length?: number;
	weight?: number;
}[];

const CartDetails = ({ userId }: ComponentProps) => {
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			street_address: "",
			company: "",
			type: "business",
			code: "",
			local_area: "",
			city: "",
			zone: provinces[0],
			country: "ZA",
			phone: "",
			email: "",
		},
	});

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = form;

	const supabase = createClient();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

		const { data: order, error: order_error } = await supabase
			.from("orders")
			.insert([
				{
					status: "pending",
					order_items: cartItems,
					customer_id: userId,
					sub_total: totalPrice,
					shipping_address: {
						street_address: values.street_address,
						company: values.company,
						type: values.type,
						local_area: values.local_area,
						city: values.city,
						zone: values.zone,
						country: values.country,
						code: values.code,
						phone: values.phone,
						email: values.email,
					},
				},
			])
			.select("*")
			.single();

		console.log("Create Order", { order, order_error });

		if (order_error) {
			console.log("Order Creation Error", order_error);
		} else if (order) {
			const items = order.order_items;

			// create an array of objects with the dimensions of each item
			const newGroup: Group = [];

			//for eact item in the order, create an object with the dimensions of the item
			items.map((item) => {
				let i = 1;
				while (i <= item.quantity) {
					newGroup.push({
						width: item.product.dimensions?.width,
						height: item.product.dimensions?.height,
						length: item.product.dimensions?.depth,
						weight: item.product.dimensions?.weight
							? item.product.dimensions?.weight / 1000
							: 0,
					});
					i++;
				}

				return newGroup;
			});

			console.log("New Group", newGroup);

			const group: Group = [];
			const dimensions = items.map((item) => {
				let i = 1;
				while (i <= item.quantity) {
					group.push({
						width: item.product.dimensions?.width,
						height: item.product.dimensions?.height,
						length: item.product.dimensions?.depth,
						weight: item.product.dimensions?.weight
							? item.product.dimensions?.weight / 1000
							: 0,
					});
					i++;
				}

				return group;
			});

			const url = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/api/shipping`);

			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, POST, PUT",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
				},
				body: JSON.stringify({
					type: order.shipping_address.type,
					company: order.shipping_address.company,
					street_address: order.shipping_address.street_address,
					city: order.shipping_address.city,
					zone: order.shipping_address.zone,
					country: order.shipping_address.country,
					code: order.shipping_address.code,
					parcels: dimensions,
					group: newGroup,
				}),
			})
				.then((res) => res.json())
				.catch((err) => console.log(err));

			if (res.data.error) {
				console.log(`${res.details} ${JSON.stringify(res.error)}`);
				alert(`${res.data.details}`);
				setLoading(false);
				return;
			}

			const calculatedCost = await res.data.rates[0].rate;

			const shippingCost = order.sub_total < 1000 ? Number(calculatedCost) : 0;

			const { data: updatedOrder, error: updatedOrderError } = await supabase
				.from("orders")
				.update({
					shipping_cost: Number(shippingCost.toFixed(2)),
					total_amount: Number((shippingCost + totalPrice).toFixed(2)),
				})
				.eq("id", order.id)
				.select("*")
				.single();

			if (updatedOrderError || !updatedOrder) {
				alert("There was an error saving the order. Please try again.");
				setLoading(false);
			}

			if (updatedOrder) {
				console.log({ updatedOrder });
				alert("Order saved successfully");
				setLoading(false);
				router.push(`/account/orders/${updatedOrder.id}`);
				setLoading(false);
			}
		}
	}

	const router = useRouter();

	const cartItems = useAppSelector((state) => state.cart.cartItems);
	const totalPrice = useAppSelector(totalPriceSelector);

	const dispatch = useAppDispatch();

	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold">Cart Details</h1>

			<Separator className="my-4" />
			<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
				<div className="w-full">
					{cartItems.length === 0 ? (
						<div>
							<p className="text-xl font-medium text-center">
								Your cart is empty...
							</p>

							<Button onClick={() => router.back()} variant="outline">
								<ArrowLeft />
								Back{" "}
							</Button>
						</div>
					) : (
						cartItems.map((item) => (
							<div
								className="flex items-start w-full py-2 space-x-3 border-b border-slate-200"
								key={item.product.id}
							>
								<Image
									src={item.product.image}
									width={200}
									height={200}
									alt={item.product.name}
									className="object-cover w-24 h-24 shadow md:h-32 md:w-32 aspect-square"
								/>
								<div className="flex-1">
									<h3 className="font-medium text-md">{item.product.name}</h3>
									<p className="text-sm font-medium">
										Quantity: {item.quantity}
									</p>
									<p className="text-sm font-medium">
										Price Per Item: {formatCurrency(item.product.price)}
									</p>

									<div className="flex items-center justify-start w-full mt-2 space-x-4">
										<Button
											variant="secondary"
											type="button"
											onClick={() => dispatch(removeFromCart(item))}
										>
											<MinusSquare />
										</Button>
										<Button
											variant="secondary"
											type="button"
											onClick={() => dispatch(addToCart(item))}
										>
											<PlusSquare />
										</Button>
									</div>
								</div>
								<div className="flex flex-col justify-between h-full">
									<Button
										variant="destructive"
										type="button"
										onClick={() => dispatch(deleteFromCart(item))}
									>
										<LucideTrash />
									</Button>
									<p className="mt-4 text-xl font-medium">
										{formatCurrency(item.quantity * item.product.price)}
									</p>
								</div>
							</div>
						))
					)}
				</div>

				<div className="w-full text-black bg-amber-600">
					<div className="flex flex-col items-start w-full p-3 space-y-4 rounded-md">
						<h2 className="text-xl font-bold">Order Summary</h2>
						<div className="flex items-center justify-between w-full">
							<p className="text-lg font-medium">Cart Total</p>
							<p className="text-lg font-medium">
								{formatCurrency(totalPrice)}
							</p>
						</div>
						<Separator className="text-white bg-gray-900" />
						{userId ? (
							<div className="w-full">
								<h3 className="text-xl font-medium">Add Delivery Address</h3>

								<Form {...form}>
									<form
										onSubmit={handleSubmit(onSubmit)}
										className="w-full mt-3"
									>
										<div className="flex flex-col w-full space-y-2">
											<Label htmlFor="street_address">Street Address</Label>
											<Input
												{...register("street_address")}
												type="text"
												id="street_address"
												name="street_address"
												className="text-gray-900 bg-white"
												required
											/>
										</div>
										<div className="flex flex-col w-full mt-2 space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input
												{...register("email")}
												type="text"
												id="email"
												name="email"
												className="text-gray-900 bg-white"
												required
											/>
										</div>
										<div className="flex flex-col w-full mt-2 space-y-2">
											<Label htmlFor="company">Company</Label>
											<Input
												{...register("company")}
												type="text"
												id="company"
												name="company"
												className="text-gray-900 bg-white"
											/>
										</div>

										<div className="flex items-center justify-between w-full gap-4 mt-3">
											<div className="flex flex-col w-full space-y-2">
												<Label htmlFor="local_area">Suburb</Label>
												<Input
													{...register("local_area")}
													type="text"
													id="local_area"
													name="local_area"
													className="text-gray-900 bg-white"
												/>
											</div>
											<div className="flex flex-col w-full space-y-2">
												<Label htmlFor="city">City</Label>
												<Input
													{...register("city")}
													type="text"
													id="city"
													name="city"
													className="text-gray-900 bg-white"
												/>
											</div>
										</div>

										<div className="flex items-center justify-between w-full gap-4 mt-3">
											<div className="flex flex-col w-full space-y-2">
												<Label htmlFor="phone">Phone Number</Label>
												<Input
													{...register("phone")}
													type="tel"
													id="phone"
													name="phone"
													className="text-gray-900 bg-white"
												/>
											</div>
											<div className="flex flex-col w-full space-y-2">
												<Label htmlFor="code">Postal Code</Label>
												<Input
													{...register("code")}
													type="text"
													id="code"
													name="code"
													className="text-gray-900 bg-white"
												/>
											</div>
										</div>

										<div className="flex items-center justify-between w-full gap-4 mt-3">
											<div className="flex flex-col w-full space-y-2">
												<FormField
													control={form.control}
													name="type"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Select Address Type</FormLabel>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}
															>
																<FormControl>
																	<SelectTrigger className="w-full">
																		<SelectValue placeholder="Select Province" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	<SelectItem value="business">
																		Business
																	</SelectItem>
																	<SelectItem value="residential">
																		Residential
																	</SelectItem>
																	<SelectItem value="school">School</SelectItem>
																</SelectContent>
															</Select>

															<FormMessage />
														</FormItem>
													)}
												/>

												{/* <Label htmlFor="type">Select Address Type</Label>
                        <select {...register("type")}>
                          <option
                            className="p-2 text-lg hover:bg-slate-100"
                            value="business"
                          >
                            Business
                          </option>
                          <option
                            value="residential"
                            className="p-2 text-lg hover:bg-slate-100"
                          >
                            Residential
                          </option>
                          <option
                            className="p-2 text-lg hover:bg-slate-100"
                            value="school"
                          >
                            School
                          </option>
                        </select> */}
											</div>
											<div className="flex flex-col w-full space-y-2">
												<FormField
													control={form.control}
													name="zone"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Province</FormLabel>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}
															>
																<FormControl>
																	<SelectTrigger className="w-full">
																		<SelectValue placeholder="Select Province" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	{provinces.map((province) => (
																		<SelectItem key={province} value={province}>
																			{province}
																		</SelectItem>
																	))}
																</SelectContent>
															</Select>

															<FormMessage />
														</FormItem>
													)}
												/>
												{/* <Select {...register("code")}>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              {...register("zone")}
                              placeholder="Select Province"
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {provinces.map((province) => (
                              <SelectItem key={province} value={province}>
                                {province}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select> */}
											</div>
										</div>

										<Button
											type="submit"
											className="w-full mt-6 bg-black text-amber-600"
										>
											{loading ? "Loading Please wait..." : "Save"}
										</Button>
									</form>
								</Form>
							</div>
						) : (
							<div className="flex-col items-center w-full bg-amber-600">
								<p className="mb-4 text-center">
									Please Sign In Or Sign Up To Place An Order
								</p>
								<div className="flex items-center justify-center w-full py-4 space-x-4 bg-amber-600">
									<SignIn />
									<SignUp />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default CartDetails;
