"use client"

import { Plus, X, Loader2 } from "lucide-react"
import { useState } from "react"
import { Club } from "@/app/interfaces/club.interface"
import { Team } from "@/app/interfaces/team.interface"
import { useGetData } from "@/app/hooks/use-get-data"
import FormTeam from "@/app/components/clubs/form-team"

interface TeamPanelProps {
    club: Club
    onClose: () => void
}

function TeamCard({ team }: { team: Team }) {
    const color = team.uniformColor || "#4a5568"
    const initial = team.name.charAt(0).toUpperCase()

    return (
        <div className="w-32 h-32 rounded-[28px] border-2 border-(--border-dark) bg-(--bg-main) flex flex-col items-center justify-center gap-2 p-3 hover:scale-105 hover:bg-(--hover-btn-sidebar) transition-all duration-200 shadow-sm cursor-pointer">
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                style={{ backgroundColor: color }}
            >
                {initial}
            </div>
            <span className="text-xs font-medium text-(--text-sidebar) text-center leading-tight line-clamp-2 w-full">
                {team.name}
            </span>
        </div>
    )
}

export default function TeamPanel({ club, onClose }: TeamPanelProps) {
    const [isFormOpen, setIsFormOpen] = useState(false)

    const { response: teams, loading, refetch } = useGetData<Team[]>("teams?limit=100")

    const clubTeams = (teams ?? []).filter(t => t.club?.id === club.id)

    return (
        <>
            <div className="mt-5 w-full rounded-[32px] border-2 border-(--border-dark) bg-(--bg-sidebar) p-6 min-h-[190px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full border border-(--border-dark) flex items-center justify-center hover:bg-(--hover-btn-sidebar) transition cursor-pointer"
                >
                    <X className="w-4 h-4 text-(--text-sidebar)" />
                </button>

                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-(--text-sidebar)">{club.name}</h2>
                    <p className="text-sm text-(--text-btn-sidebar) mt-1">Gestión de equipos y jugadores</p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-(--text-btn-sidebar)" />
                    </div>
                ) : (
                    <div className="flex items-start gap-4 flex-wrap">
                        {clubTeams.map(team => (
                            <TeamCard key={team.id} team={team} />
                        ))}
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="w-32 h-32 rounded-[28px] border-2 border-dashed border-(--border-dark) bg-(--bg-main) flex items-center justify-center text-(--text-sidebar) hover:scale-105 hover:bg-(--hover-btn-sidebar) transition-all duration-200 shadow-sm cursor-pointer"
                        >
                            <Plus className="w-8 h-8" />
                        </button>
                    </div>
                )}
            </div>

            <FormTeam
                club={club}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSaved={refetch}
            />
        </>
    )
}
