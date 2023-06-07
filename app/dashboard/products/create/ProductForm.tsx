"use client"
import { useSupabase } from "@/Providers/SupabaseProvider";
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
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Database } from "@/schema";
import { Trash2Icon } from "lucide-react";


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
  price: z.number().min(0, "Price cannot be less than 0"),
  short_description: z
    .string()
    .min(3, "Description cannot be shorter than 3 characters")
    .max(100, "Description cannot be longer than 50 characters"),
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
    depth: z.number(),
    weight: z.number(),
  }),
  brand_id: z.number(),
  category_id: z.number(),
  in_stock: z.boolean().default(true),
  featured: z.boolean().default(false),
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

const ProductForm = ({brands, categories}:Props) => {

    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<z.infer<typeof ProductSchema>>({
      resolver: zodResolver(ProductSchema),
    });

  const {supabase} = useSupabase()
  const router = useRouter();

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

    console.log(data)

  }

  return (
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
          {errors.short_description && (
            <p className="text-xs text-red-600 ">
              {errors.short_description.message}
            </p>
          )}
        </div>
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
          <p className="text-xs text-red-600 ">{errors.description.message}</p>
        )}
      </div>
      <div className="w-full gap-3 flex relative mt-4">
        <div className="w-1/4">
          <Label htmlFor="width" className="text-xs">
            Width(cm)
          </Label>
          <Input
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
      </div>

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
        <RadioGroup className="my-3 relative" {...register("brand_id")}>
          <Label className="text-lg">Select A Brand</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  {...register("brand_id")}
                  id={brand.name}
                  value={String(brand.id)}
                />
                <Label htmlFor={String(brand.name)} className="text-xs">
                  {brand.name}
                </Label>
              </div>
            ))}
          </div>
          {errors.brand_id && (
            <p className="text-xs text-red-600 ">{errors.brand_id.message}</p>
          )}
        </RadioGroup>
      </div>

      <Separator className="mt-2 text-neutral-700 border border-neutral-300" />

      <div className="mt-4 w-full ">
        <RadioGroup className="my-3 relative" {...register("category_id")}>
          <Label className="text-lg">Select A Category</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  {...register("category_id")}
                  id={category.name}
                  value={String(category.id)}
                />
                <Label htmlFor={String(category.name)} className="text-xs">
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
        </RadioGroup>
      </div>

      <Separator className="my-4 text-neutral-700 border border-neutral-300" />
      <div className="flex justify-start items-center space-x-6">
        <div className=" flex items-center space-x-2 ">
          <Switch id="featured" {...register("featured")} />
          <Label htmlFor="featured">Featured</Label>

          {errors.featured && (
            <p className="text-xs text-red-600 ">{errors.featured.message}</p>
          )}
        </div>
        <div className=" flex items-center space-x-2 ">
          <Switch id="in_stock" {...register("in_stock")} />
          <Label htmlFor="in_stock">In Stock</Label>

          {errors.in_stock && (
            <p className="text-xs text-red-600 ">{errors.in_stock.message}</p>
          )}
        </div>
      </div>

      <Separator className="my-4 text-neutral-700 border border-neutral-300" />

      <Button type="submit" className="flex w-full">
        Save Product
      </Button>
    </form>
  );
};
export default ProductForm;
