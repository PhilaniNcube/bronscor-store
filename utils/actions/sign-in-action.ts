"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const formSchema = z.object({
  email: z.string(),
  password: z.string()
});

type PrevState = {
  message: string;
}

export async function signInAction ( formData:FormData) {

  const supabase = createClient();

  const values = Object.fromEntries(formData.entries())

  const validatedFields = formSchema.safeParse(values);

  if(validatedFields.success === false) {
    console.error(validatedFields.error.errors);
    return { message: "You did not fill in the login form correctly" };
  }

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: validatedFields.data.password
  });

  if (error) {
    console.error(error);
    return { message: "Invalid email or password. Please try again." };
  }

  return {
    message: "You have successfully signed in!"
  };

}


