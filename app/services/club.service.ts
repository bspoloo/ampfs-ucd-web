import { ClubResponse } from "@/app/interfaces/club-response.interface"

const API_URL = process.env.BACKEND_API_URL

export async function getClubs(token: string): Promise<ClubResponse[]> {
    const response = await fetch(`${API_URL}/clubs`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.message ?? `Error al obtener los clubes (${response.status})`)
    }

    return response.json()
}
