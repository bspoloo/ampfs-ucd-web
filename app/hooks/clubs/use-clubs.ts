"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Club } from "@/app/interfaces/club.interface"
import { ClubResponse } from "@/app/interfaces/club-response.interface"
import { getClubs } from "@/app/services/club.service"
import { getDataList } from "@/app/functions/get-data-list"

export function useClubs(pagination: {page: number, limit: number}, refresh: number) {
    const { data: session, status } = useSession()
    const [clubs, setClubs] = useState<Club[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { page, limit } = pagination;

    
    async function loadClubs() {
        try {
            setLoading(true)
            setError(null)
            
            const data: ClubResponse[] = await getDataList<ClubResponse[]>({
                endpoint: `clubs`,
                accessToken: session!.accessToken
            });
            const mapped: Club[] = data.map(c => ({
                id: c.id,
                name: c.name,
                file: c.file,
                president: c.president,
                delegate: c.delegate,
                teamCount: c.team_count,
            }))
            setClubs(mapped)
        } catch (err) {
            console.error(err)
            const message = err instanceof Error ? err.message : "Error al cargar los clubes"
            setError(message)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        if (status === "loading") return
        if (!session?.accessToken) {
            setLoading(false)
            return
        }
        loadClubs()
    }, [page, limit,refresh, status])
    return { clubs, loading, error }
}