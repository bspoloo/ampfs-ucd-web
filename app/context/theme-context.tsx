"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "dark" | "light"

interface ThemeContextValue {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "player-theme"

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark")

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
        if (saved === "light" || saved === "dark") setTheme(saved)
    }, [])

    function toggleTheme() {
        setTheme(prev => {
            const next: Theme = prev === "dark" ? "light" : "dark"
            localStorage.setItem(STORAGE_KEY, next)
            return next
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider")
    return ctx
}
