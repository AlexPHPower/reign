"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { api } from "~/trpc/react";

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string(),
  inGameName: z.string(),
});

export function SignUpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      inGameName: "",
    },
  });

  const mutation = api.register.create.useMutation();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    try {
      const response = mutation.mutate(data);
      console.log(response);
      toast({
        title: "Thank you!",
        description: "You have been added to the waitlist.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Registration Failed",
        description: "Failed to register, please try again later",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/2 space-y-4 py-10"
      >
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="First Name"
                  className="rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Last Name"
                  className="rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="rounded-xl"
                  {...field}
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* In Game Name */}
        <FormField
          control={form.control}
          name="inGameName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="In Game Name"
                  className="rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="float-right mt-4 w-52 rounded-xl">
          Submit
        </Button>
      </form>
    </Form>
  );
}
