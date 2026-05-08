import { PermitStatusFront } from "../consts/permit-state";

export function getPermitStatusStyles(
    status: PermitStatusFront
) {
    switch (status) {
        case "pendiente":
            return "text-yellow-300";

        case "aprobado":
            return "text-green-400";

        case "rechazado":
            return "text-red-400";

        default:
            return "text-gray-300";
    }
}