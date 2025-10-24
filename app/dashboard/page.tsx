"use client"
import { signOut, useSession } from "next-auth/react"
export default function DashboardPage() {
    const {data: session} = useSession()
    return <div>Dashboard
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <button onClick={() => signOut({
            callbackUrl: "/sign-in"
        })}>Sign Out</button>
    </div>
}