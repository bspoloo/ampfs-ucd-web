export type PermitStatusFront =
    | "pendiente"
    | "aprobado"
    | "rechazado";

export type PermitStatusBackend =
    | "PENDING"
    | "APPROVED"
    | "REJECTED";

export const permitStateMap: Record<
    PermitStatusFront,
    PermitStatusBackend
> = {
    pendiente: "PENDING",
    aprobado: "APPROVED",
    rechazado: "REJECTED",
};

export const reversePermitStateMap: Record<
    PermitStatusBackend,
    PermitStatusFront
> = {
    PENDING: "pendiente",
    APPROVED: "aprobado",
    REJECTED: "rechazado",
};