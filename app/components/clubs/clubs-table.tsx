"use client"

import { useEffect, useState } from "react"
import { Eye, RefreshCcw, Users } from "lucide-react"
import Loader from "@/app/components/loader"
import { Club } from "@/app/interfaces/club.interface"

const CLUBS_MOCK: Club[] = [
    { id: "1", name: "C.A.S",        president: "Juan Pérez",   delegate: "Pepe García",   teamCount: 3 },
    { id: "2", name: "F.C. Norte",   president: "Carlos Ruiz",  delegate: "Luis Torres",   teamCount: 2 },
    { id: "3", name: "Deportivo Sur",president: "Ana López",    delegate: "Mario Díaz",    teamCount: 4 },
    { id: "4", name: "Atlético Este",president: "Pedro Martín", delegate: "Sofía Ramos",   teamCount: 1 },
]

export default function ClubsTable() {
    const [loading, setLoading] = useState(true)
    const [clubs] = useState<Club[]>(CLUBS_MOCK)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200)
        return () => clearTimeout(timer)
    }, [])

    if (loading) return <Loader />

    return (
        <div className="flex-1 overflow-y-auto custom-scroll rounded border border-(--border-dark) mt-5">
            <table className="w-full text-sm">
                <thead className="bg-(--bg-main) sticky top-0 z-10">
                    <tr className="text-(--text-btn-sidebar)">
                        <th className="p-3 text-left w-12">#</th>
                        <th className="p-3 text-left">Club</th>
                        <th className="p-3 text-left">Presidente</th>
                        <th className="p-3 text-left">Delegado</th>
                        <th className="p-3 text-left">Equipos</th>
                        <th className="p-3 text-center">
                            <RefreshCcw className="w-4 h-4 mx-auto" />
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {clubs.map((club, index) => (
                        <tr
                            key={club.id}
                            className="border-t border-(--border-dark) hover:bg-(--hover-btn-sidebar) transition"
                        >
                            <td className="p-3 text-(--text-btn-sidebar) font-mono">
                                {index + 1}
                            </td>
                            <td className="p-3 text-(--text-sidebar) font-medium whitespace-nowrap">
                                {club.name}
                            </td>
                            <td className="p-3 text-(--text-btn-sidebar) whitespace-nowrap">
                                {club.president}
                            </td>
                            <td className="p-3 text-(--text-btn-sidebar) whitespace-nowrap">
                                {club.delegate}
                            </td>
                            <td className="p-3">
                                <div className="flex items-center gap-1.5 text-(--text-btn-sidebar)">
                                    <Users className="w-3.5 h-3.5" />
                                    <span>{club.teamCount}</span>
                                </div>
                            </td>
                            <td className="p-3 text-center">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-(--border-dark) text-(--text-btn-sidebar) hover:bg-(--hover-btn-sidebar) transition cursor-pointer mx-auto">
                                    <Eye className="w-3.5 h-3.5" />
                                    Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}