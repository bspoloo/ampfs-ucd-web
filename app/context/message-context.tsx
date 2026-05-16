"use client"

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useRef,
    type ReactNode,
} from "react"
import ToastItem from "@/app/components/ui/toast"
import { Message } from "../interfaces/message.interface"
import { MessageType } from "../types/message.type"
import MessageItem from "../components/ui/message"

interface MessageContextValue {
    showMessage: (message: string, type: MessageType, duration?: number) => void
}

const MessageContext = createContext<MessageContextValue | null>(null)
const DEFAULT_DURATION = 3500

export function MessageProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [leavingIds, setLeavingIds] = useState<Set<string>>(new Set())
    const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

    const dismiss = useCallback((id: string) => {
        const autoTimer = timers.current.get(id)
        if (autoTimer) {
            clearTimeout(autoTimer)
            timers.current.delete(id)
        }

        setLeavingIds(prev => new Set([...prev, id]))

        setTimeout(() => {
            setMessages(prev => prev.filter(t => t.id !== id))
            setLeavingIds(prev => {
                const next = new Set(prev)
                next.delete(id)
                return next
            })
        }, 250)
    }, [])

    const showMessage = useCallback(
        (message: string, type: MessageType, duration = DEFAULT_DURATION) => {
            const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`

            setMessages(prev => [...prev, { id, message, type, duration }])

            const timer = setTimeout(() => dismiss(id), duration)
            timers.current.set(id, timer)
        },
        [dismiss]
    )

    return (
        <MessageContext.Provider value={{ showMessage }}>
            {children}

            <div className="fixed bottom-6 right-6 z-200 flex flex-col gap-3 items-end">
                {messages.map(message => (
                    <MessageItem
                        key={message.id}
                        toast={message}
                        leaving={leavingIds.has(message.id)}
                        onDismiss={dismiss}
                    />
                ))}
            </div>
        </MessageContext.Provider>
    )
}

export function useMessage() {
    const ctx = useContext(MessageContext)
    if (!ctx) throw new Error("useMessage must be used inside MessageProvider")
    return ctx
}
