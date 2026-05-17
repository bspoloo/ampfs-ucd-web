"use client"

import type { ReactNode } from "react"
import { useTheme } from "@/app/context/theme-context"
import PlayerNavbar from "@/app/components/player/navbar/player-navbar"

export default function PlayerShell({ children }: { children: ReactNode }) {
    const { theme } = useTheme()

    return (
        <div className="relative min-h-screen">
            {/* Background image — fixed so it doesn't scroll */}
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/fondoPlayer.webp')" }}
            />

            {/* Theme overlay */}
            <div className={`fixed inset-0 -z-10 transition-colors duration-500 ${
                theme === "dark"
                    ? "bg-black/70"
                    : "bg-white/60"
            }`} />

            <PlayerNavbar />

            <main className="pt-16 min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-6">
                {children}
            </main>
        </div>
    )
}