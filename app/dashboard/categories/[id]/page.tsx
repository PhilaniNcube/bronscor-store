import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getCategory } from "@/lib/categories";
import { Button } from "@/components/ui/button";

import type { Database } from "@/schema";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

const page = async ({params: {id}}:{params: {id: number}}) => {

  const category = await getCategory(id);

  const updateCategory = async (formData:FormData) => {
   "use server"

    const supabase = createClient()

    const name = formData.get('name');


    if(!name || typeof name !== 'string') {
       throw new Error("Please enter a name");
    }

    const slug = name.toLowerCase().replace(/ /g, "-");

    const {data, error} = await supabase.from('categories').update({name:name, slug:slug}).eq('id', id).select('*').single();

    console.log({data, error});
   revalidatePath('/dashboard/categories');


  }

  return (
    <div className="w-full text-gray-900">
      <h1 className="text-3xl font-semibold text-black">{category.name}</h1>
      <Separator className="w-full my-4 text-amber-500" />
      <form
        action={updateCategory}
        className="w-full lg:w-2/3 mt-4 border border-neutral-300 bg-neutral-100 py-4 px-3 rounded-md"
      >
        <div className="flex flex-col gap-4">
          <Label htmlFor="name">Category Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={category.name}
            className="bg-white"
          />
        </div>

        <Button className="bg-amber-500 hover:bg-amber-500/90 shadow-md hover:shadow-lg mt-4">
          Save
        </Button>
      </form>
    </div>
  );
};
export default page;
