"use client"

import { Eye, Pen, RefreshCcw } from "lucide-react"
import Loader from "@/app/components/loader"
import { useClubs } from "@/app/hooks/clubs/use-clubs"
import { Club } from "@/app/interfaces/club.interface"
import { PaginationProps } from "@/app/props/page.props"
import { getUrlImage } from "@/app/functions/get-url-image"

interface ClubsTableProps extends PaginationProps {
    refresh: number
    onView: (club: Club) => void
    onEdit: (club: Club) => void
}

export default function ClubsTable({page, limit, refresh, onView, onEdit}: ClubsTableProps) {
    const { clubs, loading, error } = useClubs({page, limit}, refresh)
    
    if (loading) return <Loader />

    if (error) {
        return <div className="mt-5 text-red-400 text-sm">{error}</div>
    }

    return <>
        <div className="overflow-hidden rounded border border-(--border-dark) mt-5 w-fit min-w-full">
            <table className="w-full text-sm">
                <thead className="bg-(--bg-main) sticky top-0 z-10">
                    <tr className="text-(--text-btn-sidebar)">
                        <th className="p-3 text-left w-12">#</th>
                        <th className="p-3 text-left">Club</th>
                        <th className="p-3 text-left">Presidente</th>
                        <th className="p-3 text-left">Delegado</th>
                        <th className="p-3 text-center">Equipos</th>
                        <th className="p-3 text-center">
                            <RefreshCcw className="w-4 h-4 mx-auto" />
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {clubs.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="p-6 text-center text-(--text-btn-sidebar)">
                                No hay clubes registrados.
                            </td>
                        </tr>
                    ) : (
                        clubs.map((club, index) => (
                            <tr
                                key={club.id}
                                className="border-t border-(--border-dark) hover:bg-(--hover-btn-sidebar) transition"
                            >
                                <td className="p-3 text-(--text-btn-sidebar) font-mono">
                                    {index + 1}
                                </td>
                                <td className="p-3 text-(--text-sidebar) font-medium whitespace-nowrap">
                                    <div className="flex items-center gap-2.5">
                                        <img src={getUrlImage(club.file)} alt={`${club.name}`} className="rounded-full w-8 h-8 object-cover shrink-0" />
                                        {club.name}
                                    </div>
                                </td>
                                <td className="p-3 text-(--text-btn-sidebar) whitespace-nowrap">
                                    {club.president ?? "—"}
                                </td>
                                <td className="p-3 text-(--text-btn-sidebar) whitespace-nowrap">
                                    {club.delegate ?? "—"}
                                </td>
                                <td className="p-3 text-center text-(--text-btn-sidebar) font-mono">
                                    {club.teamCount ?? 0}
                                </td>
                                <td className="flex justify-center items-center gap-3 p-3 text-center">
                                    <button onClick={() => onView(club)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-(--border-dark) text-(--text-btn-sidebar) hover:bg-(--hover-btn-sidebar) transition cursor-pointer">
                                        <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => onEdit(club)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-(--border-dark) text-(--text-btn-sidebar) hover:bg-(--hover-btn-sidebar) transition cursor-pointer">
                                        <Pen className="w-3.5 h-3.5" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </>
}
