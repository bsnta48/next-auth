import { loginApi, refreshTokenApi } from "./api"
export interface ExternalUser {
    id: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    // Add any other fields your API returns
}

// Define the structure of the payload you send to the external API
export interface LoginCredentials {
    email: string;
    password: string;
}

// Function to log in with the external API
export async function loginWithExternalAPI(credentials: LoginCredentials): Promise<ExternalUser | null> {
    try {
        const res = await loginApi({ email: credentials.email, password: credentials.password, tenantId: "acme" })

        if (!res.success) return null
        const { accessToken, refreshToken, expiresIn, user } = res.data
        // Must return at least { id: string }
        if (user?.id) {
            return { id: user.id, role: user.role, email: user.email, accessToken: accessToken, refreshToken: refreshToken, accessTokenExpiresAt: Date.now() + expiresIn * 1000 }
        }

        throw new Error("Failed to login")
    } catch (error) {
        throw new Error("Failed to login")
    }
}

export async function refreshAccessToken(token: any) {
    try {
        const res = await refreshTokenApi({ refreshToken: token.refreshToken })
        if (!res.success) return null
        const { accessToken, expiresIn } = res.data
        return { ...token, accessToken: accessToken, accessTokenExpiresAt: Date.now() + expiresIn }
    } catch (error) {
        console.error(error)
        return null
    }
}