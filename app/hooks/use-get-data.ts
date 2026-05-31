"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { getData } from "../services/get.data.service";
import { DataServer } from "../interfaces/data-response-list";

export function useGetData<T>(endpoint: string, id?: string): DataServer<T> {
    const { data: session, status } = useSession();

    const [response, setResponse] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    const fetchData = useCallback(async () => {
        if (!session?.accessToken) {
            setLoading(false);
            setError("No autenticado");
            return;
        }

        try {
            setLoading(true);
            const data = await getData<T>(endpoint, session.accessToken);
            setResponse(data);
            setError(undefined);
        } catch (err: any) {
            setError(err.message ?? "Error en traer la lista de datos");
        } finally {
            setLoading(false);
        }
    }, [endpoint, session]);

    useEffect(() => {
        if (status === "loading") return;
        fetchData();
    }, [fetchData, status, id]);

    return {
        response,
        loading,
        error,
        refetch: fetchData
    };
}