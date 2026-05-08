export type PermitStatusFront =
    | "pendiente"
    | "aprobado"
    | "rechazado";

export type PermitStatusBackend =
    | "PENDIENTE"
    | "APROBADO"
    | "RECHAZADO";

export const permitStateMap: Record<
    PermitStatusFront,
    PermitStatusBackend
> = {
    pendiente: "PENDIENTE",
    aprobado: "APROBADO",
    rechazado: "RECHAZADO",
};

export const reversePermitStateMap: Record<
    PermitStatusBackend,
    PermitStatusFront
> = {
    PENDIENTE: "pendiente",
    APROBADO: "aprobado",
    RECHAZADO: "rechazado",
};