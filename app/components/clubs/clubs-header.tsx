"use client"

import { Plus, Search } from "lucide-react"

export default function ClubsHeader({ openForm }: { openForm: () => void; }) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-xl text-(--text-sidebar)">Clubes</h2>
                <button
                    onClick={openForm}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-(--btn-activo-sidebar) hover:opacity-90 transition cursor-pointer text-white text-sm font-medium">
                    <Plus className="w-4 h-4" />
                    Nuevo club
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center flex-[2] min-w-[300px] px-4 py-2 bg-(--bg-sidebar) rounded-xl border border-(--border-dark)">
                    <Search className="w-4 h-4 text-(--text-btn-sidebar) mr-2 shrink-0" />
                    <input
                        type="text"
                        placeholder="Buscar club..."
                        className="bg-transparent outline-none text-(--text-sidebar) placeholder:text-(--text-btn-sidebar) w-full text-sm"
                    />
                </div>

                <button className="px-4 py-2 text-(--text-btn-sidebar) rounded-xl bg-(--bg-sidebar) border border-(--border-dark) hover:bg-(--hover-btn-sidebar) transition cursor-pointer text-sm">
                    Buscar
                </button>
            </div>
        </div>
    )
}