import { Payload } from "../interfaces/auth/payload.interface";

// E is the entity to post
// R is the response

export async function postData<E, R>(payload: Payload, data: E): Promise<R> {
    try {
        const url: string = process.env.BACKEND_API_URL as string;

        console.log("enviando datos...");
        
        const response = await fetch(`${url}/${payload.endpoint}`, {
            method: "POST",
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
        throw new Error(`Error al enviar datos: ${(err as Error).message}`);
    }
}