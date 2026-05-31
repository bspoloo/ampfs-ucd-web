import { Payload } from "../interfaces/auth/payload.interface";

export async function putData<E, R>(payload: Payload, data: E): Promise<R> {
    try {
        const url: string = process.env.BACKEND_API_URL as string;
        const response = await fetch(`${url}/${payload.endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${payload.accessToken}`
            },
            body: JSON.stringify(data)
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
        throw new Error(`Error al actualizar datos: ${(err as Error).message}`);
    }
}