import { StatusFront } from "../consts/champion-state";

export function getStatusStyles(state: StatusFront) {
    switch (state) {
        case "activo":
            return "bg-green-900 border-green-500 text-green-400";
        case "proceso":
            return "bg-yellow-900 border-yellow-500 text-yellow-400";
        case "finalizado":
            return "bg-red-900 border-red-500 text-red-400";
        default:
            return "bg-gray-800 border-gray-500 text-gray-300";
    }
};