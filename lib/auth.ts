import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginWithExternalAPI, LoginCredentials, refreshAccessToken } from "./auth-client"

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Replace this with your external API call
                const user = await loginWithExternalAPI(credentials as LoginCredentials)
                return user
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            // On first login, attach API token
            if (user) {
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
                token.accessTokenExpiresAt = user.accessTokenExpiresAt
                token.id = user.id
                token.role = user.role
            }
            
            if(Date.now() < (token.accessTokenExpiresAt as number)) {
                return token
            }

            return await refreshAccessToken(token)
        },
        async session({ session, token }) {
            // Expose the API token in the session
            if (token) {
                session.user.id = token.id
                session.user.role = token.role
                session.accessToken = token.accessToken
                session.refreshToken = token.refreshToken
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in"
    }
})