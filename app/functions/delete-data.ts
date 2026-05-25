import { Payload } from "../interfaces/auth/payload.interface";

// E is the entity to post
// R is the response

export async function deleteData<R>(payload: Payload): Promise<R> {
    try {
        const url: string = process.env.BACKEND_API_URL as string;
        const response = await fetch(`${url}/${payload.endpoint}`, {
            method: "DELETE",
            headers: payload.accessToken ? {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${payload.accessToken}`
            } : {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            let errorMessage = `Error ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                console.log(e);
            }
            throw new Error(errorMessage);
        }

        return await response.json() as R;
    } catch (err) {
        throw new Error(`Error al borrar datos: ${(err as Error).message}`);
    }
}