"use client";

import {
    X,
    CheckCircle,
    XCircle,
    Clock,
    Calendar,
    FileText,
    Tag
} from "lucide-react";

import { Permit } from "@/app/interfaces/permit.interface";

interface RequestDetailModalProps {
    solicitud: Permit | null;

    onClose: () => void;

    onAceptar: (id: string) => void;

    onRechazar: (id: string) => void;
}

const ESTADO_CONFIG = {

    pendiente: {
        color: "text-yellow-300",
        icon: Clock
    },

    aprobado: {
        color: "text-green-400",
        icon: CheckCircle
    },

    rechazado: {
        color: "text-red-400",
        icon: XCircle
    }

};

export default function RequestDetailModal({

    solicitud,
    onClose,
    onAceptar,
    onRechazar

}: RequestDetailModalProps) {

    if (!solicitud) return null;

    const {
        color,
        icon: EstadoIcon
    } = ESTADO_CONFIG[solicitud.state];

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-(--bg-sidebar) border border-(--border-dark) rounded-2xl w-[90%] max-w-lg shadow-2xl z-10 overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-(--border-dark)">

                    <h2 className="text-lg font-semibold text-(--text-sidebar)">
                        Detalle de Solicitud
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-(--text-btn-sidebar) hover:text-(--text-sidebar) transition cursor-pointer"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Body */}
                <div className="px-6 py-5 flex flex-col gap-4">

                    {/* Tipo */}
                    <div className="flex items-center gap-3">

                        <Tag className="w-4 h-4 text-(--text-btn-sidebar) shrink-0" />

                        <div>
                            <p className="text-xs text-(--text-btn-sidebar)">
                                Tipo de solicitud
                            </p>

                            <p className="text-sm font-medium text-(--text-sidebar)">
                                {solicitud.type}
                            </p>
                        </div>

                    </div>

                    {/* Equipo */}
                    <div className="flex items-center gap-3">

                        <FileText className="w-4 h-4 text-(--text-btn-sidebar) shrink-0" />

                        <div>

                            <p className="text-xs text-(--text-btn-sidebar)">
                                Equipo
                            </p>

                            <p className="text-sm font-medium text-(--text-sidebar)">
                                {solicitud.equipo.nombre}
                            </p>

                        </div>

                    </div>

                    {/* Fecha */}
                    <div className="flex items-center gap-3">

                        <Calendar className="w-4 h-4 text-(--text-btn-sidebar) shrink-0" />

                        <div>

                            <p className="text-xs text-(--text-btn-sidebar)">
                                Fecha de solicitud
                            </p>

                            <p className="text-sm font-medium text-(--text-sidebar)">
                                {new Date(
                                    solicitud.permit_date
                                ).toLocaleDateString()}
                            </p>

                        </div>

                    </div>

                    {/* Estado */}
                    <div className="flex items-center gap-3">

                        <EstadoIcon
                            className={`w-4 h-4 shrink-0 ${color}`}
                        />

                        <div>

                            <p className="text-xs text-(--text-btn-sidebar)">
                                Estado
                            </p>

                            <p className={`text-sm font-semibold ${color}`}>
                                {solicitud.state}
                            </p>
                        </div>
                    </div>

                    {/* Motivo */}
                    <div className="flex items-start gap-3">
                        <FileText className="w-4 h-4 text-(--text-btn-sidebar) shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-xs text-(--text-btn-sidebar) mb-1">
                                Motivo
                            </p>
                            <p className="text-sm text-(--text-sidebar) leading-relaxed">
                                {solicitud.reason}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                {solicitud.state === "pendiente" && (

                    <div className="px-6 py-4 border-t border-(--border-dark) flex justify-end gap-3">

                        <button
                            onClick={() =>
                                onRechazar(
                                    solicitud.id
                                )
                            }
                            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition cursor-pointer"
                        >
                            Rechazar
                        </button>

                        <button
                            onClick={() =>
                                onAceptar(
                                    solicitud.id
                                )
                            }
                            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition cursor-pointer"
                        >
                            Aprobar
                        </button>

                    </div>

                )}

            </div>
        </div>
    );
}