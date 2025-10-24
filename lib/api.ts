export const loginApi = async (payload: { email: string, password: string, tenantId: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
    })
    return response.json()
}

export const registerApi = async (payload: { email: string, password: string, companyName: string, firstName: string, lastName: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, {
        method: "POST",
        body: JSON.stringify(payload),
    })
    return response.json()
}

export const refreshTokenApi = async (payload: { refreshToken: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, {
        method: "POST",
        body: JSON.stringify(payload),
    })
    return response.json()
}