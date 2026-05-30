"use client"

import { Plus, X } from "lucide-react"
import { useState } from "react"
import { Club } from "@/app/interfaces/club.interface"
import FormTeam from "@/app/components/clubs/form-team"

interface TeamPanelProps {
    club: Club
    onClose: () => void
}

export default function TeamPanel({ club, onClose }: TeamPanelProps) {
    const [isFormOpen, setIsFormOpen] = useState(false)

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

                <div className="flex items-center gap-4 flex-wrap">
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="w-32 h-32 rounded-[28px] border-2 border-(--border-dark) bg-(--bg-main) flex items-center justify-center text-(--text-sidebar) hover:scale-105 hover:bg-(--hover-btn-sidebar) transition-all duration-200 shadow-sm cursor-pointer"
                    >
                        <Plus className="w-8 h-8" />
                    </button>
                </div>
            </div>

            <FormTeam
                club={club}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSaved={() => {}}
            />
        </>
    )
}