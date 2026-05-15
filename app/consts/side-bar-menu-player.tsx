import { Mails, User } from "lucide-react";
import { SideBarDashboard } from "../interfaces/dashboard/side-bar-dashboard";

export const SIDE_BAR_MENU_PLAYER: SideBarDashboard[] = [
    {
        name: "Solicitudes",
        route: "/pages/player/requests",
        icon: Mails,
    },
    {
        name: "Perfil",
        route: "/pages/player/profile",
        icon: User,
    },
]
