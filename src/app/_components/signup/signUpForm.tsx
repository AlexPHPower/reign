"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {useForm, useFormState} from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    inGameName: z.string(),
});

export function SignUpForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            inGameName: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        useFormState()
        console.log(data);
        toast({
            title: "Thank you!",
            description: 'You have been added to the waitlist.',
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="py-10 w-1/2 space-y-4">
                {/* First Name */}
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="First Name" className="rounded-xl" {...field} />
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
                                <Input placeholder="Last Name" className="rounded-xl" {...field} />
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
                                <Input type="email" placeholder="Email" className="rounded-xl" {...field} />
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
                                <Input placeholder="In Game Name" className="rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="rounded-xl float-right mt-4 w-52">Submit</Button>
            </form>
        </Form>
    )
}
