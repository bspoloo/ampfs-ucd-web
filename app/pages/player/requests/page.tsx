"use client"

import { Mails } from "lucide-react"
import { useTheme } from "@/app/context/theme-context"

export default function PlayerRequestsPage() {
    const { theme } = useTheme()

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className={`p-5 rounded-2xl ${theme === "dark" ? "bg-white/5" : "bg-gray-100"}`}>
                <Mails className="w-10 h-10 text-red-500" />
            </div>
            <p className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Solicitudes
            </p>
            <p className={`text-sm text-center max-w-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                aqui ya pondremos pues las solicitudes nose apartados para realizar la solicitud o ver las solis que hicimos pasmpad
            </p>
        </div>
    )
}
