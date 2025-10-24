import { NextResponse, NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    const { pathname } = req.nextUrl

    // Routes we want to protect
    const protectedRoutes = ["/dashboard"]

    // Routes for guest users only
    const authPages = ["/sign-in", "/sign-up"]

    // ✅ If user is logged in
    if (token) {
        // Prevent logged-in users from visiting /sign-in or /sign-up
        if (authPages.some((path) => pathname.startsWith(path))) {
            return NextResponse.redirect(new URL("/", req.url))
        }
        // Allow access to everything else
        return NextResponse.next()
    }

    // ✅ If user is NOT logged in
    if (protectedRoutes.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL("/sign-in", req.url))
    }

    // Public pages: allow
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/",           // homepage (optional)
        "/dashboard/:path*", // dashboard + subroutes
        "/sign-in",
        "/sign-up",
    ],
}