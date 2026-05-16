"use client"

import { X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"
import type { CSSProperties } from "react"
import { ToastItemProps } from "@/app/props/toast-Item.props"
import { CONFIG_TOAST } from "@/app/consts/config-toast"


export default function ToastItem({ toast, leaving, onDismiss }: ToastItemProps) {
    const { icon: Icon, bg, border, text, progress } = CONFIG_TOAST[toast.type]

    return (
        <div
            className={`
                pointer-events-auto w-80 rounded-xl border shadow-2xl overflow-hidden
                ${bg} ${border}
                ${leaving ? "animate-toast-out" : "animate-toast-in"}
            `}
        >
            <div className="flex items-start gap-3 px-4 pt-4 pb-3">
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${text}`} />
                <p className={`flex-1 text-sm leading-snug ${text}`}>
                    {toast.message}
                </p>
                <button
                    onClick={() => onDismiss(toast.id)}
                    className={`shrink-0 ${text} opacity-60 hover:opacity-100 transition cursor-pointer`}
                >
                    <X size={15} />
                </button>
            </div>

            {/* Progress bar */}
            <div className="h-0.5 w-full bg-white/10">
                <div
                    className={`h-full ${progress} animate-toast-progress`}
                    style={{ "--toast-duration": `${toast.duration}ms` } as CSSProperties}
                />
            </div>
        </div>
    )
}
