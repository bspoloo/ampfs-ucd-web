"use client"

import { X, Plus, Search, Check, Loader2 } from "lucide-react"
import { useState } from "react"
import { Club } from "@/app/interfaces/club.interface"
import { usePlayers } from "@/app/hooks/players/use-players"
import { useCategories } from "@/app/hooks/catogories/use-categories"
import { useToast } from "@/app/context/toast-context"
import { useSession } from "next-auth/react"
import { postData } from "@/app/functions/post-data"
import { getUrlImage } from "@/app/functions/get-url-image"

interface FormTeamProps {
    club: Club
    isOpen: boolean
    onClose: () => void
    onSaved: () => void
}

const PRESET_COLORS = [
    "#e53e3e",
    "#3182ce",
    "#38a169",
    "#d69e2e",
    "#805ad5",
    "#ed8936",
    "#1a202c",
    "#e2e8f0",
]

interface TeamFormData {
    name: string
    categoryId: string
    uniformColor: string
    playerIds: string[]
}

const EMPTY_FORM: TeamFormData = {
    name: "",
    categoryId: "",
    uniformColor: PRESET_COLORS[0],
    playerIds: [],
}

export default function FormTeam({ club, isOpen, onClose, onSaved }: FormTeamProps) {
    const [formData, setFormData] = useState<TeamFormData>(EMPTY_FORM)
    const [showPlayerSearch, setShowPlayerSearch] = useState(false)
    const [playerSearch, setPlayerSearch] = useState("")
    const [pendingPlayerIds, setPendingPlayerIds] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const { players, loading: loadingPlayers } = usePlayers()
    const { categories, loading: loadingCategories } = useCategories()
    const { showToast } = useToast()
    const { data: session } = useSession()

    const selectedPlayers = players.filter(p => formData.playerIds.includes(p.id))
    const filteredPlayers = players.filter(p =>
        p.fullname.toLowerCase().includes(playerSearch.toLowerCase())
    )

    function openPlayerSearch() {
        setPendingPlayerIds([...formData.playerIds])
        setPlayerSearch("")
        setShowPlayerSearch(true)
    }

    function togglePendingPlayer(playerId: string) {
        setPendingPlayerIds(prev =>
            prev.includes(playerId)
                ? prev.filter(id => id !== playerId)
                : [...prev, playerId]
        )
    }

    function confirmPlayerSelection() {
        setFormData(prev => ({ ...prev, playerIds: pendingPlayerIds }))
        setShowPlayerSearch(false)
    }

    function cancelPlayerSearch() {
        setShowPlayerSearch(false)
        setPendingPlayerIds([])
    }

    function validate(): boolean {
        if (!formData.name.trim()) {
            showToast("El nombre del equipo es obligatorio", "error")
            return false
        }
        if (!formData.categoryId) {
            showToast("Debes seleccionar una categoría", "error")
            return false
        }
        return true
    }

    async function handleSubmit(e: { preventDefault(): void }) {
        e.preventDefault()
        if (!validate()) return
        try {
            setLoading(true)
            await postData<object, object>(
                { endpoint: "teams", accessToken: session!.accessToken },
                {
                    name: formData.name,
                    category_id: formData.categoryId,
                    uniform_color: formData.uniformColor,
                    player_ids: formData.playerIds,
                    club_id: club.id,
                }
            )
            showToast(`Equipo "${formData.name}" registrado correctamente`, "success")
            setFormData(EMPTY_FORM)
            setShowPlayerSearch(false)
            onSaved()
            onClose()
        } catch (err) {
            const message = err instanceof Error ? err.message : "Error al guardar el equipo"
            showToast(message, "error")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div
                className={`relative bg-(--bg-sidebar) border border-(--border-dark) rounded-2xl shadow-2xl z-10 overflow-hidden w-[90%] transition-all duration-300 ${
                    showPlayerSearch ? "max-w-[820px]" : "max-w-[480px]"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-(--border-dark) px-6 py-5">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Nuevo equipo</h2>
                        <p className="text-sm text-white/50">{club.name}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex">
                    {/* Left: form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 flex-1 min-w-0">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Nombre de equipo</label>
                            <input
                                type="text"
                                placeholder="Real Sporting FC"
                                value={formData.name}
                                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full border border-white/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#b11212] transition bg-white/10 text-white placeholder:text-white/40"
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Categoría</label>
                            {loadingCategories ? (
                                <p className="text-xs text-white/40">Cargando categorías...</p>
                            ) : (
                                <select
                                    value={formData.categoryId}
                                    onChange={e => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                                    className="w-full border border-white/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#b11212] transition bg-(--bg-sidebar) text-white"
                                >
                                    <option value="">Seleccionar categoría</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Uniform color */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Color de uniforme</label>
                            <div className="flex items-center gap-2 flex-wrap">
                                {PRESET_COLORS.map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, uniformColor: color }))}
                                        className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer"
                                        style={{
                                            backgroundColor: color,
                                            borderColor: formData.uniformColor === color ? "#fff" : "transparent",
                                            boxShadow: formData.uniformColor === color ? "0 0 0 1px #ffffff55" : "none",
                                        }}
                                    />
                                ))}
                                <input
                                    type="color"
                                    value={formData.uniformColor}
                                    onChange={e => setFormData(prev => ({ ...prev, uniformColor: e.target.value }))}
                                    className="w-7 h-7 rounded-full cursor-pointer border-0 bg-transparent p-0 opacity-60 hover:opacity-100 transition"
                                    title="Color personalizado"
                                />
                            </div>
                        </div>

                        {/* Players */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">
                                Jugadores
                                {formData.playerIds.length > 0 && (
                                    <span className="ml-2 text-xs text-white/40">({formData.playerIds.length})</span>
                                )}
                            </label>
                            <div className="flex items-center gap-2 flex-wrap min-h-[44px] p-2 rounded-lg border border-white/10 bg-white/5">
                                {selectedPlayers.map(player => (
                                    <div key={player.id} className="relative group" title={player.fullname}>
                                        <img
                                            src={getUrlImage(player.file)}
                                            alt={player.fullname}
                                            className="w-9 h-9 rounded-full object-cover border-2 border-white/20"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={openPlayerSearch}
                                    className="w-9 h-9 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center text-white/50 hover:border-white/60 hover:text-white/80 transition cursor-pointer"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Footer buttons */}
                        <div className="flex justify-end gap-3 pt-2 border-t border-(--border-dark)">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition cursor-pointer disabled:opacity-60"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Guardar"}
                            </button>
                        </div>
                    </form>

                    {/* Right: player search panel */}
                    {showPlayerSearch && (
                        <div className="w-[300px] shrink-0 border-l border-(--border-dark) flex flex-col">
                            {/* Panel header */}
                            <div className="flex items-center justify-between px-4 py-4 border-b border-(--border-dark)">
                                <span className="text-sm font-medium text-white">Buscar por nombre</span>
                                <button
                                    type="button"
                                    onClick={cancelPlayerSearch}
                                    className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white transition cursor-pointer"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Search input */}
                            <div className="px-4 py-3 border-b border-(--border-dark)">
                                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2">
                                    <Search size={14} className="text-white/50 shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Buscar jugador..."
                                        value={playerSearch}
                                        onChange={e => setPlayerSearch(e.target.value)}
                                        autoFocus
                                        className="bg-transparent text-sm text-white placeholder:text-white/40 outline-none w-full"
                                    />
                                </div>
                            </div>

                            {/* Players list */}
                            <div className="flex-1 overflow-y-auto" style={{ maxHeight: "260px" }}>
                                {loadingPlayers ? (
                                    <div className="flex items-center justify-center p-6">
                                        <Loader2 className="w-5 h-5 animate-spin text-white/40" />
                                    </div>
                                ) : filteredPlayers.length === 0 ? (
                                    <p className="text-center text-xs text-white/40 p-6">Sin resultados</p>
                                ) : (
                                    filteredPlayers.map(player => {
                                        const isSelected = pendingPlayerIds.includes(player.id)
                                        return (
                                            <button
                                                key={player.id}
                                                type="button"
                                                onClick={() => togglePendingPlayer(player.id)}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition cursor-pointer"
                                            >
                                                <img
                                                    src={getUrlImage(player.file)}
                                                    alt={player.fullname}
                                                    className="w-8 h-8 rounded-full object-cover shrink-0 border border-white/10"
                                                />
                                                <span className="text-sm text-white flex-1 text-left truncate">
                                                    {player.fullname}
                                                </span>
                                                <div
                                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                                                        isSelected
                                                            ? "bg-[#b11212] border-[#b11212]"
                                                            : "border-white/30"
                                                    }`}
                                                >
                                                    {isSelected && <Check size={11} className="text-white" />}
                                                </div>
                                            </button>
                                        )
                                    })
                                )}
                            </div>

                            {/* Panel footer */}
                            <div className="flex gap-2 p-4 border-t border-(--border-dark)">
                                <button
                                    type="button"
                                    onClick={cancelPlayerSearch}
                                    className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmPlayerSelection}
                                    className="flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition cursor-pointer"
                                >
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
