import PlayerSidebar from "@/app/components/player/sidebar/player-sidebar";

export default function PlayerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <PlayerSidebar />
            <main className="flex-1 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
