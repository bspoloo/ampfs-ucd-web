"use client";

import { useParams } from "next/navigation";
import Categories from "@/app/components/championships/categories";
import Toast from "@/app/components/ui/toast";
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
        loading,
        error,
        status,
        toast,
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

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                />
            )}

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