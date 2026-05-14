import { PermitStatusBackend, PermitStatusFront } from "../consts/permit-state";

export interface Permit {
    id: string;
    type: string;
    reason: string;
    state: PermitStatusFront;
    permit_date: string;
    equipo: {
        id: string;
        nombre: string;
    };
}