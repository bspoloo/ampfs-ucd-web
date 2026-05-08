export async function getData<D>(endpoint: string): Promise<D> {
    try {
        const API_BACKEND = process.env.BACKEND_API_URL;
        const res = await fetch(`${API_BACKEND}/${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) {
            throw new Error("Error al obtener los datos requeridos");
        }
        return res.json();
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(`Error en obtener la data: ${errorMessage}`);
    }
}               