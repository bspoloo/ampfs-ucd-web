import { ThemeProvider } from "@/app/context/theme-context"
import PlayerShell from "@/app/components/player/shell/player-shell"

export default function PlayerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider>
            <PlayerShell>
                {children}
            </PlayerShell>
        </ThemeProvider>
    )
}
