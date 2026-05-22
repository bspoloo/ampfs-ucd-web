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
import { FormDataProps } from "@/app/props/form-data.props";
import { Club } from "@/app/interfaces/club.interface";

export default function FormClub({ data: club, isOpen, onAccept, onReject, onClose }: FormDataProps<Club>) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">

            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-(--bg-sidebar) border border-(--border-dark) rounded-2xl w-[90%] max-w-lg shadow-2xl z-10 overflow-hidden">

                <div className="flex items-center justify-between px-6 py-4 border-b border-(--border-dark)">

                    <h2 className="text-lg font-semibold text-(--text-sidebar)">
                        {club ? `Actualizar club ${club.name}` : "Insertar nuevo club"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-(--text-btn-sidebar) hover:text-(--text-sidebar) transition cursor-pointer"
                    >
                        <X size={20} />
                    </button>

                </div>

                <div className="px-6 py-5 flex flex-col gap-4">

                    <div className="flex items-center gap-3">
                        <Tag className="w-4 h-4 text-(--text-btn-sidebar) shrink-0" />
                        <div>
                            <p className="text-xs text-(--text-btn-sidebar)">
                                Tipo de solicitud
                            </p>

                            <p className="text-sm font-medium text-(--text-sidebar)">
                                {club?.president}
                            </p>
                        </div>

                    </div>
                    <div className="flex items-center gap-3">

                        <FileText className="w-4 h-4 text-(--text-btn-sidebar) shrink-0" />

                        <div>

                            <p className="text-xs text-(--text-btn-sidebar)">
                                Equipo
                            </p>

                            <p className="text-sm font-medium text-(--text-sidebar)">
                                {club?.president}
                            </p>

                        </div>

                    </div>
                    <div className="flex items-center gap-3">

                        <Calendar className="w-4 h-4 text-(--text-btn-sidebar) shrink-0" />

                        <div>

                            <p className="text-xs text-(--text-btn-sidebar)">
                                Fecha de solicitud
                            </p>

                            <p className="text-sm font-medium text-(--text-sidebar)">
                                {club?.president}
                            </p>

                        </div>

                    </div>

                </div>
                <div className="px-6 py-4 border-t border-(--border-dark) flex justify-end gap-3">

                    <button
                        onClick={() =>
                            onReject(
                                club?.id ?? "si"
                            )
                        }
                        className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition cursor-pointer"
                    >
                        Rechazar
                    </button>

                    <button
                        onClick={() =>
                            onAccept(
                                club?.id ?? "si"
                            )
                        }
                        className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition cursor-pointer"
                    >
                        Aprobar
                    </button>
                </div>
            </div>
        </div>
    );
}