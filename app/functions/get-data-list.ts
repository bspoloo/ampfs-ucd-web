import { Payload } from "../interfaces/auth/payload.interface";

export async function getDataList<R>(payload: Payload): Promise<R> {
    try {
        const url : string = process.env.BACKEND_API_URL as string;
        
        const response = await fetch(`${url}/${payload.endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${payload.accessToken}`
            }
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
        throw new Error(`Error getting data: ${(err as Error).message}`);
    }
}