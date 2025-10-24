"use server"
import { registerApi } from "@/lib/api"
import { signUpSchema } from "@/lib/zod"
import { z } from "zod"
export const registerAction = async (formData: z.infer<typeof signUpSchema>) => {
    try {
        const response = await registerApi({ email: formData.email, password: formData.password, companyName: formData.companyName, firstName: formData.firstName, lastName: formData.lastName })
        if (response.success) {
            return {
                success: "Registration successful",
                message: response.message || "Registration successful"
            }
        } else {
            return {
                error: "Registration failed",
                message: response.message || "Registration failed"
            }
        }
    } catch (error) {
        return {
            error: "Registration failed",
            message: error instanceof Error ? error.message : "Registration failed"
        }
    }
}