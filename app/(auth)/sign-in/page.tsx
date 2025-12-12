"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

interface FormStatus {
    pending: boolean;
    error: string | null;
}

function SignInPage() {

    const router = useRouter()

    const [formStatus, setFormStatus] = useState<FormStatus>({
        pending: false,
        error: null,
    })

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setFormStatus({ pending: true, error: null })
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        })
        if (result?.error) {
            setFormStatus({ pending: false, error: "Invalid email or password" })
        } else {
            setFormStatus({ pending: false, error: null })
            router.push("/dashboard")
        }
    }

    return <Card>
        <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
            <CardAction>
                <Link href="/sign-up">Sign Up</Link>
            </CardAction>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="flex flex-col gap-6">
                        {formStatus.error && <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertTitle>Unable to process your login.</AlertTitle>
                            <AlertDescription>
                                <p>{formStatus.error}</p>
                            </AlertDescription>
                        </Alert>}
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="email">Email <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="password">Password <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <Button type="submit" variant="secondary" disabled={formStatus.pending}>Login</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
}

export default SignInPage;
