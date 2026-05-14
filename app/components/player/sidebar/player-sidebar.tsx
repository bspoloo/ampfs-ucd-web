"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PanelLeft, DoorOpen } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { SIDE_BAR_MENU_PLAYER } from "@/app/consts/side-bar-menu-player";

export default function PlayerSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const { data: session } = useSession();

    const isActive = (route: string) => pathname.startsWith(route);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setCollapsed(true);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <aside
            className={`h-screen ${collapsed ? "w-20" : "w-64"} transition-all duration-300 bg-(--bg-sidebar) text-(--text-sidebar) border-r border-(--border-dark) flex flex-col justify-between p-4`}
        >
            <div>
                {/* Toggle */}
                <div className={`flex ${collapsed ? "justify-center" : "justify-end"} mb-4`}>
                    <button className="cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
                        <PanelLeft className="w-5 h-5 text-(--btn-activo-sidebar)" />
                    </button>
                </div>

                {/* Avatar / info usuario */}
                <div className={`${collapsed ? "hidden" : "flex flex-col items-center gap-2 mb-8"}`}>
                    <div className="w-24 h-24 rounded-full border border-(--btn-activo-sidebar) flex items-center justify-center text-[40px] overflow-hidden">
                        {session?.user.image ? (
                            <img
                                src={session.user.image}
                                alt="avatar"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        ) : (
                            session?.user.username?.[0].toUpperCase() ?? "J"
                        )}
                    </div>
                    <p className="text-xs text-(--text-btn-sidebar)">
                        {session?.user.roles?.[0]?.toLocaleUpperCase() ?? "JUGADOR"}
                    </p>
                    <p className="font-semibold text-sm">
                        {session?.user.username ?? "sin nombre de usuario"}
                    </p>
                </div>

                {/* Menú */}
                <ul className="flex flex-col gap-2">
                    {SIDE_BAR_MENU_PLAYER.map((item, index) => (
                        <li key={`player-menu-${index}`}>
                            <button
                                onClick={() => router.push(item.route)}
                                className={`cursor-pointer flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-3 w-full px-4 py-2 rounded transition active:scale-95 text-(--text-btn-sidebar) ${
                                    isActive(item.route)
                                        ? "bg-(--btn-activo-sidebar) text-white"
                                        : "hover:bg-(--hover-btn-sidebar)"
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {!collapsed && <span>{item.name}</span>}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cerrar sesión */}
            <button
                onClick={async () => {
                    await signOut({ redirect: true, callbackUrl: "/login" });
                }}
                className="cursor-pointer flex items-center justify-center gap-2 w-full border border-(--border-dark) py-2 rounded hover:bg-(--btn-activo-sidebar) transition"
            >
                {collapsed ? <DoorOpen className="w-5 h-5" /> : "Cerrar sesión"}
            </button>
        </aside>
    );
}
