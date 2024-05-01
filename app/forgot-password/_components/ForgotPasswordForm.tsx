"use client";

import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";


const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPassword() {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const supabase = createClient();

    const { email } = data;

    const formData = new FormData();
    formData.append("email", email);

    const { error, data:resetPassword } = await supabase.auth.resetPasswordForEmail(email);

    if(error) {
      console.log(error.cause, error.status , error.message)
     toast(`Error: ${error.message}`, {
      position: "top-right",
     })
     return
    }

    console.log({resetPassword, error})

    toast("Password reset instructions sent to your email address.")


  }

	return (
		<Card className="max-w-md mx-auto bg-black text-amber-500">
			<CardHeader>
				<CardTitle className="text-amber-500">Forgot Password</CardTitle>
				<CardDescription className="text-white">
					Enter your email address and we'll send you instructions to to your
					email address to reset your password.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
						<div>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="" type="email" {...field} />
										</FormControl>
										<FormDescription>
											This is the email address you used to sign up.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							type="submit"
							className="text-black bg-amber-500 hover:text-white"
						>
							Forgot Password
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
