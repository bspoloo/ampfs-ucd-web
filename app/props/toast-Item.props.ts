import { Message } from "../interfaces/message.interface"

export interface ToastItemProps {
    toast: Message
    leaving: boolean
    onDismiss: (id: string) => void
}