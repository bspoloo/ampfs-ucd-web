"use client"

import { ImagePlus, Save, X } from "lucide-react"

interface ClubNewPanelProps {
    onClose: () => void
}

export default function ClubNewPanel({ onClose }: ClubNewPanelProps) {
    return (
        <div className="mt-5 rounded-xl border border-(--border-dark) bg-(--bg-sidebar) overflow-hidden">
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-(--border-dark)">
                <p className="text-sm font-semibold text-(--text-sidebar)">Nuevo club</p>
                <button
                    onClick={onClose}
                    className="text-(--text-btn-sidebar) hover:text-(--text-sidebar) transition cursor-pointer"
                >
                    <X size={16} />
                </button>
            </div>

            <div className="p-5 flex flex-col sm:flex-row gap-6">
                {/* Logo upload area */}
                <div className="flex flex-col gap-2">
                    <p className="text-xs text-(--text-btn-sidebar)">Logo del club</p>
                    <button className="w-28 h-28 rounded-xl border-2 border-dashed border-(--border-dark) flex flex-col items-center justify-center gap-2 text-(--text-btn-sidebar) hover:border-(--btn-activo-sidebar) hover:text-(--btn-activo-sidebar) transition cursor-pointer">
                        <ImagePlus className="w-6 h-6" />
                        <span className="text-xs">Subir imagen</span>
                    </button>
                </div>

                {/* Form fields */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-(--text-btn-sidebar)">Nombre del club</label>
                        <input
                            type="text"
                            placeholder="Ej: Club Atlético Sur"
                            disabled
                            className="px-3 py-2 text-sm bg-(--bg-main) border border-(--border-dark) rounded-lg text-(--text-sidebar) placeholder:text-(--text-btn-sidebar) outline-none cursor-not-allowed opacity-60"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-(--text-btn-sidebar)">Presidente</label>
                        <input
                            type="text"
                            placeholder="Nombre del presidente"
                            disabled
                            className="px-3 py-2 text-sm bg-(--bg-main) border border-(--border-dark) rounded-lg text-(--text-sidebar) placeholder:text-(--text-btn-sidebar) outline-none cursor-not-allowed opacity-60"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-(--text-btn-sidebar)">Delegado</label>
                        <input
                            type="text"
                            placeholder="Nombre del delegado"
                            disabled
                            className="px-3 py-2 text-sm bg-(--bg-main) border border-(--border-dark) rounded-lg text-(--text-sidebar) placeholder:text-(--text-btn-sidebar) outline-none cursor-not-allowed opacity-60"
                        />
                    </div>
                </div>
            </div>

            {/* Panel footer */}
            <div className="flex justify-end px-5 py-3 border-t border-(--border-dark)">
                <button
                    disabled
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-(--btn-activo-sidebar) text-white text-sm font-medium opacity-50 cursor-not-allowed"
                >
                    <Save className="w-4 h-4" />
                    Guardar
                </button>
            </div>
        </div>
    )
}