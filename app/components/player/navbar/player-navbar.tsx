"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, Sun, Moon, LogOut, Mails, User } from "lucide-react"
import { useTheme } from "@/app/context/theme-context"
import { useToast } from "@/app/hooks/use-toast"

const NAV_ITEMS = [
    { label: "Solicitudes", route: "/player/requests", icon: Mails },
    { label: "Perfil",      route: "/player/profile",  icon: User  },
]

interface StyleMap {
    navbar:       string
    navbarBorder: string
    surface:      string
    surfaceBorder:string
    text:         string
    textMuted:    string
    hover:        string
    activeItem:   string
    closeBtn:     string
}

const STYLES: Record<"dark" | "light", StyleMap> = {
    dark: {
        navbar:        "bg-black/50",
        navbarBorder:  "border-white/10",
        surface:       "bg-[#0e0e0e]/95",
        surfaceBorder: "border-[#2a2a2a]",
        text:          "text-white",
        textMuted:     "text-[#cccccc]",
        hover:         "hover:bg-[#1a1a1a]",
        activeItem:    "bg-red-700/20 text-red-400 border border-red-700/40",
        closeBtn:      "hover:bg-[#1f1f1f]",
    },
    light: {
        navbar:        "bg-white/70",
        navbarBorder:  "border-white/40",
        surface:       "bg-white/95",
        surfaceBorder: "border-gray-200",
        text:          "text-gray-900",
        textMuted:     "text-gray-500",
        hover:         "hover:bg-gray-100",
        activeItem:    "bg-red-50 text-red-700 border border-red-200",
        closeBtn:      "hover:bg-gray-100",
    },
}

export default function PlayerNavbar() {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const { showToast } = useToast()
    const { data: session } = useSession()
    const pathname = usePathname()
    const router = useRouter()

    const s = STYLES[theme]
    const isActive = (route: string) => pathname.startsWith(route)
    const avatarLetter = session?.user?.username?.[0]?.toUpperCase() ?? "J"

    function navigate(route: string) {
        router.push(route)
        setDrawerOpen(false)
    }

    async function handleLogout() {
        setDrawerOpen(false)
        showToast("Sesión cerrada. ¡Hasta pronto!", "info")
        await new Promise(r => setTimeout(r, 900))
        await signOut({ redirect: true, callbackUrl: "/login" })
    }

    return (
        <>
            {/* ── Fixed top navbar ───────────────────────── */}
            <header
                className={`fixed top-0 inset-x-0 z-40 h-16 flex items-center px-4 sm:px-6
                    border-b backdrop-blur-md transition-colors duration-300
                    ${s.navbar} ${s.navbarBorder}`}
            >
                {/* Hamburger — mobile only */}
                <button
                    onClick={() => setDrawerOpen(true)}
                    className={`md:hidden p-2 rounded-xl transition ${s.hover} ${s.textMuted} mr-2`}
                    aria-label="Abrir menú"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Brand */}
                <span className={`font-extrabold text-xl tracking-tight select-none ${s.text}`}>
                    <span className="text-red-600">A</span>MPFS
                    <span className={`ml-2 text-xs font-normal uppercase tracking-widest ${s.textMuted}`}>
                        Player
                    </span>
                </span>

                {/* Desktop nav — centered */}
                <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.route}
                            onClick={() => navigate(item.route)}
                            className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                                ${isActive(item.route)
                                    ? "bg-red-600 text-white shadow-lg shadow-red-700/30"
                                    : `${s.textMuted} ${s.hover}`
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Right controls */}
                <div className="ml-auto flex items-center gap-2">
                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-xl transition ${s.hover}`}
                        aria-label="Cambiar tema"
                    >
                        {theme === "dark"
                            ? <Sun  className="w-4 h-4 text-yellow-400" />
                            : <Moon className={`w-4 h-4 ${s.textMuted}`} />
                        }
                    </button>

                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center
                        text-sm font-bold text-white ring-2 ring-red-500/30 overflow-hidden cursor-pointer">
                        {session?.user?.image
                            ? <img src={session.user.image} alt="avatar" className="w-full h-full object-cover" />
                            : avatarLetter
                        }
                    </div>
                </div>
            </header>

            {/* ── Mobile drawer backdrop ─────────────────── */}
            <div
                className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden
                    transition-opacity duration-300
                    ${drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setDrawerOpen(false)}
            />

            {/* ── Mobile drawer panel ────────────────────── */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-72 flex flex-col
                    border-r shadow-2xl transition-transform duration-300 ease-in-out md:hidden
                    ${s.surface} ${s.surfaceBorder}
                    ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Drawer header */}
                <div className={`flex items-center justify-between px-5 h-16 border-b shrink-0 ${s.surfaceBorder}`}>
                    <span className={`font-extrabold text-lg tracking-tight ${s.text}`}>
                        <span className="text-red-600">A</span>MPFS
                    </span>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className={`p-2 rounded-xl transition ${s.closeBtn} ${s.textMuted}`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* User info card */}
                <div className={`mx-4 mt-5 p-4 rounded-2xl border ${s.surfaceBorder}
                    ${theme === "dark" ? "bg-white/5" : "bg-gray-50"}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center
                            text-lg font-bold text-white ring-2 ring-red-500/30 overflow-hidden shrink-0">
                            {session?.user?.image
                                ? <img src={session.user.image} alt="avatar" className="w-full h-full object-cover" />
                                : avatarLetter
                            }
                        </div>
                        <div className="min-w-0">
                            <p className={`font-semibold text-sm truncate ${s.text}`}>
                                {session?.user?.username ?? "Jugador"}
                            </p>
                            <p className={`text-xs truncate ${s.textMuted}`}>
                                {session?.user?.roles?.[0]?.toUpperCase() ?? "PLAYER"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Nav items */}
                <nav className="flex flex-col gap-1 px-3 mt-5">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.route}
                            onClick={() => navigate(item.route)}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all
                                ${isActive(item.route)
                                    ? s.activeItem
                                    : `${s.textMuted} ${s.hover}`
                                }`}
                        >
                            <item.icon className="w-5 h-5 shrink-0" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Theme toggle inside drawer */}
                <div className={`mx-3 mt-3 px-4 py-3 rounded-xl border flex items-center justify-between ${s.surfaceBorder}`}>
                    <span className={`text-sm ${s.textMuted}`}>
                        {theme === "dark" ? "Modo oscuro" : "Modo claro"}
                    </span>
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition ${s.hover}`}
                    >
                        {theme === "dark"
                            ? <Sun  className="w-4 h-4 text-yellow-400" />
                            : <Moon className={`w-4 h-4 ${s.textMuted}`} />
                        }
                    </button>
                </div>

                {/* Logout — pinned to bottom */}
                <div className={`mt-auto mx-3 mb-6 border-t pt-4 ${s.surfaceBorder}`}>
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition
                            text-red-500 hover:bg-red-500/10`}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        Cerrar sesión
                    </button>
                </div>
            </aside>
        </>
    )
}
