"use client";

import { useParams } from "next/navigation";
import Categories from "@/app/components/championships/categories";
import ConfirmModal from "@/app/components/ui/confirm-modal";
import Loader from "@/app/components/loader";
import { getStatusStyles } from "@/app/functions/get-status-styles";
import { StatusFront } from "@/app/consts/champion-state";
import { useChampionshipDetail } from "@/app/hooks/championships/use-championship-detail";

export default function ChampionshipDetail() {

    const params = useParams();
    const id = params.id as string;

    const {
        championship,
        audits,
        loading,
        error,
        status,
        isModalOpen,
        pendingStatus,
        isUpdating,
        handleChange,
        confirmChange,
        closeModal
    } = useChampionshipDetail(id);

    if (loading || isUpdating) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="p-6 text-center text-white font-bold">
                Error de conexión con el servidor
            </div>
        );
    }

    if (!championship) return null;

    return (
        <div className="text-white -m-6">
            <div className="relative w-full h-40 sm:h-52 md:h-64 overflow-hidden">
                <img
                    src="/championship_detail.webp"
                    className="w-full h-full object-cover"
                    alt="Banner"
                />

                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute top-6 left-0 w-full px-4 sm:px-6">
                    <h2 className="text-xl font-semibold text-(--text-sidebar)">
                        {championship.name}
                    </h2>
                </div>

                <div className="absolute bottom-4 right-4">
                    {status && (
                        <select
                            value={status}
                            onChange={(e) =>
                                handleChange(
                                    e.target.value as StatusFront
                                )
                            }
                            className={`px-4 py-2 rounded-md text-sm outline-none cursor-pointer border bg-(--bg-sidebar) transition-all duration-300 ${getStatusStyles(status)}`}
                        >
                            <option value="proceso">
                                En proceso
                            </option>

                            <option value="activo">
                                Activo
                            </option>

                            <option value="finalizado">
                                Finalizado
                            </option>
                        </select>
                    )}
                </div>
            </div>

            <Categories />

            <div className="p-6 mt-6 bg-(--bg-sidebar)/40 border border-white/5 rounded-lg mx-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#b11212] rounded-full inline-block" />
                    Registro de Auditoría de Estados (Control SoA A.8.15)
                </h3>
                
                {audits && audits.length > 0 ? (
                    <div className="relative border-l border-white/10 pl-6 space-y-6">
                        {audits.map((audit: any) => (
                            <div key={audit.id} className="relative group">
                                {/* Dot indicator */}
                                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-[#b11212] bg-[#0e0e0e] group-hover:scale-110 transition-transform duration-200" />
                                
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <p className="text-sm font-medium text-white/90">
                                            Cambio de estado: <span className="text-white/40">{audit.oldState}</span> → <span className="text-green-400 font-semibold">{audit.newState}</span>
                                        </p>
                                        <p className="text-xs text-white/45 mt-1 flex flex-wrap gap-x-4">
                                            <span>Por: <strong className="text-white/70">{audit.user?.fullname || audit.user?.username || 'Sistema'}</strong></span>
                                            <span>IP: <code className="text-white/60">{audit.ipAddress}</code></span>
                                        </p>
                                    </div>
                                    <div className="text-xs text-white/35 whitespace-nowrap self-start sm:self-center">
                                        {new Date(audit.createdAt).toLocaleString('es-ES', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-white/40 italic">No se registran cambios de estado en este campeonato.</p>
                )}
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                title="Cambiar Estado"
                message={`¿Estás seguro de cambiar a ${pendingStatus}?`}
                onConfirm={confirmChange}
                onCancel={closeModal}
            />
        </div>
    );
}