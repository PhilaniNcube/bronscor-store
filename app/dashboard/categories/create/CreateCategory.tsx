"use client"


import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { useSupabase } from "@/Providers/SupabaseProvider";
import { revalidatePath, revalidateTag } from "next/cache";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().nonempty("Please enter a name"),
});

const CreateCategory = () => {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {supabase} = useSupabase();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
      },
    });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);

    const {name} = values;
    const slug = name.toLowerCase().replace(/ /g, '-');
    console.log({name, slug})

    const {data, error} = await supabase.from('categories').insert({name, slug}).single();

    console.log({data, error})


    setLoading(false)
    if(!error) router.push('/dashboard/categories')


  }


  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold text-black">Create New Category</h1>
      <Separator className="w-full my-4 text-amber-500" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full lg:w-2/3 mt-4 border border-neutral-300 bg-neutral-100 py-4 px-3 rounded-md"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input className="bg-white text-gray-900" placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>This is category name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit" className="mt-4 bg-amber-500 hover:bg-amber-500/80">{loading ? 'Loading' : 'Save Category'}</Button>
        </form>
      </Form>
    </div>
  );
};
export default CreateCategory;
