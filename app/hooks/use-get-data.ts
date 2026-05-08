"use client";

import { useEffect, useState } from "react";
import { getData } from "../services/get.data.service";
import { DataServer } from "../interfaces/data-response-list";

export function useGetData<T>(endpoint: string, id?: string): DataServer<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    
    useEffect(()=> {
        getData<T>(endpoint)
            .then(data => setData(data))
            .catch((err)=> {
                setError(err.message ?? "Error en traer la lista de datos")
            })
            .finally(()=> setLoading(false));
    }, id ? [id] : [] );
    return { data, loading, error };
}