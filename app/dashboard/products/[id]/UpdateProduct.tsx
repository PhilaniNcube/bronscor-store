"use client";
import { useSupabase } from "@/Providers/SupabaseProvider";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Database } from "@/schema";
import { Trash2Icon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
import slugify from "slugify";

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
    width: z.string({ required_error: "Width is required" }),
    height: z.string({ required_error: "Height is required" }),
    depth: z.string({ required_error: "Depth is required" }),
    weight: z.string({ required_error: "Weight is required" }),
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
  product: Database["public"]["Tables"]["products"]["Row"];
};

const STORAGE_URL =
  "https://yzyjttocciydqnybhqne.supabase.co/storage/v1/object/public/products/";

const UpdateProduct = ({ brands, categories, product }: Props) => {

console.log({product})

  const router = useRouter();

  const [image, setImage] = useState(product.image);

  const [loading, setLoading] = useState(false);

  const { supabase } = useSupabase();

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
      alert("Error uploading image" + error.message);
      setLoading(false);
      return;
    } else {
      setImage(`${STORAGE_URL}${data.path}`);
      setLoading(false);
    }

    setLoading(false);
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      item_id: product.item_id,
      price: String(product.price),
      short_description: product.short_description,
      dimensions: {
        width: String(product.dimensions?.width),
        height: String(product.dimensions?.height),
        depth: String(product.dimensions?.depth),
        weight: String(product.dimensions?.weight),
      },
      brand_id: String(product.brand_id.id),
      category_id: String(product.category_id.id),
      details: product.details,
    }
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
    console.log({data});

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



    const slug = slugify(name.toLowerCase());

    const { data: updatedProduct, error } = await supabase
      .from("products")
      .update({
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
      })
      .eq("id", product.id)
      .select("*")
      .single();


    if (error) {
      alert("Error creating product");
      return;
    } else {
      alert("Product created successfully");
      console.log({ updatedProduct });
      router.refresh();
    }
  };

  return (
    <div className="w-full flex gap-6 justify-between">
      <div className="w-full p-4 bg-slate-300 rounded-lg">
        <h1 className="text-3xl font-semibold text-black">Update Product</h1>
        <Separator className="w-full my-4 text-bronscor" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-4 border border-neutral-300 bg-neutral-100 py-4 px-3 rounded-md"
        >
          <div className="w-full flex space-x-4">
            <div className="w-full lg:w-2/3 flex flex-col  space-y-1 relative">
              <Label htmlFor="name">Product Name</Label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Enter product name"
                className="border border-neutral-300 bg-white"
              />
              {errors.name && (
                <p className="text-xs text-red-600 ">{errors.name.message}</p>
              )}
            </div>{" "}
            <div className="w-full lg:w-2/3 flex flex-col  space-y-1 relative">
              <Label htmlFor="item_id">Product ID/SKU</Label>
              <Input
                type="text"
                id="item_id"
                {...register("item_id")}
                placeholder="Enter product id or sku"
                className="border border-neutral-300 bg-white"
              />
              {errors.item_id && (
                <p className="text-xs text-red-600 ">
                  {errors.item_id.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col  space-y-1 relative mt-4">
            <Label htmlFor="price">Price</Label>
            <Input
              type="float"
              id="price"
              {...register("price")}
              className="border border-neutral-300 bg-white"
            />
            {errors.price && (
              <p className="text-xs text-red-600 ">{errors.price.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col  space-y-1 relative mt-4">
            <Label htmlFor="short_description">Short Description</Label>
            <Input
              type="text"
              id="short_description"
              {...register("short_description")}
              placeholder="Enter short description"
              className="border border-neutral-300 bg-white"
            />
            {errors.short_description && (
              <p className="text-xs text-red-600 ">
                {errors.short_description.message}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col  space-y-1 relative mt-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter product description"
              className="border border-neutral-300 bg-white"
            />
            {errors.description && (
              <p className="text-xs text-red-600 ">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="w-full gap-3 flex relative mt-4">
            <div className="w-1/4">
              <Label htmlFor="width" className="text-xs">
                Width(cm)
              </Label>
              <Input
                type="number"
                id="width"
                {...register("dimensions.width")}
                className="border border-neutral-300 bg-white"
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
                className="border border-neutral-300 bg-white"
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
                className="border border-neutral-300 bg-white"
              />
            </div>
            <div className="w-1/4">
              <Label htmlFor="weight" className="text-xs">
                Weight(grams)
              </Label>
              <Input
                id="weight"
                {...register("dimensions.weight")}
                className="border border-neutral-300 bg-white"
              />
            </div>
          </div>{" "}
          {errors.dimensions && (
            <p className="text-xs text-red-600 ">{errors.dimensions.message}</p>
          )}
          <Separator className="mt-5 text-neutral-700 border border-neutral-300" />
          <div className="w-full flex flex-col space-y-3 my-4">
            <h3 className="my-3 text-neutral-800 font-medium">
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
                      className="border border-neutral-300 bg-white"
                    />
                    <Input
                      type="text"
                      {...register(`details.${index}.value`)}
                      placeholder="Enter detail value e.g. Black"
                      className="border border-neutral-300 bg-white"
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
                className="mt-4 w-fit px-4"
              >
                Add Detail
              </Button>
            </div>
          </div>
          <Separator className="mt-5 text-neutral-700 border border-neutral-300" />
          <div className="mt-4 w-full ">
            <fieldset className="my-3 relative" {...register("brand_id")} defaultValue={String(product.brand_id.id)}>
              <Label className="text-lg">Select A Brand</Label>
              <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
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
          <Separator className="mt-2 text-neutral-700 border border-neutral-300" />
          <div className="mt-4 w-full ">
            <fieldset className="my-3 relative" {...register("category_id")} defaultValue={String(product.category_id.id)}>
              <Label className="text-lg">Select A Category</Label>
              <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
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
          <Separator className="my-4 text-neutral-700 border border-neutral-300" />
          <Separator className="my-4 text-neutral-700 border border-neutral-300" />
          <Button type="submit" className="flex w-full">
            Save Product
          </Button>
        </form>
      </div>
      <div className="w-1/3 bg-slate-100 border border-slate-400 rounded-lg">
        <div className="p-4 mb-5">
          <Label
            htmlFor="image"
            className="text-neutral-800 text-lg font-medium"
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
        <div className="flex flex-col items-center justify-center space-y-3 px-3">
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
export default UpdateProduct;
