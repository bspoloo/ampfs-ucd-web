"use client"

import { useState, useCallback, useRef } from "react"

type ToastType = "success" | "error"

interface ToastState {
    message: string;
    type: ToastType;
    visible: boolean;
}

export function useToast(duration = 3000) {
    const [toast, setToast] = useState<ToastState>({ message: "", type: "success", visible: false })
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const showToast = useCallback((message: string, type: ToastType) => {
        if (timerRef.current) clearTimeout(timerRef.current)
        setToast({ message, type, visible: true })
        timerRef.current = setTimeout(() => {
            setToast(prev => ({ ...prev, visible: false }))
        }, duration)
    }, [duration])

    return { toast, showToast }
}
