"use client";

import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import Loader from "@/app/components/loader";
import RequestDetailModal from "./request-detail-modal";
import { Permit } from "@/app/interfaces/permit.interface";
import { usePermits } from "@/app/hooks/permits/use-permits";
import { getPermitStatusStyles } from "@/app/functions/get-permit-status-style";
import { useToast } from "@/app/hooks/use-toast";

export default function RequestsList() {
    const { permits, loading, error, updatePermitStatus } = usePermits();
    const { showToast } = useToast();

    const [selected, setSelected] = useState<Permit | null>(null);

    async function handleApprove(id: string) {
        setSelected(null);
        try {
            await updatePermitStatus(id, "aprobado");
            showToast("Solicitud aprobada correctamente.", "success");
        } catch {
            showToast("Error al aprobar la solicitud. Intenta de nuevo.", "error");
        }
    }

    async function handleReject(id: string) {
        setSelected(null);
        try {
            await updatePermitStatus(id, "rechazado");
            showToast("Solicitud rechazada.", "success");
        } catch {
            showToast("Error al rechazar la solicitud. Intenta de nuevo.", "error");
        }
    }

    if (loading) return <Loader />;

    if (error) {
        return <div className="mt-5 text-red-400">{error}</div>;
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
                            <th className="p-3 text-left">Motivo</th>
                            <th className="p-3 text-center">
                                <RefreshCcw className="w-4 h-4 mx-auto" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {permits.map(permit => (
                            <tr
                                key={permit.id}
                                className="border-t border-(--border-dark) hover:bg-(--hover-btn-sidebar) transition"
                            >
                                <td className="p-3 text-(--text-sidebar) font-medium whitespace-nowrap">
                                    {permit.team.name ?? "sin equipo"}
                                </td>
                                <td className="p-3 text-(--text-btn-sidebar) whitespace-nowrap">
                                    {permit.type}
                                </td>
                                <td className={`p-3 whitespace-nowrap font-semibold ${getPermitStatusStyles(permit.state)}`}>
                                    {permit.state}
                                </td>
                                <td className="p-3 text-(--text-btn-sidebar) max-w-xs truncate">
                                    {permit.reason}
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => setSelected(permit)}
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
                permit={selected}
                onClose={() => setSelected(null)}
                onAceptar={handleApprove}
                onRechazar={handleReject}
            />
        </>
    );
}
