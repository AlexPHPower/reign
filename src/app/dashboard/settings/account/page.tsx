"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { api } from "~/trpc/react";
import { toast } from "~/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import React from "react";

const EaIdInputSchema = z.object({
  eaId: z.string(),
});

export default function Account() {
  const { data: session } = useSession();

  const eaIdForm = useForm<z.infer<typeof EaIdInputSchema>>({
    resolver: zodResolver(EaIdInputSchema),
    defaultValues: {
      eaId: "",
    },
  });

  if (!session?.user) {
    return NextResponse.redirect(new URL("/auth/signin"));
  }

  const mutation = api.userProfile.eaId.useMutation();

  const onEaIdChange = async (data: z.infer<typeof EaIdInputSchema>) => {
    try {
      mutation.mutate(data);

      toast({
        title: "EA ID Updated",
        description: "Your EA ID has been updated successfully",
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
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Profile Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>EA ID</CardTitle>
                <CardDescription>
                  Used to link your EA account to your Titan account. To find
                  your EA ID login to your EA account and navigate to your
                  profile{" "}
                  <a
                    className={`text-blue-500`}
                    href="https://myaccount.ea.com/cp-ui/aboutme/index"
                  >
                    My Account EA
                  </a>
                  .
                </CardDescription>
              </CardHeader>
              <Form {...eaIdForm}>
                <form onSubmit={eaIdForm.handleSubmit(onEaIdChange)}>
                  <CardContent>
                    <FormField
                      control={eaIdForm.control}
                      name="eaId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="ea-id"
                              placeholder="EA ID"
                              required
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button type="submit">Save</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Plugins Directory</CardTitle>
                <CardDescription>
                  The directory within your project, in which your plugins are
                  located.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    placeholder="Project Name"
                    defaultValue="/content/plugins"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include" defaultChecked />
                    <label
                      htmlFor="include"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow administrators to change the directory.
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
