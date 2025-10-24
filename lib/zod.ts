import { object, string, email } from "zod"
export const signInSchema = object({
    email: email({ message: "Invalid email" }).min(1, "Email is required"),
    password: string({ error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
})

export const signUpSchema = object({
    email: email({ message: "Invalid email" }).min(1, "Email is required"),
    password: string({ error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    firstName: string({ error: "First name is required" }).min(1, "First name is required"),
    lastName: string({ error: "Last name is required" }).min(1, "Last name is required"),
    companyName: string({ error: "Company name is required" }).min(1, "Company name is required"),
})