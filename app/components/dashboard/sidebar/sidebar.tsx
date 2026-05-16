"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PanelLeft, DoorOpen } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { SIDE_BAR_MENU_DASHBOARD } from "@/app/consts/side-bar-menu";
import { useToast } from "@/app/hooks/use-toast";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const { data: session } = useSession();
    const { showToast } = useToast();

    async function handleLogout() {
        showToast("Sesión cerrada. ¡Hasta pronto!", "info");
        await new Promise(r => setTimeout(r, 900));
        await signOut({ redirect: true, callbackUrl: "/login" });
    }

    const verifyRoute = (route: string): boolean => {
        return pathname.startsWith(route);
    }
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setCollapsed(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <aside className={`h-screen ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-(--bg-sidebar) text-(--text-sidebar) border-r border-(--border-dark) flex flex-col justify-between p-4`}>
            <div>
                <div className={`flex ${collapsed ? "justify-center" : "justify-end"} mb-4`}>
                    <button className="cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
                        <PanelLeft className="w-5 h-5 text-(--btn-activo-sidebar)" />
                    </button>
                </div>

                <div className={`${collapsed ? "hidden" : "flex flex-col items-center gap-2 mb-8"}`}>
                    <div className="w-24 h-24 rounded-full border border-(--btn-activo-sidebar) flex items-center justify-center text-[40px]">
                        {
                            session?.user.image ? <div>
                                <img src={
                                    session?.user.image
                                } alt="image" className="w-24 h-24 rounded-full border border-(--btn-activo-sidebar) flex items-center justify-center" />
                            </div> : session?.user.username![0].toUpperCase()
                        }

                    </div>
                    <p>
                        {session?.user.roles[0].toLocaleUpperCase()}
                    </p>
                    <p className="font-semibold">
                        {session?.user.username ?? "sin nombre de usuario"}
                    </p>
                </div>

                <ul className="flex flex-col gap-2">
                    {SIDE_BAR_MENU_DASHBOARD.map((item, index) =>
                        <li key={`sub-dash-${index}`}>
                            <button onClick={() => router.push(item.route)} className={`cursor-pointer flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-3 w-full px-4 py-2 rounded  ${ verifyRoute(item.route) ? "bg-(--btn-activo-sidebar) text-white" : "hover:bg-(--hover-btn-sidebar)" } transition active:scale-95 text-(--text-btn-sidebar)`}>
                                <item.icon className="w-5 h-5"></item.icon>
                                {!collapsed && <span>{item.name}</span>}
                            </button>
                        </li> )
                    }
                </ul>
            </div>

            <button
                onClick={handleLogout}
                className="cursor-pointer flex items-center justify-center gap-2 w-full border border-(--border-dark) py-2 rounded hover:bg-(--btn-activo-sidebar) transition"
            >
                {collapsed
                    ? <DoorOpen className="w-5 h-5" />
                    : "Cerrar sesión"
                }
            </button>

        </aside>
    )
}