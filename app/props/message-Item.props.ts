import { Message } from "../interfaces/message.interface"

export interface MessageItemProps {
    toast: Message
    leaving: boolean
    onDismiss: (id: string) => void
}