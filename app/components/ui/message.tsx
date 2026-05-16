"use client"

import { X } from "lucide-react"
import type { CSSProperties } from "react"

import { ToastItemProps } from "@/app/props/toast-Item.props"
import { CONFIG_MESSAGE } from "@/app/consts/config-message"
import { MessageType } from "@/app/types/message.type"

export default function MessageItem({ toast, leaving, onDismiss, }: ToastItemProps) {
    const { icon: Icon, border, text, progress } = CONFIG_MESSAGE[toast.type]
    const messagesTypes: Record<MessageType, string> = {
        success: "éxito",
        error: "error",
        warning: "advertencia",
        info: "información",
    }

    return (
        <div className="fixed inset-0  flex items-center justify-center p-4">
            <div
                className={`
                    absolute inset-0
                    z-0
                    bg-black/70
                    backdrop-blur-md
                    transition-all duration-300
                    ${leaving ? "animate-fade-out" : "animate-fade-in"}
                `}
                onClick={() => onDismiss(toast.id)}
            />

            <div
                className={` relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-(--bg-sidebar) shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl ${leaving ? "animate-popup-out" : "animate-popup-in"} `}>
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div
                            className={`
                                flex h-11 w-11 items-center justify-center
                                rounded-2xl
                                bg-white/5
                                ${text}
                            `}
                        >
                            <Icon className="h-5 w-5" />
                        </div>

                        <div className="flex flex-col">
                            <h2 className="text-base font-semibold text-(--text-sidebar)">
                                Mensaje de {messagesTypes[toast.type]}
                            </h2>

                            <span className="text-xs text-white/40">
                                Sistema de notificaciones
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => onDismiss(toast.id)}
                        className=" flex h-9 w-9 items-center justify-center rounded-xl text-white/50 transition-all duration-200 hover:bg-white/5 hover:text-white active:scale-95 cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 py-6">
                    <p
                        className={`
                            text-sm leading-relaxed
                            ${text}
                        `}
                    >
                        {toast.message}
                    </p>
                </div>

                <div className="h-1 w-full bg-white/5 overflow-hidden">
                    <div
                        className={`
                            h-full
                            ${progress}
                            animate-toast-progress
                        `}
                        style={
                            {
                                "--toast-duration": `${toast.duration}ms`,
                            } as CSSProperties
                        }
                    />
                </div>
            </div>
        </div>
    )
}