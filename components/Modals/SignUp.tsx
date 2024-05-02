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
import type { Database } from "@/schema";
import { createClient } from "@/utils/supabase/client";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



const FormSchema = z.object({
  first_name: z.string().min(2, "Too Short!").max(50, "Too Long!"),
  last_name: z.string().min(2, "Too Short!").max(50, "Too Long!"),
  contact_number: z.string(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password is too short! It must be more than 8 characters")
    .max(50, "Too Long!"),
});

type FormProps = z.infer<typeof FormSchema>;

const SignUp = () => {

  const [isOpen, setIsOpen] = useState(false);

  const supabase = createClient();

  const router  = useRouter()


    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });


    const onSubmit = async (
					data: z.infer<typeof FormSchema>,
				) => {
					const { first_name, last_name, password, email, contact_number } = data;

					const { data: user, error } = await supabase.auth.signUp({
						email,
						password,
						options: {
							emailRedirectTo: `${location.origin}/auth/callback`,
							data: {
								first_name,
								last_name,
                contact_number,
							},
						},
					});

					if (error) {
						console.log(error);
						toast(`There was an error signing up: ${error.message}`);
					} else if (user) {
						toast("Please check your email for the confirmation link");

					} else {
						toast("There was an error, please try again later");

					}

					setIsOpen(false);
				};

      const [inputType, setInputType] = useState("password");

      const toggleInputType = () => {
        inputType === "password"
          ? setInputType("text")
          : setInputType("password");
      };

  return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button className="bg-black text-amber-500 hover:bg-amber-600 hover:text-black">
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
						<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
							<div className="flex flex-col items-start w-full py-4 space-y-2">
								<FormField
									control={form.control}
									name="first_name"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel className="text-gray-900">
												First Name
											</FormLabel>
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
							<div className="flex flex-col items-start py-4 space-y-2">
								<FormField
									control={form.control}
									name="last_name"
									render={({ field }) => (
										<FormItem className="w-full">
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
							<div className="flex flex-col items-start py-4 space-y-2">
								<FormField
									control={form.control}
									name="contact_number"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel className="text-gray-900">Contact Number</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder="Contact Number"
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
							<div className="flex flex-col items-start py-4 space-y-2">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="w-full">
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
							<div className="flex flex-col items-start py-4 space-y-2">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="w-full">
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
														className="absolute w-6 h-6 text-gray-900 transform -translate-y-1/2 cursor-pointer top-1/2 right-2"
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
							<div className="flex flex-col items-start py-4 space-y-2">
								<Button
									className="w-full text-black bg-amber-500 hover:bg-amber-500/80"
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
