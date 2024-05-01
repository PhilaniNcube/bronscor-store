"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createClient } from "@/utils/supabase/client";
import { startTransition, useState } from "react";
import { EyeIcon } from "lucide-react";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { signInAction } from "@/utils/actions/sign-in-action";
import { SubmitButton } from "../ui/submit-button";
import Link from "next/link";

const formSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password is too short! It must be more than 8 characters")
		.max(50, "Too Long!"),
});

const initialState = {
  message: "",
}

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





  const onSubmit = async (data: z.infer<typeof formSchema>) => {
			const { password, email } = data;

		  const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);


      startTransition(() => {
        signInAction(formData);
        setIsOpen(false);
      });

      toast('Please wait while we log you in', {
        duration: 4000,
        position: 'top-center',
      })

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
          <DialogTitle className="text-black">Sign In</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col items-start py-4 space-y-2">
              <FormField

                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-black">Email</FormLabel>
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
                  <FormItem className="w-full">
                    <FormLabel className="text-black">Password</FormLabel>
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
              <SubmitButton
                className="w-full text-black bg-amber-500 hover:bg-amber-500/80"
              />
            </div>
          </form>
        </Form>
        <div className="w-full" onClick={() => setIsOpen(false)} onKeyDown={() => setIsOpen(false)}>
          <DialogFooter>
            <DialogDescription>
              Forgot your password?{" "}
              <Link
                href="forgot-password"
                className="text-amber-500 hover:text-amber-600"
              >
                Reset password.
              </Link>
            </DialogDescription>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SignIn;
