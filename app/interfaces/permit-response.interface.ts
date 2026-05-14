import { PermitStatusBackend } from "../consts/permit-state";

export interface PermitResponse {
    id: string;
    type: string;
    reason: string;

    state: PermitStatusBackend;

    permit_date: string;

    equipo: {
        id: string;
        nombre: string;
    };
}