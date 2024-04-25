"use client";
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

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type { Database } from "@/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { EyeIcon } from "lucide-react";

const formSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password is too short! It must be more than 8 characters")
		.max(50, "Too Long!"),
});

const SignIn = () => {

   const [isOpen, setIsOpen] = useState(false);


   const form = useForm<z.infer<typeof formSchema>>({
				resolver: zodResolver(formSchema),
				defaultValues: {
					email: "",
					password: "",
				},
			});

  const [inputType, setInputType] = useState("password");

  const toggleInputType = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  }

  const supabase = createClientComponentClient<Database>();

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
			const { password, email } = data;

			const { data: user, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				alert(`Error login in: ${error.message}`);
			}

			router.refresh();
		};

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-amber-500 hover:bg-amber-600 hover:text-black">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start py-4 space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="text-gray-900"
                        {...field}
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
            <div className="flex flex-col items-start py-4 space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative isolate">
                        <Input
                          type={inputType}
                          placeholder="Password"
                          {...field}
                          className="text-gray-900"
                        />
                        <EyeIcon className="absolute w-6 h-6 text-gray-900 transform -translate-y-1/2 cursor-pointer top-1/2 right-2" onClick={toggleInputType} />
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
            <div className="flex flex-col items-start py-4 space-y-2">
              <Button
                className="w-full text-black bg-amber-500 hover:bg-amber-500/80"
                type="submit"
              >
                Sign In
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default SignIn;
