import { Championship } from "../interfaces/championship.interface";

export async function getChampionship(id: string, token: string): Promise<Championship> {
    try {
        const API_BACKEND = process.env.BACKEND_API_URL;
        const res = await fetch(
            `${API_BACKEND}/championship/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!res.ok) {
            throw new Error(
                "Error al obtener campeonato"
            );
        }

        return res.json();

    } catch (e) {
        const errorMessage = e instanceof Error? e.message: String(e);
        throw new Error(
            `Error obteniendo campeonato: ${errorMessage}`
        );
    }
}

export async function updateChampionshipState(
    id: string,
    state: "ACTIVE" | "IN_PROGRESS" | "FINISHED",
    token: string
): Promise<Championship> {
    try {
        const API_BACKEND = process.env.BACKEND_API_URL;
        const res = await fetch(
            `${API_BACKEND}/championship/${id}/state`,
            {
                method: "PATCH",
                body: JSON.stringify({ state }),

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!res.ok) {
            throw new Error(
                "Error actualizando estado"
            );
        }
        return res.json();
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(
            `Error actualizando estado: ${errorMessage}`
        );
    }
}