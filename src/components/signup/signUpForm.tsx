"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import React from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: emailParam ? decodeURIComponent(emailParam) : "",
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
      const { email, password } = data;
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      router.push("/dashboard");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-5">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="first-name"
                        placeholder="Max"
                        required
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="last-name"
                        placeholder="Robinson"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid gap-2">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      {...field}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            {/* In Game Name */}
            <FormField
              control={form.control}
              name="inGameName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="In Game Name" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </div>
      </form>
    </Form>
  );
}
