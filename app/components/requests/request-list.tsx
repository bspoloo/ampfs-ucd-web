"use client"

import { useState } from "react"
import { RefreshCcw } from "lucide-react"
import { Solicitud } from "@/app/interfaces/solicitud.interface"
import RequestDetailModal from "./request-detail-modal"

const SOLICITUDES_MOCK: Solicitud[] = [
    {
        id: "1",
        equipo: "C.A.S",
        tipo: "Cambio de horario",
        estado: "Pendiente",
        solicitante: "Juan Pérez",
        fecha: "2026-04-28",
        mensaje: "El equipo de C.A.S solicita permiso de cambio de horario para el partido del próximo viernes debido a compromisos académicos de varios jugadores.",
        descripcion: "El partido estaba programado para las 18:00h del viernes 3 de mayo. Se solicita reprogramar para el sábado 4 de mayo a las 10:00h.",
    },
    {
        id: "2",
        equipo: "F.C. Norte",
        tipo: "Inscripción de jugador",
        estado: "Pendiente",
        solicitante: "Carlos Ruiz",
        fecha: "2026-04-30",
        mensaje: "Solicitud para inscribir al jugador Mario García en el equipo F.C. Norte para la temporada actual.",
        descripcion: "El jugador Mario García (DNI: 12345678A) cumple todos los requisitos reglamentarios para su inscripción.",
    },
    {
        id: "3",
        equipo: "Deportivo Sur",
        tipo: "Apelación de sanción",
        estado: "Rechazada",
        solicitante: "Ana López",
        fecha: "2026-04-25",
        mensaje: "El equipo Deportivo Sur apela la sanción de 2 partidos impuesta al jugador Roberto Díaz.",
    },
    {
        id: "4",
        equipo: "Atlético Este",
        tipo: "Cambio de sede",
        estado: "Aceptada",
        solicitante: "Pedro Martínez",
        fecha: "2026-04-20",
        mensaje: "Solicitud de cambio de sede para los partidos de local. El campo habitual está en obras hasta finales de mayo.",
        descripcion: "Se propone el uso del campo municipal de La Alameda como sede temporal.",
    },
]

const ESTADO_STYLES: Record<string, string> = {
    Pendiente: "text-yellow-300",
    Aceptada:  "text-green-400",
    Rechazada: "text-red-400",
}

export default function RequestsList() {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>(SOLICITUDES_MOCK)
    const [selected, setSelected] = useState<Solicitud | null>(null)

    const handleAceptar = (id: string) => {
        setSolicitudes(prev =>
            prev.map(s => s.id === id ? { ...s, estado: "Aceptada" } : s)
        )
        setSelected(prev => prev?.id === id ? { ...prev, estado: "Aceptada" } : prev)
    }

    const handleRechazar = (id: string) => {
        setSolicitudes(prev =>
            prev.map(s => s.id === id ? { ...s, estado: "Rechazada" } : s)
        )
        setSelected(prev => prev?.id === id ? { ...prev, estado: "Rechazada" } : prev)
    }

    return (
        <>
            <div className="flex-1 overflow-y-auto custom-scroll rounded border border-(--border-dark) mt-5">
                <table className="w-full text-sm">
                    <thead className="bg-(--bg-main) sticky top-0 z-10">
                        <tr className="text-(--text-btn-sidebar)">
                            <th className="p-3 text-left">Equipo</th>
                            <th className="p-3 text-left">Tipo</th>
                            <th className="p-3 text-left">Estado</th>
                            <th className="p-3 text-left">Mensaje</th>
                            <th className="p-3 text-center">
                                <RefreshCcw className="w-4 h-4 mx-auto" />
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {solicitudes.map(sol => (
                            <tr
                                key={sol.id}
                                className="border-t border-(--border-dark) hover:bg-(--hover-btn-sidebar) transition"
                            >
                                <td className="p-3 text-(--text-sidebar) font-medium whitespace-nowrap">
                                    {sol.equipo}
                                </td>
                                <td className="p-3 text-(--text-btn-sidebar) whitespace-nowrap">
                                    {sol.tipo}
                                </td>
                                <td className={`p-3 whitespace-nowrap font-semibold ${ESTADO_STYLES[sol.estado]}`}>
                                    {sol.estado}
                                </td>
                                <td className="p-3 text-(--text-btn-sidebar) max-w-xs truncate">
                                    {sol.mensaje}
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => setSelected(sol)}
                                        className="px-3 py-1.5 text-xs rounded-lg bg-(--btn-activo-sidebar) hover:opacity-80 text-white transition cursor-pointer whitespace-nowrap"
                                    >
                                        Ver solicitud
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <RequestDetailModal
                solicitud={selected}
                onClose={() => setSelected(null)}
                onAceptar={handleAceptar}
                onRechazar={handleRechazar}
            />
        </>
    )
}
