"use client";

import { useEffect, useState } from "react";
import { reverseStateMap, stateMap, StatusFront } from "@/app/consts/champion-state";
import { Championship } from "@/app/interfaces/championship.interface";
import { getChampionship, updateChampionshipState } from "@/app/services/championship.service";
import { useToast } from "@/app/hooks/use-toast";
import { useSession } from "next-auth/react";

export function useChampionshipDetail(id: string) {
    const {data: session, status: sessionStatus} = useSession();
    const [championship, setChampionship] = useState<Championship | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<StatusFront | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {showToast} = useToast();
    const [pendingStatus, setPendingStatus] = useState<StatusFront | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (sessionStatus === "loading") {
            return;
        }
        if (!session?.accessToken) {
            return;
        } 
        loadChampionship(); 
    }, [id, session, sessionStatus]);

    async function loadChampionship() {
        try {
            setLoading(true);
            const data = await getChampionship(id, session!.accessToken);
            setChampionship(data);
            setStatus(reverseStateMap[data.state]);
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Error cargando campeonato";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(value: StatusFront) {
        if (!championship || value === status) return;
        if (championship.state === "FINISHED") {
            showToast(
                "El campeonato ya ha finalizado",
                "error"
            );
            return;
        }

        setPendingStatus(value);
        setIsModalOpen(true);
    }

    async function confirmChange() {
        if (!pendingStatus) return;
        try {
            setIsUpdating(true);
            setIsModalOpen(false);
            const updatedChampionship =
                await updateChampionshipState(
                    id,
                    stateMap[pendingStatus],
                    session!.accessToken
                );
            setChampionship(updatedChampionship);
            setStatus(
                reverseStateMap[
                    updatedChampionship.state
                ]
            );
            showToast(
                "¡Estado actualizado!",
                "success"
            );
        } catch {
            if (championship) {
                setStatus(
                    reverseStateMap[
                        championship.state
                    ]
                );
            }
            showToast(
                "Cambio no permitido por el sistema",
                "error"
            );
        } finally {
            setIsUpdating(false);
        }
    }

    return {
        championship,
        loading,
        error,
        status,
        isModalOpen,
        pendingStatus,
        isUpdating,
        handleChange,
        confirmChange,
        closeModal: () => setIsModalOpen(false)
    };
}