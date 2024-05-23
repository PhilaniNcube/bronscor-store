"use client"

import Image from 'next/image'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import type { Database } from "@/schema";
import { Trash2Icon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
import slugify from "slugify";
import { createClient } from '@/utils/supabase/client';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";


const ProductSchema = z.object({
  name: z
    .string()
    .min(2, "Too Short!")
    .max(50, "Product name cannot be longer than 50 characters!"),
  description: z
    .string()
    .min(2, "Too Short!")
    .max(700, "Description cannot be longer than 300 characters"),
  item_id: z.string(),
  price: z.string(),
  short_description: z
    .string()
    .min(3, "Description cannot be shorter than 3 characters")
    .max(100, "Description cannot be longer than 50 characters"),
  dimensions: z.object({
    width: z.string({required_error: "Width is required"}),
    height: z.string({required_error: "Height is required"}),
    depth: z.string({required_error: "Depth is required"}),
    weight: z.string({required_error: "Weight is required"}),
  }),
  brand_id: z.string(),
  // category_id: z.string(),
  details: z
    .object({
      key: z.string(),
      value: z.string(),
    })
    .array(),
    categories: z.array(z.coerce.number())
});

type FormProps = z.infer<typeof ProductSchema>;


type Props = {
  categories: Database["public"]["Tables"]["categories"]["Row"][];
  brands: Database["public"]["Tables"]["brands"]["Row"][];
}

const STORAGE_URL = "https://yzyjttocciydqnybhqne.supabase.co/storage/v1/object/public/products/"

const ProductForm = ({brands, categories}:Props) => {



const router = useRouter();

const [image, setImage] = useState('/images/placeholder-image.png')

const [loading, setLoading] = useState(false)

const supabase = createClient()


const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  setLoading(true);

		if (!e.target.files) {
			alert("Please select an image to upload");
			return;
		}
		const file = e.target.files[0];

		const { data, error } = await supabase.storage
			.from("products")
			.upload(uuidv4(), file);

		if (error) {
			alert(`Error uploading image ${error.message}`);
			setLoading(false);
			return;
		}

		setImage(`${STORAGE_URL}${data.path}`);
		setLoading(false);

};



    const form = useForm<z.infer<typeof ProductSchema>>({
      resolver: zodResolver(ProductSchema),
      defaultValues: {
        categories: [],
      }
    });

    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
    } = form;


  const [details, setDetails] = useState([
    {
      key: "Colour",
      value: "Black",
    },
  ]);

   const { fields, append, remove } = useFieldArray({
     control,
     name: "details",
   });

  const onSubmit: SubmitHandler<FormProps> = async (
			data: z.infer<typeof ProductSchema>,
		) => {

			console.log({ data });

			const {
				name,
				description,
				item_id,
				price,
				short_description,
				dimensions,
				brand_id,
				// category_id,
				details,
        categories,
			} = data;

			const slug = slugify(name.toLowerCase(), { remove: /[*+~.()/\'"!:@]/g, strict:true });

			const { data: product, error } = await supabase
				.from("products")
				.insert([
					{
						name,
						slug,
						description,
						item_id,
						price: +price,
						short_description,
						dimensions: {
							width: +dimensions.width,
							height: +dimensions.height,
							depth: +dimensions.depth,
							weight: +dimensions.weight,
						},
						brand_id: +brand_id,
						category_id: Number(categories[0]), // only one category for now
						details,
						image,
					},
				])
				.select("*")
				.single();

			if (error || product === null) {
				alert("Error creating product");
				return;
			}

      // Add product to categories
      const product_id = product.id;

      const categoriesToInsert = categories.map((category_id) => {
        return {
          category_id: Number(category_id),
          product_id: product_id}
      });
      console.log({categoriesToInsert})

      const { data: productCategories, error: categoryError } = await supabase
							.from("product_categories")
							.insert(categoriesToInsert)
							.select("*");

      if(categoryError || !productCategories){
        console.log({categoryError})
        alert("Error adding product to categories");
        return;
      }

      console.log({productCategories})

			// toast("Product created successfully");

			router.push(`/dashboard/products/${product?.id}`);
		};

  return (
			<div className="flex justify-between w-full gap-6 text-gray-900">
				<div className="w-full p-4 rounded-lg bg-slate-300">
					<h1 className="text-3xl font-semibold text-black">
						Create New Product
					</h1>
					<Separator className="w-full my-4 text-amber-500" />
					<Form {...form}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="w-full px-3 py-4 mt-4 bg-white border rounded-md border-neutral-300"
						>
							<div className="flex w-full space-x-4">
								<div className="relative flex flex-col w-full space-y-1 lg:w-2/3">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Product Name</FormLabel>
												<FormControl>
													<Input
														placeholder="enter product name"
														className=""
														{...field}
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>{" "}
								<div className="relative flex flex-col w-full space-y-1 lg:w-2/3">
									<FormField
										control={form.control}
										name="item_id"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Product ID/SKU</FormLabel>
												<FormControl>
													<Input
														placeholder="enter product sku"
														className=""
														{...field}
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div className="relative flex flex-col w-full mt-4 space-y-1">
								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Product Price</FormLabel>
											<FormControl>
												<Input
													placeholder="enter product price"
													className=""
													{...field}
													type="number"
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="relative flex flex-col w-full mt-4 space-y-1">
								<FormField
									control={form.control}
									name="short_description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Short description</FormLabel>
											<FormControl>
												<Input
													placeholder="enter product short description"
													className=""
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="relative flex flex-col w-full mt-4 space-y-1">
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Product description</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Enter a long product description"
													className="resize-none"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="relative flex w-full gap-3 mt-4">
								<div className="w-1/4">
									<FormField
										control={form.control}
										name="dimensions.width"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Width (cm)</FormLabel>
												<FormControl>
													<Input
														placeholder=""
														className=""
														{...field}
														type="number"
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="w-1/4">
									<FormField
										control={form.control}
										name="dimensions.height"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Height (cm)</FormLabel>
												<FormControl>
													<Input
														placeholder=""
														className=""
														{...field}
														type="number"
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="w-1/4">
									<FormField
										control={form.control}
										name="dimensions.depth"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Depth (cm)</FormLabel>
												<FormControl>
													<Input
														placeholder=""
														className=""
														{...field}
														type="number"
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="w-1/4">
									<FormField
										control={form.control}
										name="dimensions.weight"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Weight (grams)</FormLabel>
												<FormControl>
													<Input
														placeholder=""
														className=""
														{...field}
														type="number"
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>{" "}
							{errors.dimensions && (
								<p className="text-xs text-red-600 ">
									{errors.dimensions.message}
								</p>
							)}
							<Separator className="mt-5 border text-neutral-700 border-neutral-300" />
							<div className="flex flex-col w-full my-4 space-y-3">
								<h3 className="my-3 font-medium text-neutral-800">
									Add Product Attributes
								</h3>

								<Label htmlFor="details">Product Details</Label>
								<div className="flex flex-col space-y-3 ">
									{fields.map((field, index) => {
										return (
											<div
												key={field.id}
												className="flex items-center w-full space-x-4"
											>
												<FormField
													control={form.control}
													name={`details.${index}.key`}
													render={({ field }) => (
														<FormItem className="w-full">
															<FormControl>
																<Input
																	placeholder="enter detail name e.g. colour"
																	className=""
																	{...field}

																/>
															</FormControl>

															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`details.${index}.value`}
													render={({ field }) => (
														<FormItem className="w-full">
															<FormControl>
																<Input
																	placeholder="enter detail value e.g. black"
																	className=""
																	{...field}

																/>
															</FormControl>

															<FormMessage />
														</FormItem>
													)}
												/>

												<Button
													type="button"
													variant="destructive"
													onClick={() => remove(index)}
													className="flex space-x-2"
												>
													<Trash2Icon className="w-4 h-4" />
												</Button>
											</div>
										);
									})}
									{errors.details && (
										<p className="text-xs text-red-600 ">
											{errors.details.message} for details
										</p>
									)}
									<Button
										type="button"
										onClick={() => append({ key: "", value: "" })}
										className="px-4 mt-4 w-fit"
									>
										Add Detail
									</Button>
								</div>
							</div>
							<Separator className="mt-5 border text-neutral-700 border-neutral-300" />
							<div className="w-full mt-4 ">
								<FormField
									control={form.control}
									name="brand_id"
									render={({ field }) => (
										<FormItem className="space-y-3">
											<FormLabel>Select A Brand</FormLabel>
											<FormControl>
												<RadioGroup
													onValueChange={field.onChange}
													defaultValue={field.value}
													className="flex flex-col space-y-1"
												>
													{brands.map((brand) => (
														<FormItem
															key={brand.id}
															className="flex items-center space-x-3 space-y-0"
														>
															<FormControl>
																<RadioGroupItem value={brand.id.toString()} />
															</FormControl>
															<FormLabel className="font-normal">
																{brand.name}
															</FormLabel>
														</FormItem>
													))}
												</RadioGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Separator className="mt-2 border text-neutral-700 border-neutral-300" />
							<div className="w-full mt-4 ">
								<FormField
									control={form.control}
									name="categories"
									render={() => (
										<FormItem>
											<div className="mb-4">
												<FormLabel className="text-base">Sidebar</FormLabel>
												<FormDescription>
													Select the items you want to display in the sidebar.
												</FormDescription>
											</div>
											{categories.map((item) => (
												<FormField
													key={item.id}
													control={form.control}
													name="categories"
													render={({ field }) => {
                            // console.log({field})
														return (
															<FormItem
																key={item.id}
																className="flex flex-row items-start space-x-3 space-y-0"
															>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(item.id)}
																		onCheckedChange={(checked) => {
																			return checked
																				? field.onChange([
																						...field.value,
																						item.id,
																					])
																				: field.onChange(
																						field.value?.filter(
																							(value) => value !== item.id,
																						),
																					);
																		}}
																	/>
																</FormControl>
																<FormLabel className="text-sm font-normal">
																	{item.name}
																</FormLabel>
															</FormItem>
														);
													}}
												/>
											))}
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Separator className="my-4 border text-neutral-700 border-neutral-300" />
							<Separator className="my-4 border text-neutral-700 border-neutral-300" />
							<Button type="submit" className="flex w-full">
								Save Product
							</Button>
						</form>
					</Form>
				</div>
				<div className="w-1/3 border rounded-lg bg-slate-100 border-slate-400">
					<div className="p-4 mb-5">
						<Label
							htmlFor="image"
							className="text-lg font-medium text-neutral-800"
						>
							Upload Product Image
						</Label>
						<Input
							onChange={handleUpload}
							type="file"
							accept="image/png,image/jpeg,image/jpg,image/webp"
							className="bg-white"
						/>
					</div>
					<div className="flex flex-col items-center justify-center px-3 space-y-3">
						<Image
							src={image}
							width="500"
							height="500"
							className={cn(
								"w-full object-cover rounded-lg border border-slate-200",
								loading && "animate-pulse",
							)}
							alt="Product Image"
						/>
					</div>
				</div>
			</div>
		);
};
export default ProductForm;
