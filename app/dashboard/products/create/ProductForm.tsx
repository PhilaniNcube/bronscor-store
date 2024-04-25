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
  category_id: z.string(),
  details: z
    .object({
      key: z.string(),
      value: z.string(),
    })
    .array(),
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



    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<z.infer<typeof ProductSchema>>({
      resolver: zodResolver(ProductSchema),
    });




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


  const onSubmit: SubmitHandler<FormProps> = async (data) => {


    console.log(data);

				const {
					name,
					description,
					item_id,
					price,
					short_description,
					dimensions,
					brand_id,
					category_id,
					details,
				} = data;

				console.log({
					name,
					description,
					item_id,
					price,
					short_description,
					dimensions,
					brand_id,
					category_id,
					details,
				});

				const slug = slugify(name.toLowerCase(), { remove: /[*+~.()'"!:@]/g });

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
							category_id: +category_id,
							details,
							image,
						},
					])
					.select("*")
					.single();

				if (error) {
					alert("Error creating product");
					return;
				}

				alert("Product created successfully");
				console.log(product);
				router.push(`/dashboard/products/${product?.id}`);

  }

  return (
    <div className="flex justify-between w-full gap-6 text-gray-900">
      <div className="w-full p-4 rounded-lg bg-slate-300">
        <h1 className="text-3xl font-semibold text-black">
          Create New Product
        </h1>
        <Separator className="w-full my-4 text-amber-500" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full px-3 py-4 mt-4 border rounded-md border-neutral-300 bg-neutral-100"
        >
          <div className="flex w-full space-x-4">
            <div className="relative flex flex-col w-full space-y-1 lg:w-2/3">
              <Label htmlFor="name">Product Name</Label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Enter product name"
                className="bg-white border border-neutral-300"
              />
              {errors.name && (
                <p className="text-xs text-red-600 ">{errors.name.message}</p>
              )}
            </div>{" "}
            <div className="relative flex flex-col w-full space-y-1 lg:w-2/3">
              <Label htmlFor="item_id">Product ID/SKU</Label>
              <Input
                type="text"
                id="item_id"
                {...register("item_id")}
                placeholder="Enter product id or sku"
                className="bg-white border border-neutral-300"
              />
              {errors.item_id && (
                <p className="text-xs text-red-600 ">
                  {errors.item_id.message}
                </p>
              )}
            </div>
          </div>
          <div className="relative flex flex-col w-full mt-4 space-y-1">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              step="any"
              {...register("price")}
              className="bg-white border border-neutral-300"
            />
            {errors.price && (
              <p className="text-xs text-red-600 ">{errors.price.message}</p>
            )}
          </div>
          <div className="relative flex flex-col w-full mt-4 space-y-1">
            <Label htmlFor="short_description">Short Description</Label>
            <Input
              type="text"
              id="short_description"
              {...register("short_description")}
              placeholder="Enter short description"
              className="bg-white border border-neutral-300"
            />
            {errors.short_description && (
              <p className="text-xs text-red-600 ">
                {errors.short_description.message}
              </p>
            )}
          </div>
          <div className="relative flex flex-col w-full mt-4 space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter product description"
              className="bg-white border border-neutral-300"
            />
            {errors.description && (
              <p className="text-xs text-red-600 ">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="relative flex w-full gap-3 mt-4">
            <div className="w-1/4">
              <Label htmlFor="width" className="text-xs">
                Width(cm)
              </Label>
              <Input
                type="number"
                id="width"
                {...register("dimensions.width")}
                className="bg-white border border-neutral-300"
              />
            </div>
            <div className="w-1/4">
              <Label htmlFor="height" className="text-xs">
                Height(cm)
              </Label>
              <Input
                type="number"
                id="height"
                {...register("dimensions.height")}
                className="bg-white border border-neutral-300"
              />
            </div>
            <div className="w-1/4">
              <Label htmlFor="depth" className="text-xs">
                Depth(cm)
              </Label>
              <Input
                type="number"
                id="depth"
                {...register("dimensions.depth")}
                className="bg-white border border-neutral-300"
              />
            </div>
            <div className="w-1/4">
              <Label htmlFor="weight" className="text-xs">
                Weight(grams)
              </Label>
              <Input
                type="number"
                id="weight"
                {...register("dimensions.weight")}
                className="bg-white border border-neutral-300"
              />
            </div>
          </div>{" "}
          {errors.dimensions && (
            <p className="text-xs text-red-600 ">{errors.dimensions.message}</p>
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
                  <div key={field.id} className="flex items-center space-x-4">
                    <Input
                      type="text"
                      {...register(`details.${index}.key`)}
                      placeholder="Enter detail name e.g. Colour"
                      className="bg-white border border-neutral-300"
                    />
                    <Input
                      type="text"
                      {...register(`details.${index}.value`)}
                      placeholder="Enter detail value e.g. Black"
                      className="bg-white border border-neutral-300"
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
            <fieldset className="relative my-3" {...register("brand_id")}>
              <Label className="text-lg">Select A Brand</Label>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={brand.name}
                      {...register("brand_id")}
                      value={String(brand.id)}
                    />
                    <label htmlFor={brand.name} className="text-xs">
                      {brand.name}
                    </label>
                  </div>
                ))}
              </div>
              {errors.brand_id && (
                <p className="text-xs text-red-600 ">
                  {errors.brand_id.message}
                </p>
              )}
            </fieldset>
          </div>
          <Separator className="mt-2 border text-neutral-700 border-neutral-300" />
          <div className="w-full mt-4 ">
            <fieldset className="relative my-3" {...register("category_id")}>
              <Label className="text-lg">Select A Category</Label>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      id={String(category.id)}
                      {...register("category_id")}
                      value={String(category.id)}
                    />
                    <Label htmlFor={String(category.id)} className="text-xs">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.category_id && (
                <p className="text-xs text-red-600 ">
                  {errors.category_id.message}
                </p>
              )}
            </fieldset>
          </div>
          <Separator className="my-4 border text-neutral-700 border-neutral-300" />
          <Separator className="my-4 border text-neutral-700 border-neutral-300" />
          <Button type="submit" className="flex w-full">
            Save Product
          </Button>
        </form>
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
              loading && "animate-pulse"
            )}
            alt="Product Image"
          />
        </div>
      </div>
    </div>
  );
};
export default ProductForm;
