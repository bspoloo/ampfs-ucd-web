"use client";

import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import Loader from "@/app/components/loader";
import RequestDetailModal from "./request-detail-modal";
import { Permit } from "@/app/interfaces/permit.interface";
import { usePermits } from "@/app/hooks/permits/use-permits";
import { getPermitStatusStyles } from "@/app/functions/get-permit-status-style";
import Toast from "@/app/components/ui/toast"
import { useToast } from "@/app/hooks/use-toast";

export default function RequestsList() {
    const { permits, loading, error, updatePermitStatus } = usePermits();
    const { toast, showToast } = useToast()

    const [selected, setSelected] = useState<Permit | null>(null);

    async function handleApprove(id: string) {

        await updatePermitStatus(id, "aprobado");

        setSelected(prev =>
            prev
                ? {
                    ...prev,
                    estado: "aprobado"
                }
                : null
        );
    }

    async function handleReject(id: string) {
        await updatePermitStatus(id, "rechazado");

        setSelected(prev =>
            prev
                ? {
                    ...prev,
                    estado: "rechazado"
                }
                : null
        );
    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="mt-5 text-red-400">
                {error}
            </div>
        );
    }

    console.log("PERMITS:");
    console.log(permits);

    return (
        <>
            {toast.visible && <Toast message={toast.message} type={toast.type} />}
            <div className="flex-1 overflow-y-auto custom-scroll rounded border border-(--border-dark) mt-5">
                <table className="w-full text-sm">

                    <thead className="bg-(--bg-main) sticky top-0 z-10">
                        <tr className="text-(--text-btn-sidebar)">
                            <th className="p-3 text-left">
                                Equipo
                            </th>
                            <th className="p-3 text-left">
                                Tipo
                            </th>
                            <th className="p-3 text-left">
                                Estado
                            </th>
                            <th className="p-3 text-left">
                                Motivo
                            </th>
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
                                    {permit.equipo.nombre ?? "sin equipo"}
                                </td>
                                <td className="p-3 text-(--text-btn-sidebar) whitespace-nowrap">
                                    {permit.type}
                                </td>
                                <td
                                    className={`p-3 whitespace-nowrap font-semibold ${getPermitStatusStyles(
                                        permit.state
                                    )}`}
                                >
                                    {permit.state}
                                </td>
                                <td className="p-3 text-(--text-btn-sidebar) max-w-xs truncate">
                                    {permit.reason}
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() =>
                                            setSelected(
                                                permit
                                            )
                                        }
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
                onClose={() =>
                    setSelected(null)
                }
                onAceptar={handleApprove}
                onRechazar={handleReject}
            />
        </>
    );
}