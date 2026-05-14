"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Permit } from "@/app/interfaces/permit.interface";
import { PermitResponse } from "@/app/interfaces/permit-response.interface";

import {
    getPermits,
    reviewPermit
} from "@/app/services/permit.service";

import {
    PermitStatusBackend,
    PermitStatusFront,
    permitStateMap,
    reversePermitStateMap
} from "@/app/consts/permit-state";

export function usePermits() {

    const {
        data: session,
        status
    } = useSession();

    console.log( session?.accessToken);
    

    const [permits, setPermits] =
        useState<Permit[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {

        if (status === "loading") {
            return;
        }
        if (!session?.accessToken) {
            setLoading(false);
            return;
        }

        loadPermits();

    }, [session, status]);

    async function loadPermits() {

        try {

            setLoading(true);
            setError(null);

            const data: PermitResponse[] =
                await getPermits(
                    session!.accessToken
                );

            const formattedPermits: Permit[] =
                data.map(permit => ({
                    id: permit.id,
                    tipo: permit.tipo,
                    motivo: permit.motivo,

                    fecha_solicitud:
                        permit.fecha_solicitud,

                    estado:
                        reversePermitStateMap[
                            permit.estado as PermitStatusBackend
                        ],

                    equipo: {
                        id: permit.equipo.id,
                        nombre:
                            permit.equipo.nombre,
                    }
                }));

            console.log(
                "FORMATTED:",
                formattedPermits
            );

            setPermits(formattedPermits);

        } catch (err) {

            console.error(err);

            const message =
                err instanceof Error
                    ? err.message
                    : "Error al cargar permisos";

            setError(message);

        } finally {

            setLoading(false);

        }
    }

    async function updatePermitStatus(
        id: string,
        status: PermitStatusFront
    ) {

        if (!session?.accessToken) return;

        try {

            const backendStatus: PermitStatusBackend =
                permitStateMap[status];

            const updatedPermit =
                await reviewPermit(
                    id,
                    backendStatus,
                    session.accessToken
                );

            const formattedPermit: Permit = {
                id: updatedPermit.id,
                tipo: updatedPermit.tipo,
                motivo: updatedPermit.motivo,

                fecha_solicitud:
                    updatedPermit.fecha_solicitud,

                estado:
                    reversePermitStateMap[
                        updatedPermit.estado as PermitStatusBackend
                    ],

                equipo: {
                    id: updatedPermit.equipo.id,
                    nombre:
                        updatedPermit.equipo.nombre,
                }
            };

            setPermits(prev =>
                prev.map(permit =>
                    permit.id === id
                        ? formattedPermit
                        : permit
                )
            );

        } catch (err) {

            console.error(err);

        }
    }

    return {
        permits,
        loading,
        error,
        updatePermitStatus
    };
}