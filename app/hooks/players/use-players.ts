"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Player } from "@/app/interfaces/player.interface"
import { getDataList } from "@/app/functions/get-data-list"

export function usePlayers() {
    const { data: session, status } = useSession()
    const [players, setPlayers] = useState<Player[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (status === "loading") return
        if (!session?.accessToken) {
            setLoading(false)
            return
        }
        loadPlayers()
    }, [session, status])

    async function loadPlayers() {
        try {
            setLoading(true)
            setError(null)
            const data: Player[] = await getDataList<Player[]>({
                endpoint: "players",
                accessToken: session!.accessToken,
            })
            setPlayers(data)
        } catch (err) {
            const message = err instanceof Error ? err.message : "Error al cargar jugadores"
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return { players, loading, error }
}