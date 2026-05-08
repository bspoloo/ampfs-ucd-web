import { PermitStatusBackend } from "../consts/permit-state";

export interface PermitResponse {
    id: string;
    tipo: string;
    motivo: string;

    estado: PermitStatusBackend;

    fecha_solicitud: string;

    equipo: {
        id: string;
        nombre: string;
    };
}