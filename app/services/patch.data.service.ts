export async function patchData<T, O>(endpoint: string, body: T): Promise<O> {
    try {
        const API_BACKEND = process.env.BACKEND_API_URL;
        const res = await fetch(`${API_BACKEND}/${endpoint}`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) {
            throw new Error("Error al actualizar el dato");
        }
        return res.json();
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(`Error en actualizar el dato: ${errorMessage}`);
    }
}               