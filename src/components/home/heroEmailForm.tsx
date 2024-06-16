"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

export function HeroEmailForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "Thank you!",
      description: "You have been added to the waitlist.",
    });

    router.push(`auth/register?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-10">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center space-y-2">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-l-xl"
                  {...field}
                  autoComplete="true"
                />
                <Button type="submit" className="rounded-r-xl">
                  Sign Up
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
