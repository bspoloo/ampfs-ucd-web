import { MessageType } from "../types/message.type"

export interface Message {
    id: string
    message: string
    type: MessageType
    duration: number
}