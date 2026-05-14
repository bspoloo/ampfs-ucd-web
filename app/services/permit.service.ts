import { PermitStatusBackend } from "../consts/permit-state";
import { Permit } from "../interfaces/permit.interface";
import { PermitResponse } from "../interfaces/permit-response.interface";

const API_URL = process.env.BACKEND_API_URL;
console.log(API_URL);

interface ReviewPermitBody {
    estado: PermitStatusBackend;
}

export async function getPermits(
    token: string
): Promise<PermitResponse[]> {

    const response = await fetch(
        `${API_URL}/permits`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            "Error al obtener los permisos"
        );
    }

    const data = await response.json();

    console.log("RESPONSE JSON:");
    console.log(data);

    return data;
}

export async function reviewPermit(
    id: string,
    estado: PermitStatusBackend,
    token: string
): Promise<PermitResponse> {

    const body: ReviewPermitBody = {
        estado,
    };

    const response = await fetch(
        `${API_URL}/permits/${id}/review`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Error al revisar el permiso"
        );
    }

    return response.json();
}