import { useSession } from "next-auth/react";
import { Payload } from "../interfaces/auth/payload.interface";
import { File as FileResponse} from "../interfaces/file.interface";

// E is the entity to post
// R is the response

export async function uploadFile(formData: FormData, accessToken: string): Promise<FileResponse>{
    try {
        const url: string = process.env.BACKEND_API_URL as string;
        const response = await fetch(`${url}/file/upload`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            body: formData
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

        return await response.json() as FileResponse;
    } catch (err) {
        throw new Error(`Error al subir archivo: ${(err as Error).message}`);
    }
}