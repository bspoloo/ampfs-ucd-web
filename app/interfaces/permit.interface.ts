import { PermitStatusBackend, PermitStatusFront } from "../consts/permit-state";

export interface Permit {
    id: string;
    tipo: string;
    motivo: string;
    estado: PermitStatusFront;
    fecha_solicitud: string;
    equipo: {
        id: string;
        nombre: string;
    };
}