"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Club } from "@/app/interfaces/club.interface"
import { ClubResponse } from "@/app/interfaces/club-response.interface"
import { getClubs } from "@/app/services/club.service"
import { getDataList } from "@/app/functions/get-data-list"
import { postData } from "@/app/functions/post-data"
import { ClubDto } from "@/app/interfaces/club.dto"

export function usePostClubs(club: Club, isSend: boolean) {
    const { data: session, status } = useSession()
    const [clubResponse, setClubResponse] = useState<Club | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function sendClub() {
        try {
            setLoading(true)
            setError(null)
            console.log(club);
            
            const data: ClubResponse = await postData<ClubDto, ClubResponse>({
                endpoint: `clubs`,
                accessToken: session!.accessToken
            }, {
                name: club.name,
                president: club.president,
                delegate: club.delegate,
                file_id: club.file?.id!
            });
            setClubResponse(data)
        } catch (err) {
            console.error(err)
            const message = err instanceof Error ? err.message : `Error al Insertar club ${club.name}`
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
        if(!isSend){
            setLoading(false)
            return;
        }
        sendClub()
    }, [isSend])
    return { response: clubResponse, loading, error }
}