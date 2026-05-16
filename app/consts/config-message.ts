import { DataMessage } from './../interfaces/data-message.interface';
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react"
import { MessageType } from "../types/message.type"

export const CONFIG_MESSAGE: Record<MessageType, DataMessage> = {
    success: {
        icon: CheckCircle,
        bg: "bg-green-950/95",
        border: "border-green-700",
        text: "text-green-300",
        progress: "bg-green-500",
    },
    error: {
        icon: XCircle,
        bg: "bg-red-950/95",
        border: "border-red-700",
        text: "text-red-300",
        progress: "bg-red-500",
    },
    warning: {
        icon: AlertTriangle,
        bg: "bg-amber-950/95",
        border: "border-amber-700",
        text: "text-amber-300",
        progress: "bg-amber-500",
    },
    info: {
        icon: Info,
        bg: "bg-blue-950/95",
        border: "border-blue-700",
        text: "text-blue-300",
        progress: "bg-blue-500",
    },
}
