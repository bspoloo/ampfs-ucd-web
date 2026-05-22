"use client"

import { Eye, RefreshCcw } from "lucide-react"
import Loader from "@/app/components/loader"
import { useClubs } from "@/app/hooks/clubs/use-clubs"
import { useToast } from "@/app/context/toast-context"
import { useMessage } from "@/app/context/message-context"
import { useState } from "react"
import { Club } from "@/app/interfaces/club.interface"
import FormClub from "./form-club"

export default function ClubsTable() {
    const { clubs, loading, error } = useClubs()
    
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
                        <th className="p-3 text-left w-12">Logo</th>
                        <th className="p-3 text-left">Club</th>
                        <th className="p-3 text-left">Presidente</th>
                        <th className="p-3 text-left">Delegado</th>
                        <th className="p-3 text-center">
                            <RefreshCcw className="w-4 h-4 mx-auto" />
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {clubs.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="p-6 text-center text-(--text-btn-sidebar)">
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
                                <td className="p-2 text-(--text-sidebar) font-medium whitespace-nowrap">
                                    <img src={club.logo_url} alt={`${club.name} image`} className="rounded-full w-10 h-10 object-cover" />
                                </td>
                                <td className="p-3 text-(--text-sidebar) font-medium whitespace-nowrap">
                                    {club.name}
                                </td>
                                <td className="p-3 text-(--text-btn-sidebar) whitespace-nowrap">
                                    {club.president ?? "—"}
                                </td>
                                <td className="p-3 text-(--text-btn-sidebar) whitespace-nowrap">
                                    {club.delegate ?? "—"}
                                </td>
                                <td className="p-3 text-center">
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-(--border-dark) text-(--text-btn-sidebar) hover:bg-(--hover-btn-sidebar) transition cursor-pointer mx-auto">
                                        <Eye className="w-3.5 h-3.5" />
                                        Ver
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
