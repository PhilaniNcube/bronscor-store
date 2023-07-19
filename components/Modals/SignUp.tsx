"use client"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";

import { SubmitHandler, useForm } from "react-hook-form";
import { Database } from "@/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "../ui/use-toast";



const FormSchema = z.object({
  first_name: z.string().min(2, "Too Short!").max(50, "Too Long!"),
  last_name: z.string().min(2, "Too Short!").max(50, "Too Long!"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password is too short! It must be more than 8 characters")
    .max(50, "Too Long!"),
});

type FormProps = z.infer<typeof FormSchema>;

const SignUp = () => {

  const supabase = createClientComponentClient<Database>();


    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });


    const onSubmit: SubmitHandler<FormProps> = async (data: any) => {
      const { first_name, last_name, password, email } = data;

      const { data: user, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            first_name,
            last_name,
          },
        },
      });

      if (error) {
        console.log(error);
        toast({
          title: "There was an error signing up",
          description: error.message,
        })
        return
      } else if (user) {
        toast({
          title: "Sign up successful",
          description: "Please check your email for the confirmation link",
        })
        return
      }
    };

      const [inputType, setInputType] = useState("password");

      const toggleInputType = () => {
        inputType === "password"
          ? setInputType("text")
          : setInputType("password");
      };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-amber-500 bg-black hover:bg-amber-600 hover:text-black">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>
            Create an account to get started.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start space-y-2 py-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John"
                        {...field}
                        className="text-gray-900"
                      />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-start space-y-2 py-4">
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Doe"
                        {...field}
                        className="text-gray-900"
                      />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-start space-y-2 py-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="text-gray-900"
                      />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-start space-y-2 py-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Password</FormLabel>
                    <FormControl>
                      <div className="relative isolate">
                        <Input
                          type={inputType}
                          placeholder="Password"
                          {...field}
                          className="text-gray-900"
                        />
                        <EyeIcon
                          className="absolute top-1/2 right-2 transform -translate-y-1/2 w-6 h-6 text-gray-900 cursor-pointer"
                          onClick={toggleInputType}
                        />
                      </div>
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-start space-y-2 py-4">
              <Button
                className="w-full bg-amber-500 text-black hover:bg-amber-500/80"
                type="submit"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default SignUp;
