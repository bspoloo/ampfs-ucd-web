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

    const [permits, setPermits] = useState<Permit[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

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
                    type: permit.type,
                    reason: permit.reason,

                    permit_date:
                        permit.preference_time,

                    state:
                        reversePermitStateMap[
                            permit.state as PermitStatusBackend
                        ],

                    team: {
                        id: permit.team.id,
                        name:
                            permit.team.name,
                    }
                }));
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
                type: updatedPermit.type,
                reason: updatedPermit.reason,

                permit_date:
                    updatedPermit.preference_time,

                state:
                    reversePermitStateMap[
                        updatedPermit.state as PermitStatusBackend
                    ],

                team: {
                    id: updatedPermit.team.id,
                    name:
                        updatedPermit.team.name,
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