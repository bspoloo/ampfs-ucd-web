export interface Solicitud {
    id: string;
    equipo: string;
    tipo: string;
    estado: "Pendiente" | "Aceptada" | "Rechazada";
    mensaje: string;
    solicitante: string;
    fecha: string;
    descripcion?: string;
}
