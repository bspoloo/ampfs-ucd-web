import { Championship } from "../interfaces/championship.interface";
export type StatusFront = "activo" | "proceso" | "finalizado";

export const stateMap: Record<StatusFront, Championship["state"]> = {
    activo: "ACTIVE",
    proceso: "IN_PROGRESS",
    finalizado: "FINISHED",
};

export const reverseStateMap: Record<Championship["state"], StatusFront> = {
    ACTIVE: "activo",
    IN_PROGRESS: "proceso",
    FINISHED: "finalizado",
};