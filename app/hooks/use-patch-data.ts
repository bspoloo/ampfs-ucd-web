"use client";

import { useEffect, useState } from "react";
import { patchData } from "../services/patch.data.service";

export function usePatchData<T, O>(endpoint: string, body: T, isUpdating: boolean) {
    const [data, setData] = useState<O | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isUpdating && body) {
            setLoading(true);
            setError(null);

            patchData<T, O>(endpoint, body)
                .then(responseData => {
                    setData(responseData);
                })
                .catch((err) => {
                    setError(err.message ?? "Error al actualizar los datos");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            if (!isUpdating) {
                setData(null);
            }
        }
    }, [isUpdating, endpoint]);

    return { data, loading, error };
}