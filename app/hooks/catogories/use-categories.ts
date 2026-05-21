"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CategoryResponse } from "@/app/interfaces/category-response.interface";

import {
    getCategories
} from "@/app/services/category.service";

export function useCategories() {
    const {
        data: session,
        status
    } = useSession();

    const [categories, setCategories] = useState<CategoryResponse[]>([]);
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

        loadCategories();
    }, [session, status]);

    async function loadCategories() {
        try {
            setLoading(true);
            setError(null);

            const data: CategoryResponse[] = await getCategories(
                session!.accessToken
            );

            const formattedCategories: CategoryResponse[] = data.map(category => ({
                id: category.id,
                name: category.name,
                description: category.description,
                teams: category.teams.map(team => ({
                    id: team.id,
                    name: team.name,
                    description: team.description,
                })),
                championships: category.championships.map(championship => ({
                    id: championship.id
                }))
            }));
        setCategories(formattedCategories);    
        } catch(e) {
            console.log(e);

            const message = e instanceof Error ? e.message: "Error al cargar categorías";

            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return {
        categories,
        loading,
        error,
    };
}