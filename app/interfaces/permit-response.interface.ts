import { PermitStatusBackend } from "../consts/permit-state";

export interface PermitResponse {
    id: string;
    type: string;
    reason: string;
    state: PermitStatusBackend;
    match_date: Date;
    preference_time: string;
    team: {
        id: string;
        name: string;
        description: string;
    };
}