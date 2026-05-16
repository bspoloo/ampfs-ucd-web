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

export type ToastType = "success" | "error" | "warning" | "info"

export interface Toast {
    id: string
    message: string
    type: ToastType
    duration: number
}

interface ToastContextValue {
    showToast: (message: string, type: ToastType, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const DEFAULT_DURATION = 3500

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])
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
            setToasts(prev => prev.filter(t => t.id !== id))
            setLeavingIds(prev => {
                const next = new Set(prev)
                next.delete(id)
                return next
            })
        }, 250)
    }, [])

    const showToast = useCallback(
        (message: string, type: ToastType, duration = DEFAULT_DURATION) => {
            const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`

            setToasts(prev => [...prev, { id, message, type, duration }])

            const timer = setTimeout(() => dismiss(id), duration)
            timers.current.set(id, timer)
        },
        [dismiss]
    )

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 items-end pointer-events-none">
                {toasts.map(toast => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        leaving={leavingIds.has(toast.id)}
                        onDismiss={dismiss}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error("useToast must be used inside ToastProvider")
    return ctx
}
