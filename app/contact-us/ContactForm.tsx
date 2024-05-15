"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Please enter more than 2 characters.",
    })
    .max(30, {
      message: "Please do not enter more than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone: z
    .string()
    .max(10, { message: "Phone number needs to be 10 digits long" })
    .min(10, { message: "Phone number needs to be 10 digits long" }),
  message: z.string().max(160).min(4),
});

type ContactFormSchema = z.infer<typeof contactFormSchema>;

const ContactForm = () => {

    const form = useForm<ContactFormSchema>({
      resolver: zodResolver(contactFormSchema),
      mode: "onChange",
    });

    async function onSubmit(data: ContactFormSchema) {
      console.log("data", data);

      toast({
        title: "Success, message sent successfully. We will be in touch soon.",
      });
    }


  return (
    <main className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-5 gap-4"
        >
          <div className="col-span-5 p-8 text-black md:col-span-2 lg:col-span-2 ">
            <h1 className="text-3xl font-bold text-amber-600">Contact Us</h1>
            <Separator className="my-4 text-black bg-amber-600" />
          </div>
          <div className="col-span-5 p-4 md:col-span-2 lg:col-span-3 text-amber-600">
            <div className="flex w-full space-x-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white border-amber-600"
                        placeholder="Your Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="bg-white border-amber-600"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        className="bg-white border-amber-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full mt-4">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                      placeholder="Enter your message"
                      rows={5}
                        className="bg-white border-amber-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full max-w-sm mt-5 text-black bg-amber-600">Save</Button>
          </div>
        </form>
      </Form>
    </main>
  );
};
export default ContactForm;
