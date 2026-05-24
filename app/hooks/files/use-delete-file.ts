"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getDataList } from "@/app/functions/get-data-list"
import { File } from "@/app/interfaces/file.interface"
import { deleteData } from "@/app/functions/delete-data"

export function useDeleteFile(id: string) {
    const { data: session, status } = useSession()
    const [file, setFile] = useState<File>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function loadFile() {

        try {
            setLoading(true)
            setError(null)

            const data: File = await deleteData<File>({
                endpoint: `file/${id}`,
            });
            setFile(data);
        } catch (err) {
            console.error(err)
            const message = err instanceof Error ? err.message : "Error al borrar archivo"
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
        loadFile()
    }, [id])
    return { clubs: file, loading, error }
}