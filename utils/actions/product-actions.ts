"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function deleteProductById(formData: FormData) {
  const supabase = createClient()

  const id = formData.get("id") as string

  console.log({id})

  if (!id) {
    throw new Error("No product id provided")
  }

  try {

    const {data, error} = await supabase.from("products").delete().eq('id', id)

    if (error) {
      console.log({error})
      throw new Error(error.message);
    }

  } catch (error) {

    throw new Error("Error deleting product");

  } finally {

    revalidatePath("/dashboard/products")
    revalidatePath("/products")

  }



}
