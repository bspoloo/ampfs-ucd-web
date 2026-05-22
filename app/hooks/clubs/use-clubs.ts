"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Club } from "@/app/interfaces/club.interface"
import { ClubResponse } from "@/app/interfaces/club-response.interface"
import { getClubs } from "@/app/services/club.service"

export function useClubs() {
    const { data: session, status } = useSession()

    const [clubs, setClubs] = useState<Club[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (status === "loading") return
        if (!session?.accessToken) {
            setLoading(false)
            return
        }
        loadClubs()
    }, [session, status])

    async function loadClubs() {
        try {
            setLoading(true)
            setError(null)

            const data: ClubResponse[] = await getClubs(session!.accessToken)

            const formatted: Club[] = data.map(club => ({
                id: club.id,
                name: club.name,
                president: club.president,
                delegate: club.delegate,
            }))

            setClubs(formatted)
        } catch (err) {
            console.error(err)
            const message = err instanceof Error ? err.message : "Error al cargar los clubes"
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return { clubs, loading, error }
}